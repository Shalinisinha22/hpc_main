import { Button } from "@/components/ui/button"
import RoomCard from "./room-card"

export default function FeaturedRooms() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe King Room",
      description: "Spacious room with king-sized bed and city view",
      price: 199,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["King Bed", "City View", "Free WiFi"],
      capacity: "2 Adults",
      size: "32m²",
    },
    {
      id: 2,
      name: "Executive Suite",
      description: "Luxurious suite with separate living area and premium amenities",
      price: 349,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["King Bed", "Living Area", "Premium Amenities"],
      capacity: "2 Adults, 1 Child",
      size: "48m²",
    },
    {
      id: 3,
      name: "Ocean View Room",
      description: "Beautiful room with stunning ocean views and balcony",
      price: 279,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["Queen Bed", "Ocean View", "Private Balcony"],
      capacity: "2 Adults",
      size: "36m²",
    },
  ]

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-amber-900 mb-4">Luxurious Accommodations</h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
            Discover our exquisite rooms and suites designed for your ultimate comfort and relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              description={room.description}
              price={room.price}
              image={room.image}
              amenities={room.amenities}
              capacity={room.capacity}
              size={room.size}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white px-8"
          >
            View All Rooms
          </Button>
        </div>
      </div>
    </section>
  )
}
