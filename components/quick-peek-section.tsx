"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Mail,
  Phone,
  SpadeIcon as Spa,
  PocketIcon as Pool,
  Gamepad2,
  Dumbbell,
  Shield,
  Utensils,
} from "lucide-react"

export default function QuickPeekSection() {
  const [activeAmenity, setActiveAmenity] = useState<string | null>(null)

  const amenities = [
    {
      icon: Spa,
      text: "Ocean Spa & Salon",
      description: "Indulge in our world-class spa treatments and salon services.",
    },
    { icon: Pool, text: "Swimming Pool", description: "Relax by our stunning infinity pool with panoramic views." },
    {
      icon: Gamepad2,
      text: "Game Zone",
      description: "Enjoy a variety of games in our state-of-the-art entertainment area.",
    },
    {
      icon: Dumbbell,
      text: "Gym",
      description: "Stay fit in our fully-equipped fitness center with personal trainers.",
    },
    {
      icon: Shield,
      text: "Safety & Hygiene",
      description: "We prioritize your well-being with rigorous safety and cleanliness protocols.",
    },
    {
      icon: Utensils,
      text: "Healthy Food Plans",
      description: "Savor nutritious and delicious meals tailored to your dietary preferences.",
    },
  ]

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-serif text-[#bf840d] mb-6 sm:mb-8 md:mb-10">
          <span className="inline-block border-b-2 border-[#bf840d] pb-1 sm:pb-2">QUICK PEEK</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-8 border border-[#bf840d]/20">
            <div>
              <h3 className="text-3xl font-serif text-[#bf840d] mb-4"> HPC, Patna</h3>
              <p className="text-gray-700 flex items-start gap-3 text-lg">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0 text-[#bf840d]" />
              PC Golambar, Anisabad, Patna - 800002
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white flex gap-2 text-lg py-6"
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                <MapPin className="w-5 h-5" /> View Map
              </Button>

              <a
                href="mailto:reservations@luxehaven.com"
                className="flex items-center gap-3 text-gray-700 hover:text-[#bf840d] transition-colors text-lg"
              >
                <Mail className="w-5 h-5 text-[#bf840d]" />
                 reservations@hpcpatna.com
              </a>

              <div className="space-y-2">
                <a
                  href="tel:+91 612 2250 204"
                  className="flex items-center gap-3 text-gray-700 hover:text-[#bf840d] transition-colors text-lg"
                >
                  <Phone className="w-5 h-5 text-[#bf840d]" />
                 +91 612 2250 204/205/206
                </a>
                <a
                  href="tel:+1-555-123-4568"
                  className="flex items-center gap-3 text-gray-700 hover:text-[#bf840d] transition-colors text-lg pl-8"
                >
        
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column - Description */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-between border border-[#bf840d]/20">
            <div>
              <h3 className="text-3xl font-serif text-[#bf840d] mb-6">ONE STEP INTO STYLISH RELAXATION</h3>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  With perfect combination of contemporary design and architecture, offering both business and leisure
                  travellers outstanding services and comfort.
                </p>
                <p>
                  We set with the goal of creating a consistent & reliable offering that gives you what you care about
                  the most - a great room with amenities and delicious food, in the best location, at a surprisingly
                  affordable rate.
                </p>
              </div>
            </div>
            <Button
              className="mt-8 bg-[#bf840d] hover:bg-[#a06f0b] text-white w-full py-6 text-lg"
              onClick={() => (window.location.href = "/rooms")}
            >
              Explore Our Rooms
            </Button>
          </div>

          {/* Right Column - Wellness */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#bf840d]/20">
            <h3 className="text-3xl font-serif text-[#bf840d] mb-6">HPC Wellness</h3>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveAmenity(item.text)}
                  onMouseLeave={() => setActiveAmenity(null)}
                >
                  <div
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 cursor-pointer
                      ${activeAmenity === item.text ? "bg-[#bf840d] text-white" : "hover:bg-[#bf840d]/10"}`}
                  >
                    <item.icon className={`w-8 h-8 ${activeAmenity === item.text ? "text-white" : "text-[#bf840d]"}`} />
                    <span className="text-center">{item.text}</span>
                  </div>
                  {activeAmenity === item.text && (
                    <div className="absolute z-10 bg-white border border-[#bf840d]/20 rounded-lg p-4 shadow-lg mt-2 text-sm w-48">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
