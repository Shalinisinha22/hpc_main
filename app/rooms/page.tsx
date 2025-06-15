"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Room } from "@/types/room"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BedDouble, Users, ArrowLeft, ArrowRight, Check, DollarSign, Eye, Hotel } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedView, setSelectedView] = useState("All")
  const [selectedBedType, setSelectedBedType] = useState("All")
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms`)
        setRooms(response.data)
        setFilteredRooms(response.data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch rooms")
        setIsLoading(false)
        console.error("Error fetching rooms:", err)
      }
    }

    fetchRooms()
  }, [])

  const filterRooms = () => {
    const filtered = rooms.filter(
      (room) =>
        room.pricePerNight >= priceRange[0] &&
        room.pricePerNight <= priceRange[1] &&
        (selectedBedType === "All" || room.bedType.includes(selectedBedType))
    )
    setFilteredRooms(filtered)
    console.log("Filtered Rooms:", filtered)
    updateActiveFilters()
  }

  const updateActiveFilters = () => {
    const filters = []
    if (priceRange[0] > 0 || priceRange[1] < 20000) filters.push(`$${priceRange[0]} - $${priceRange[1]}`)
    if (selectedView !== "All") filters.push(selectedView)
    if (selectedBedType !== "All") filters.push(selectedBedType)
    setActiveFilters(filters)
  }

  const clearFilters = () => {
    setPriceRange([0, 20000])
    setSelectedView("All")
    setSelectedBedType("All")
    setFilteredRooms(rooms)
    setActiveFilters([])
  }

  useEffect(() => {
    filterRooms()
  }, [priceRange, selectedView, selectedBedType])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxurious hotel rooms"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-white mb-4">Our Rooms & Suites</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Experience the perfect blend of comfort and luxury in our thoughtfully designed accommodations.
            </p>
            <Button
              className="mt-8 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => setIsFilterVisible(true)}
            >
              Find Your Perfect Room
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Dialog open={isFilterVisible} onOpenChange={setIsFilterVisible}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Find Your Perfect Room</DialogTitle>
              <DialogDescription>Use the filters below to customize your search.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-amber-800 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price Range
                </label>
                <Slider min={0} max={20000} step={50} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex justify-between text-sm text-amber-700">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-amber-800 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </label>
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="w-full p-2 border border-amber-300 rounded-md"
                >
                  <option>All</option>
                  <option>City</option>
                  <option>Ocean</option>
                  <option>Garden</option>
                  <option>Panoramic</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-amber-800 flex items-center">
                  <Hotel className="w-4 h-4 mr-2" />
                  Bed Type
                </label>
                <select
                  value={selectedBedType}
                  onChange={(e) => setSelectedBedType(e.target.value)}
                  className="w-full p-2 border border-amber-300 rounded-md"
                >
                  <option>All</option>
                  <option>King</option>
                  <option>Queen</option>
                  <option>Twin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button onClick={() => setIsFilterVisible(false)} className="bg-amber-600 hover:bg-amber-700 text-white">
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="container mx-auto px-4 mt-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-amber-800">Active Filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                  {filter}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-amber-600 hover:text-amber-700">
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Rooms Section */}
        {isLoading ? (
          <div className="container mx-auto px-4 py-16">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
          </div>
        ) : (
          <section className="py-16">
            {console.log("Filtered Rooms:", filteredRooms, rooms)}
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

function RoomCard({ room }: { room: Room }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  // Parse the JSON strings safely
  const parseJsonSafely = (jsonString: string) => {
    try {
      if (!jsonString) return [];

      // Handle the case where the string is already a JSON array
      if (jsonString.startsWith('[') && jsonString.endsWith(']')) {
        const parsed = JSON.parse(jsonString);
        return Array.isArray(parsed) ? parsed : [];
      }

      // Log the raw string for debugging
      console.log('Raw string:', jsonString);

      return jsonString.split(',').map(item => 
        item.trim()
           .replace(/^\[?"|"?\]?$/g, '') 
           .replace(/\\"/g, '"')         
      ).filter(Boolean);                
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.log('Failed to parse:', jsonString);
      return [];
    }
  };

  // Parse amenities and additional details with logging

// const amenities= JSON.parse(room.amenities)
//   console.log('Parsed amenities:', amenities);
console.log(room.amenities)

  const additionalInfo = parseJsonSafely(room.additionalDetails[0]);
  console.log('Parsed additional info:', additionalInfo);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length)
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[4/3]">
        <Image
          src={room.roomImage[currentImageIndex]?.url || "/placeholder.svg"}
          alt={room.room_title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-serif">{room.room_title}</h2>
          <p className="text-sm opacity-80">{room.status}</p>
        </div>
        {room.roomImage.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-2">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-2">
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>
      <CardContent className="p-6">
        <Tabs defaultValue="details">
          <TabsList className="w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <p className="text-gray-600 mb-4">{room.desc}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-amber-600" />
               
                <span>{room.roomSize} sq ft</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>{room.max_person} Adults, {room.max_children} Children</span>
              </div>
              <div className="flex items-center gap-2">
           <BedDouble className="w-4 h-4 text-amber-600" />
                <span>{room.bedType}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="amenities" className="mt-4">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {(room.amenities || []).slice(0, showAllAmenities ? undefined : 6).map((amenity: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
            {(room.amenities || []).length > 6 && (
              <Button 
                variant="link" 
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="text-amber-600 hover:text-amber-700 mt-2"
              >
                {showAllAmenities ? "Show Less" : `Show All Amenities`}
              </Button>
            )}
          </TabsContent>
          <TabsContent value="additional" className="mt-4">
            <ul className="space-y-2 text-sm">
              {(additionalInfo || []).map((info: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-amber-600">₹{room?.pricePerNight.toLocaleString()}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => {
              window.location.href = `/booking?roomId=${room._id}`
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
