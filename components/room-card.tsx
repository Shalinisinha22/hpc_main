"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, Coffee, Users, Wifi } from "lucide-react"

interface RoomCardProps {
  name: string
  description: string
  price: number
  image: string
  amenities: string[]
  capacity: string
  size?: string
}

export default function RoomCard({
  name,
  description,
  price,
  image,
  amenities,
  capacity,
  size = "Standard",
}: RoomCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-64">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${price}/night
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-serif font-medium text-amber-900 mb-2">{name}</h3>
        <p className="text-amber-800/70 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-amber-700">
            <BedDouble className="w-4 h-4 mr-1" />
            {size} Room
          </div>
          <div className="flex items-center text-sm text-amber-700">
            <Users className="w-4 h-4 mr-1" />
            {capacity}
          </div>
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-sm text-amber-700">
              {amenity.includes("WiFi") && <Wifi className="w-4 h-4 mr-1" />}
              {amenity.includes("Amenities") && <Coffee className="w-4 h-4 mr-1" />}
              {amenity}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            className="bg-amber-800 hover:bg-amber-900 text-white w-full"
            onClick={() => {
              window.location.href = `/booking?roomId=${encodeURIComponent(name)}&roomName=${encodeURIComponent(name)}&roomPrice=${price}&roomImage=${encodeURIComponent(image)}`
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
