import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

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
    description: "Rejuvenate with yoga classes, spa treatments, and healthy gourmet meals.",
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
            <p className="text-xl mb-8">Discover our special packages and create unforgettable memories</p>
            <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">View All Offers</Button>
          </div>
        </section>

        {/* Offers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {offers.map((offer, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-[#bf840d]">{offer.price}</span>
                        <span className="ml-2 text-sm text-green-600">{offer.discount}</span>
                      </div>
                      <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">Book Now</Button>
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
