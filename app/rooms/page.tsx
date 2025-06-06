"use client"

import { useState, useEffect } from "react"
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

const rooms = [
  {
    name: "Deluxe King Room",
    description:
      "Spacious room with king-sized bed and modern amenities, perfect for couples or business travelers seeking comfort and style.",
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    capacity: "3 Adults, 1 Child",
    size: "32",
    view: "City View",
    bedType: "King",
    amenities: [
      "Free High-Speed WiFi",
      '55" Smart TV',
      "Mini Bar",
      "24/7 Room Service",
      "In-room Safe",
      "Coffee Machine",
      "Luxury Toiletries",
      "Bathrobe and Slippers",
    ],
    maxAdults: 3,
    maxChildren: 1,
    additionalInfo: [
      "Complimentary breakfast for two",
      "Access to fitness center",
      "Late check-out upon request",
      "Turndown service",
    ],
  },
  {
    name: "Executive Suite",
    description:
      "Luxurious suite with separate living area and premium amenities, ideal for families or extended stays.",
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    capacity: "4 Adults, 2 Children",
    size: "48",
    view: "City View",
    bedType: "King",
    amenities: [
      "Free High-Speed WiFi",
      '65" Smart TV',
      "Executive Lounge Access",
      "Premium Bath Amenities",
      "Butler Service",
      "24/7 Room Service",
      "In-room Safe",
      "Espresso Machine",
    ],
    maxAdults: 4,
    maxChildren: 2,
    additionalInfo: [
      "Complimentary breakfast for four",
      "Access to executive lounge",
      "Evening cocktails",
      "Personalized concierge service",
    ],
  },
  {
    name: "Ocean View Room",
    description:
      "Beautiful room with stunning ocean views and private balcony, perfect for romantic getaways or relaxing vacations.",
    price: 279,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    ],
    capacity: "3 Adults, 2 Children",
    size: "36",
    view: "Ocean View",
    bedType: "Queen",
    amenities: [
      "Private Balcony",
      "Free High-Speed WiFi",
      "Ocean View",
      "Premium Bath Amenities",
      "24/7 Room Service",
      "In-room Safe",
      "Coffee Machine",
      "Hair Dryer",
    ],
    maxAdults: 3,
    maxChildren: 2,
    additionalInfo: [
      "Complimentary beach access",
      "Oceanfront dining options",
      "Sunset views",
      "Beach towels provided",
    ],
  },
  {
    name: "Family Suite",
    description: "Spacious suite perfect for families with children, offering ample space and kid-friendly amenities.",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    ],
    capacity: "4 Adults, 3 Children",
    size: "65",
    view: "Garden View",
    bedType: "King + Twin",
    amenities: [
      "Kids Play Area",
      "Fully Equipped Kitchen",
      "Family Entertainment System",
      "Two Bathrooms",
      "Free High-Speed WiFi",
      '55" Smart TV',
      "Cribs and High Chairs Available",
      "Board Games and Toys",
    ],
    maxAdults: 4,
    maxChildren: 3,
    additionalInfo: [
      "Connecting rooms available",
      "Kids' meal options",
      "Babysitting services",
      "Family-friendly activities",
    ],
  },
  {
    name: "Presidential Suite",
    description: "Our most luxurious accommodation with panoramic views and unparalleled amenities.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    capacity: "6 Adults, 4 Children",
    size: "120",
    view: "Panoramic View",
    bedType: "King + Queen",
    amenities: [
      "Private Infinity Pool",
      "Dedicated Butler Service",
      "Private Bar",
      "Luxury Spa Treatments",
      "Free High-Speed WiFi",
      '75" Smart TV',
      "Gourmet Kitchen",
      "24-hour Concierge",
    ],
    maxAdults: 6,
    maxChildren: 4,
    additionalInfo: [
      "Complimentary airport transfer",
      "Private chef services",
      "Exclusive access to club lounge",
      "Personalized itinerary planning",
    ],
  },
]

export default function RoomsPage() {
  const [filteredRooms, setFilteredRooms] = useState(rooms)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedView, setSelectedView] = useState("All")
  const [selectedBedType, setSelectedBedType] = useState("All")
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filterRooms = () => {
    const filtered = rooms.filter(
      (room) =>
        room.price >= priceRange[0] &&
        room.price <= priceRange[1] &&
        (selectedView === "All" || room.view.includes(selectedView)) &&
        (selectedBedType === "All" || room.bedType.includes(selectedBedType)),
    )
    setFilteredRooms(filtered)
    updateActiveFilters()
  }

  const updateActiveFilters = () => {
    const filters = []
    if (priceRange[0] > 0 || priceRange[1] < 1000) filters.push(`$${priceRange[0]} - $${priceRange[1]}`)
    if (selectedView !== "All") filters.push(selectedView)
    if (selectedBedType !== "All") filters.push(selectedBedType)
    setActiveFilters(filters)
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedView("All")
    setSelectedBedType("All")
    setFilteredRooms(rooms)
    setActiveFilters([])
  }

  useEffect(() => {
    filterRooms()
  }, [priceRange, selectedView, selectedBedType])

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
                <Slider min={0} max={1000} step={50} value={priceRange} onValueChange={setPriceRange} />
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room, index) => (
                <RoomCard key={index} room={room} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function RoomCard({ room }: { room: (typeof rooms)[0] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

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
          src={room.images[currentImageIndex] || "/placeholder.svg"}
          alt={room.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-serif">{room.name}</h2>
          <p className="text-sm opacity-80">{room.view}</p>
        </div>
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors duration-300"
          aria-label="Previous image"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors duration-300"
          aria-label="Next image"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
      <CardContent className="p-6">
        <Tabs defaultValue="details">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="w-1/3">
              Details
            </TabsTrigger>
            <TabsTrigger value="amenities" className="w-1/3">
              Amenities
            </TabsTrigger>
            <TabsTrigger value="additional" className="w-1/3">
              Additional
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <p className="text-gray-600 mb-4">{room.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-amber-600" />
                <span>{room.size} m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>{room.capacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>{room.view}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-amber-600" />
                <span>{room.bedType} Bed</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="amenities" className="mt-4">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {room.amenities.slice(0, showAllAmenities ? undefined : 6).map((amenity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
            {room.amenities.length > 6 && (
              <Button
                variant="link"
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-2 text-amber-600"
              >
                {showAllAmenities ? "Show Less" : "Show All Amenities"}
              </Button>
            )}
          </TabsContent>
          <TabsContent value="additional" className="mt-4">
            <ul className="space-y-2 text-sm">
              {room.additionalInfo.map((info, index) => (
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
            <span className="text-2xl font-bold text-amber-600">${room.price}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-300"
            onClick={() => {
              window.location.href = `/booking?roomId=${encodeURIComponent(room.name)}&roomName=${encodeURIComponent(room.name)}&roomPrice=${room.price}&roomImage=${encodeURIComponent(room.images[0])}`
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
