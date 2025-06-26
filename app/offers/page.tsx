import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const offers = [
  {
    title: "Midweek Escape Offer",
    slug: "midweek-escape-offer",
    description:
      "Banish the midweek blues with an indulgent midweek escape. Enjoy elegant stays, hearty breakfasts, and exclusive savings — only when you book on Wednesday or Thursday.",
    image:"https://patliputracontinental.com/images/offers/midweekhpcnew.jpeg",
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
    image:"https://patliputracontinental.com/images/offers/weekendhpc.jpeg",
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
      image:"https://patliputracontinental.com/images/offers/suitedelight.webp",
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

export default function OffersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Special offers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Exclusive Offers</h1>
            <p className="text-xl mb-8">
              Uncover our bespoke packages and craft timeless memories.
            </p>
            <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">
              View All Offers
            </Button>
          </div>
        </section>

        {/* Offers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Current Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={384}
                    height={500}
                    className="w-full h-82 object-contain bg-white"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 text-justify">
                      {offer.description}
                    </p>
                    <div className="flex justify-end items-center">
                      <Link href={`/offers/${offer.slug}`}>
                        <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">
                          View Details
                        </Button>
                      </Link>
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
