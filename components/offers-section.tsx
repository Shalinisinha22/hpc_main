"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"


// Suite Delight
// Where each suite tells a tale of elegance, indulgence, and impeccable service.


// Weekend Offer
// Save 30% on weekend stays. Book for Saturday & Sunday and enjoy more for less.

// Midweek Offer
// Midweek just got better.Book now and unlock exclusive midweek perks.


const offers = [
  {
    title: "Romantic Getaway",
    description:
      "Enjoy a luxurious stay with your loved one, including champagne, spa treatments, and a candlelit dinner.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: "₹15,000",
    discount: "20% off",
  },
  {
    title: "Business Travel Package",
    description: "Stay productive with our business amenities, high-speed Wi-Fi, and complimentary breakfast.",
    image:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: "₹10,000",
    discount: "15% off",
  },
  {
    title: "Weekend Wellness Retreat",
    description: "Rejuvenate with yoga classes, spa treatments, and healthy gourmet meals, at HPC Patna",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: "₹20,000",
    discount: "25% off",
  },
  {
    title: "Family Fun Package",
    description: "Create lasting memories with family-friendly activities, kids' meals, and spacious accommodations.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: "₹18,000",
    discount: "10% off",
  },
]

export default function OffersSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#f3e8d2] to-[#f9f3e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#bf840d] mb-12">Exclusive Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative h-48">
                <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-[#bf840d]">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-800">{offer.price}</span>
                    <span className="ml-2 text-[#bf840d] font-semibold text-sm">{offer.discount}</span>
                  </div>
                  <Button className="bg-[#bf840d] hover:bg-[#a06f0b] text-white text-sm">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
