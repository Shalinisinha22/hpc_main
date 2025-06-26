"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, Users, ArrowLeft, ArrowRight, Wifi, Coffee, Tv, Bath, Check,Star } from "lucide-react"

// Update the RoomResultsProps interface
interface RoomResultsProps {
  checkInDate: Date
  checkOutDate: Date
  adults: number
  children: number
  roomType: string
  noOfRooms: number // Add this
}

// Update the Room interface to match API response
interface Room {
  _id: string
  roomImage: Array<{ url: string; name: string; ext: string; _id: string }>
  room_title: string
  desc: string
  pricePerNight: number
  max_person: number
  max_children: number
  totalRooms: number
  roomSize: number
  bedType: string
  amenities: string[]
  additionalDetails: string[]
  status: string
}

export default function RoomResults({ 
  checkInDate, 
  checkOutDate, 
  adults, 
  children, 
  roomType, 
  noOfRooms 
}: RoomResultsProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://hpc-backend.vercel.app/api/v1/rooms')
        if (!response.ok) {
          throw new Error('Failed to fetch rooms')
        }
        const data = await response.json()
       console.log('Fetched rooms:', data) 
          setRooms(data)
          setFilteredRooms(data)
  
      } catch (error) {
        console.error('Error fetching rooms:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRooms()
  }, [])

  // Filter rooms based on search criteria
  useEffect(() => {
    let filtered = rooms

    // // Filter by room type if specific type is selected
    // if (roomType !== "any") {
    //   filtered = filtered.filter((room) => 
    //     room.room_title.toLowerCase().includes(roomType.toLowerCase())
    //   )
    // }

    // Filter by availability and capacity
    filtered = filtered.filter((room) => {
      // Check room availability
      if (room.totalRooms < noOfRooms || room.status !== 'available') {
        return false
      }

      // Check dates
      if (!checkInDate || !checkOutDate) {
        return false
      }

      // Check guest capacity
      const totalGuestCapacity = room.max_person * noOfRooms
      const totalChildrenCapacity = room.max_children * noOfRooms
      const totalGuests = adults + children

      return totalGuestCapacity >= totalGuests && 
             totalChildrenCapacity >= children
    })

    setFilteredRooms(filtered)
  }, [rooms, adults, children, roomType, checkInDate, checkOutDate, noOfRooms])

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  // Group rooms by type
  const groupedRooms = filteredRooms.reduce((acc, room) => {
    const type = room.room_title
    if (!acc[type]) acc[type] = []
    acc[type].push(room)
    return acc
  }, {} as Record<string, Room[]>)

  return (
    <div className="mt-8 space-y-12">
      {/* {Object.entries(groupedRooms).map(([type, rooms]) => ( */}
        <div  className="space-y-4">
          {/* <h2 className="text-2xl font-serif font-medium text-amber-900">{type}</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard 
                key={room._id} 
                room={room} 
                checkInDate={checkInDate} 
                checkOutDate={checkOutDate}
                adults={adults}
                children={children}
                noOfRooms={noOfRooms}
              />
            ))}
          </div>
        </div>
      {/* ))} */}
      { rooms.length!=0 && filteredRooms.length === 0 && (
        <div className="text-center text-amber-800">
          No rooms available for the selected criteria. Please try different dates or guest numbers.
        </div>
      )}
    </div>
  )
}

// Add this helper function before the RoomCard component
const parseJsonSafely = (jsonString: string) => {
  try {
    if (!jsonString) return [];
    
    // Handle the case where the string is already a JSON array
    if (jsonString.startsWith('[') && jsonString.endsWith(']')) {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    }
    
    // Remove extra brackets and quotes
    const cleanString = jsonString
      .replace(/^\["/, '')
      .replace(/"\]$/, '')
      .replace(/\\"/g, '"');
    
    // Split by comma and clean up each item
    return cleanString.split(',').map(item => 
      item.trim()
         .replace(/^"|"$/g, '')
    ).filter(Boolean);
    
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

// Update the RoomCard component to use API data structure
function RoomCard({ 
  room, 
  checkInDate, 
  checkOutDate,
  adults,
  children,
  noOfRooms 
}: { 
  room: Room
  checkInDate: Date
  checkOutDate: Date
  adults: number
  children: number
  noOfRooms: number
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("WiFi")) return <Wifi className="w-4 h-4" />
    if (amenity.includes("TV")) return <Tv className="w-4 h-4" />
    if (amenity.includes("Bath")) return <Bath className="w-4 h-4" />
    return <Coffee className="w-4 h-4" />
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-40 sm:h-48 md:h-56">
        {room.roomImage.map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt={`${room.room_title} - Image ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          /> 
        ))}
        <div className="absolute top-2 right-2 bg-amber-800 text-white px-2 py-1 rounded-full text-xs md:text-sm font-medium">
          ₹{room.pricePerNight.toLocaleString('en-IN')}/night
        </div>
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/80 hover:bg-white"
            onClick={() =>
              setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.roomImage.length) % room.roomImage.length)
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/80 hover:bg-white"
            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.roomImage.length)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-3 md:p-4">
        <div className="mb-1 md:mb-2">
          <h3 className="text-base md:text-lg font-medium text-amber-900 line-clamp-1">{room.room_title}</h3>
          <p className="text-xs text-gray-700 line-clamp-2 md:line-clamp-none">{room.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-1 md:gap-2 mb-2 md:mb-3 text-xs md:text-sm ">
          <div className="flex items-center text-gray-700 ">
            <BedDouble className="w-4 h-4 mr-1 text-amber-600 " />
            {room.roomSize} sq ft
          </div>
          <div className="flex items-center text-gray-700 ">
            <Users className="w-4 h-4 mr-1 text-amber-600" />
            {room.max_person} Adults, {room.max_children} Children
          </div>
        </div>
        {/* Amenities - show only 2 on mobile, 6 on desktop */}
        <div className="space-y-2 space-x-2">
          <div className="grid grid-cols-2 gap-1 md:gap-2 mb-1 md:mb-2">
            {(room.amenities).slice(0, showAllAmenities ? undefined : (typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 6)).map((amenity: string, index: number) => (
              <div 
                key={index} 
                className="flex items-center px-2 py-1 rounded text-xs text-amber-700"
              >
                <Check className="w-4 h-4 text-amber-600 mr-1.5 shrink-0" />
                <span className="truncate">{parseJsonSafely(amenity)}</span>
              </div>
            ))}
          </div>
          {/* Show more/less only on desktop if more than 6 amenities */}
          {room.amenities.length > 6 && (
            <Button
              variant="link"
              size="sm"
              className="text-amber-600 hover:text-amber-700 p-0 h-auto mt-1 hidden md:inline"
              onClick={() => setShowAllAmenities(!showAllAmenities)}
            >
              {showAllAmenities ? "Show Less" : `+${room.amenities.length - 6} more `}
            </Button>
          )}
        </div>
        {/* Additional Details - hidden on mobile */}
        <div className="mt-2 md:mt-4 space-y-2 hidden md:block">
          <h4 className="text-sm font-medium text-amber-900">Additional Details</h4>
          <div className="grid grid-cols-1 gap-2">
            {room.additionalDetails.map((detail: string, index: number) => (
              <div 
                key={index} 
                className="flex items-start gap-2 text-xs text-gray-700"
              >
                <Star className="w-4 h-4  mt-0.5 text-[#bf840d] shrink-0" />
                <span>{parseJsonSafely(detail)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-2 border-t mt-2 md:mt-4 gap-2 md:gap-0">
          <div className="text-sm">
            <span className="font-medium text-amber-900">
              ₹{(room.pricePerNight * nights * noOfRooms).toLocaleString('en-IN')}
            </span>
            <span className="text-amber-600/80">
              {" "}/ {nights} night{nights > 1 ? "s" : ""}
            </span>
          </div>
          <Button
            className="bg-amber-800 hover:bg-amber-900 text-white w-full md:w-auto"
            onClick={() => {
              window.location.href = `/booking?${new URLSearchParams({
                roomId: room._id
              })}`
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
