import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { AutoScrollImage } from "./auto-scroll-image"
import { BookingDialog } from "./booking-dialog"

interface AmenityCardProps {
  amenity: {
    name: string
    icon: React.ElementType
    description: string
    features: string[]
    offer: string
    images: string[]
  }
}

export function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="relative">
        <AutoScrollImage images={amenity.images} />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{amenity.name}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold flex items-center mb-4">
          <amenity.icon className="w-6 h-6 mr-2 text-[#bf840d]" />
          {amenity.name}
        </h3>
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="offer">Special Offer</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-gray-600">{amenity.description}</p>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="space-y-2">
              {amenity.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="offer" className="mt-4">
            <div className=" p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-amber-800">Special Offer:</h4>
              <p className="text-amber-700">{amenity.offer}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {/* <CardFooter>
        <BookingDialog amenity={amenity.name} />
      </CardFooter> */}
    </Card>
  )
}
