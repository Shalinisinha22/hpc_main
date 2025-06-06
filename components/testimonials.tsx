"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    comment:
      "The service was impeccable and the room exceeded all expectations. The attention to detail throughout the hotel is remarkable. Will definitely be returning!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "London, UK",
    comment:
      "From the moment we arrived, the staff made us feel like royalty. The spa facilities are world-class, and the dining experiences were unforgettable.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    comment:
      "The culinary experience alone is worth the stay. Each restaurant offered a unique and delightful journey for the taste buds. The rooms were spacious and luxurious.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "John Smith",
    location: "Sydney, Australia",
    comment:
      "The perfect blend of luxury and comfort. The views from our room were breathtaking, and the concierge service went above and beyond to make our stay memorable.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=7",
  },
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  const handlePrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Luxurious hotel background"
          fill
          className="object-cover"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Guest Experiences</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover what our esteemed guests have to say about their stay at Luxe Haven.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-amber-400">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-medium text-white">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-amber-400">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-white text-xl italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].comment}"
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  className="text-white hover:text-amber-400 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentTestimonial === index ? "bg-amber-400 w-6" : "bg-white/50"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="text-white hover:text-amber-400 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
