"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, Users, ArrowLeft, ArrowRight, Wifi, Coffee, Tv, Bath } from "lucide-react"

interface RoomResultsProps {
  checkInDate: Date
  checkOutDate: Date
  adults: number
  children: number
  roomType: string
}

interface Room {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  capacity: string
  size: string
  view: string
  amenities: string[]
  variant: string
  maxAdults: number
  maxChildren: number
}

const generateRoomVariants = (baseRoom: Omit<Room, "id" | "variant">, count: number): Room[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...baseRoom,
    id: Math.random(),
    variant: ["City View", "Garden View", "Pool View", "Courtyard View"][index],
    price: baseRoom.price + index * 20,
    images: baseRoom.images,
  }))
}

const baseRooms = {
  deluxe: {
    name: "Deluxe King Room",
    description: "Spacious room with king-sized bed and modern amenities",
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    capacity: "3 Adults, 1 Child",
    size: "32m²",
    view: "City View",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "Room Service"],
    maxAdults: 3,
    maxChildren: 1,
  },
  executive: {
    name: "Executive Suite",
    description: "Luxurious suite with separate living area and premium amenities",
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    capacity: "4 Adults, 2 Children",
    size: "48m²",
    view: "City View",
    amenities: ["Free WiFi", "Executive Lounge", "Premium Amenities", "Butler Service"],
    maxAdults: 4,
    maxChildren: 2,
  },
  ocean: {
    name: "Ocean View Room",
    description: "Beautiful room with stunning ocean views and private balcony",
    price: 279,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    ],
    capacity: "3 Adults, 2 Children",
    size: "36m²",
    view: "Ocean View",
    amenities: ["Private Balcony", "Free WiFi", "Ocean View", "Premium Bath"],
    maxAdults: 3,
    maxChildren: 2,
  },
  family: {
    name: "Family Suite",
    description: "Spacious suite perfect for families with children",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    ],
    capacity: "4 Adults, 3 Children",
    size: "65m²",
    view: "Garden View",
    amenities: ["Kids Area", "Kitchen", "Family Entertainment", "Two Bathrooms"],
    maxAdults: 4,
    maxChildren: 3,
  },
  presidential: {
    name: "Presidential Suite",
    description: "Our most luxurious accommodation with panoramic views",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    capacity: "6 Adults, 4 Children",
    size: "120m²",
    view: "Panoramic View",
    amenities: ["Private Pool", "Butler Service", "Private Bar", "Luxury Spa"],
    maxAdults: 6,
    maxChildren: 4,
  },
}

// Generate 4 variants for each room type
const rooms: Room[] = [
  ...generateRoomVariants(baseRooms.deluxe as Room, 4),
  ...generateRoomVariants(baseRooms.executive as Room, 4),
  ...generateRoomVariants(baseRooms.ocean as Room, 4),
  ...generateRoomVariants(baseRooms.family as Room, 4),
  ...generateRoomVariants(baseRooms.presidential as Room, 4),
]

export default function RoomResults({ checkInDate, checkOutDate, adults, children, roomType }: RoomResultsProps) {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])

  useEffect(() => {
    // Filter rooms based on search criteria
    let filtered = rooms

    // Filter by room type if specific type is selected
    if (roomType !== "any") {
      filtered = filtered.filter((room) => room.name.toLowerCase().includes(roomType.toLowerCase()))
    }

    // Filter by capacity (adults and children)
    filtered = filtered.filter((room) => {
      return room.maxAdults >= adults && room.maxChildren >= children
    })

    setFilteredRooms(filtered)
  }, [adults, children, roomType])

  const groupedRooms = filteredRooms.reduce(
    (acc, room) => {
      const type = room.name
      if (!acc[type]) acc[type] = []
      acc[type].push(room)
      return acc
    },
    {} as Record<string, Room[]>,
  )

  return (
    <div className="mt-8 space-y-12">
      {Object.entries(groupedRooms).map(([type, rooms]) => (
        <div key={type} className="space-y-4">
          <h2 className="text-2xl font-serif font-medium text-amber-900">{type}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} checkInDate={checkInDate} checkOutDate={checkOutDate} />
            ))}
          </div>
        </div>
      ))}
      {filteredRooms.length === 0 && (
        <div className="text-center text-amber-800">
          No rooms available for the selected criteria. Please try different dates or guest numbers.
        </div>
      )}
    </div>
  )
}

function RoomCard({ room, checkInDate, checkOutDate }: { room: Room; checkInDate: Date; checkOutDate: Date }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [room.images.length])

  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("WiFi")) return <Wifi className="w-4 h-4" />
    if (amenity.includes("TV")) return <Tv className="w-4 h-4" />
    if (amenity.includes("Bath")) return <Bath className="w-4 h-4" />
    return <Coffee className="w-4 h-4" />
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        {room.images.map((image, index) => (
          <Image
            key={index}
            src={image || "/placeholder.svg"}
            alt={`${room.name} - Image ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${room.price}/night
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/80 hover:bg-white"
            onClick={() =>
              setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length)
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/80 hover:bg-white"
            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-medium text-amber-900">{room.variant}</h3>
          <p className="text-sm text-amber-800/70">{room.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center text-amber-700">
            <BedDouble className="w-4 h-4 mr-1" />
            {room.size}
          </div>
          <div className="flex items-center text-amber-700">
            <Users className="w-4 h-4 mr-1" />
            {room.capacity}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center bg-amber-50 px-2 py-1 rounded text-xs text-amber-700">
              {getAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm">
            <span className="font-medium text-amber-900">${room.price * nights}</span>
            <span className="text-amber-700/70">
              {" "}
              / {nights} night{nights > 1 ? "s" : ""}
            </span>
          </div>
          <Button
            className="bg-amber-800 hover:bg-amber-900 text-white"
            onClick={() => {
              const checkInStr = checkInDate.toISOString().split("T")[0]
              const checkOutStr = checkOutDate.toISOString().split("T")[0]
              window.location.href = `/booking?roomId=${encodeURIComponent(room.id)}&roomName=${encodeURIComponent(room.name)}&roomPrice=${room.price}&roomImage=${encodeURIComponent(room.images[0])}&checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${room.capacity.split(" ")[0]}`
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
