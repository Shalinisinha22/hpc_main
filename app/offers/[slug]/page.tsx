import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const offerDetails = [
  {
    slug: "midweek-escape-offer",
    title: "Midweek Escape Offer",
    image: "https://patliputracontinental.com/images/offers/weekendhpc.jpeg",
    summary: "Banish the midweek blues with an indulgent midweek escape. Enjoy elegant stays, hearty breakfasts, and exclusive savings — only when you book on Wednesday or Thursday.",
    highlights: [
      "20% off all room types for bookings made on Wed & Thu (for any check-in date)",
      "Signature buffet breakfast at BISTRO",
      "Complimentary Wi-Fi",
      "20% savings on dining, spa & laundry",
      "One-way airport transfer",
      "Access to rooftop pool, fitness centre & games zone"
    ],
    terms: [
      "Full prepayment at the time of booking",
      "Free cancellation up to 48 hrs before check-in",
      "Valid for bookings made only on the hotel’s official website",
      "Early check-in & late check-out subject to availability",
      "Extra bed: ₹1000 + taxes | Children under 12 stay free",
      "ID proof required at check-in",
      "This offer cannot be clubbed with other promotions. Additional taxes apply. Hotel policies and amenities apply as per room category."
    ]
  },
  {
    slug: "weekend-indulgence-offer",
    title: "Weekend Indulgence Offer",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    summary: "Make your weekends count with 30% off on luxurious stays booked on Saturday or Sunday. Unwind in style and enjoy a host of exclusive perks.",
    highlights: [
      "30% off on bookings made on Sat & Sun (for any check-in date)",
      "Signature buffet breakfast at SAFFRON",
      "Complimentary Wi-Fi",
      "20% savings on dining, spa & laundry",
      "One-way airport transfer",
      "One major meal per adult (per stay)",
      "Access to rooftop pool, fitness centre & game zone"
    ],
    terms: [
      "Offer valid only for bookings made on Saturdays & Sundays",
      "Full payment required at booking",
      "Free cancellation up to 48 hrs before check-in",
      "Extra bed @ ₹1000 + taxes | Children under 12 stay free",
      "Valid government ID required at check-in",
      "Bookings via official website only",
      "T&Cs apply. Offer not combinable with others. Taxes extra as applicable. Early check-in/late check-out subject to availability."
    ]
  },
  {
    slug: "suite-delights",
    title: "Suite Delights",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    summary: "Step into a world of bespoke luxury and regal hospitality with our exquisite suites. Spacious, splendid, and serenely appointed — enjoy a royal stay that feels just like home, only grander.",
    highlights: [
      "Stay in a premium suite category",
      "High-speed Wi-Fi",
      "2-way airport transfers",
      "25% savings on dining, spa & laundry",
      "In-room check-in & check-out",
      "Signature Butler Service",
      "In-room breakfast or buffet at BISTRO",
      "Access to rooftop pool, fitness centre & games zone",
      "Early check-in & late check-out (subject to availability)"
    ],
    terms: [
      "Available exclusively on our official website.",
      "Offer valid for designated suites only",
      "Full prepayment required at booking",
      "Free cancellation up to 48 hrs before check-in",
      "Maximum stay: 364 nights",
      "Children under 12 stay free; extra bed @ ₹1000 + taxes",
      "Valid photo ID required at check-in",
      "T&Cs apply. Additional services not included in the package are chargeable. Taxes extra as applicable. This offer cannot be clubbed with others."
    ]
  }
]

export default function OfferDetailsPage({ params }: { params: { slug: string } }) {
  const offer = offerDetails.find((o) => o.slug === params.slug)
  if (!offer) return <div className="min-h-screen flex flex-col"><Header /><main className="flex-grow flex items-center justify-center text-xl">Offer not found.</main><Footer /></div>

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[50vh] flex items-center justify-center">
          <Image src={offer.image} alt={offer.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{offer.title}</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{offer.summary}</p>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Offer Highlights</h2>
            <ul className="list-disc pl-6 mb-8 text-gray-700">
              {offer.highlights.map((h, i) => (
                <li key={i} className="mb-2">{h}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {offer.terms.map((t, i) => (
                <li key={i} className="mb-2">{t}</li>
              ))}
            </ul>
            {/* <div className="mt-8 text-center">
              <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white text-lg px-8 py-3">Book Now</Button>
            </div> */}
            <div className="mt-4 text-center">
              <Link href="/offers" className="text-[#bf840d] underline">Back to Offers</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
