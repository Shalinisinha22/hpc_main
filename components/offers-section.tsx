"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"


// Suite Delight
// Where each suite tells a tale of elegance, indulgence, and impeccable service.


// Weekend Offer
// Save 30% on weekend stays. Book for Saturday & Sunday and enjoy more for less.

// Midweek Offer
// Midweek just got better.Book now and unlock exclusive midweek perks.


const offers = [
  {
    title: "Midweek Escape Offer",
    slug: "midweek-escape-offer",
    description:
      "Banish the midweek blues with an indulgent midweek escape. Enjoy elegant stays, hearty breakfasts, and exclusive savings — only when you book on Wednesday or Thursday.",
    image: "https://patliputracontinental.com/images/offers/midweekhpcnew.jpeg",
    details: [
      "20% off all room types for bookings made on Wed & Thu (for any check-in date)",
      "Signature buffet breakfast at BISTRO",
      "Complimentary Wi-Fi",
      "20% savings on dining, spa & laundry",
      "One-way airport transfer",
      "Access to rooftop pool, fitness centre & games zone",
    ],
    terms: [
      "Full prepayment at the time of booking",
      "Free cancellation up to 48 hrs before check-in",
      "Valid for bookings made only on the hotel’s official website",
      "Early check-in & late check-out subject to availability",
      "Extra bed: ₹1000 + taxes | Children under 12 stay free",
      "ID proof required at check-in",
      "This offer cannot be clubbed with other promotions. Additional taxes apply. Hotel policies and amenities apply as per room category.",
    ],
  },
  {
    title: "Weekend Indulgence Offer",
    slug: "weekend-indulgence-offer",
    description:
      "Make your weekends count with 30% off on luxurious stays booked on Saturday or Sunday. Unwind in style and enjoy a host of exclusive perks.",
    image: "https://patliputracontinental.com/images/offers/weekendhpc.jpeg",
    details: [
      "30% off on bookings made on Sat & Sun (for any check-in date)",
      "Signature buffet breakfast at SAFFRON",
      "Complimentary Wi-Fi",
      "20% savings on dining, spa & laundry",
      "One-way airport transfer",
      "One major meal per adult (per stay)",
      "Access to rooftop pool, fitness centre & game zone",
    ],
    terms: [
      "Offer valid only for bookings made on Saturdays & Sundays",
      "Full payment required at booking",
      "Free cancellation up to 48 hrs before check-in",
      "Extra bed @ ₹1000 + taxes | Children under 12 stay free",
      "Valid government ID required at check-in",
      "Bookings via official website only",
      "T&Cs apply. Offer not combinable with others. Taxes extra as applicable. Early check-in/late check-out subject to availability.",
    ],
  },
  {
    title: "Suite Delights",
    slug: "suite-delights",
    description:
      "Step into a world of bespoke luxury and regal hospitality with our exquisite suites. Spacious, splendid, and serenely appointed — enjoy a royal stay that feels just like home, only grander.",
    image: "https://patliputracontinental.com/images/offers/suitedelight.webp",
    details: [
      "Stay in a premium suite category",
      "High-speed Wi-Fi",
      "2-way airport transfers",
      "25% savings on dining, spa & laundry",
      "In-room check-in & check-out",
      "Signature Butler Service",
      "In-room breakfast or buffet at BISTRO",
      "Access to rooftop pool, fitness centre & games zone",
      "Early check-in & late check-out (subject to availability)",
    ],
    terms: [
      "Available exclusively on our official website.",
      "Offer valid for designated suites only",
      "Full prepayment required at booking",
      "Free cancellation up to 48 hrs before check-in",
      "Maximum stay: 364 nights",
      "Children under 12 stay free; extra bed @ ₹1000 + taxes",
      "Valid photo ID required at check-in",
      "T&Cs apply. Additional services not included in the package are chargeable. Taxes extra as applicable. This offer cannot be clubbed with others.",
    ],
  },
]

export default function OffersSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#f3e8d2] to-[#f9f3e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#bf840d] mb-12">Exclusive Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative w-full h-48 bg-white flex items-center justify-center mt-5">
                <Image 
                  src={offer.image || "/placeholder.svg"} 
                  alt={offer.title} 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-[#bf840d]">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{offer.description}</p>
                <div className="flex items-center justify-end">
                  <Link href={`/offers/${offer.slug}`}>
                    <Button className="bg-[#bf840d] hover:bg-[#a06f0b] text-white text-sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
