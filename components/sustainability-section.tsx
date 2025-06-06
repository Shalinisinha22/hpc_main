"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const sustainabilityItems = [
  {
    id: 1,
    title: "Energy Efficiency",
    description:
      "Our state-of-the-art energy management systems and LED lighting reduce our carbon footprint while maintaining the luxurious ambiance our guests expect.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  },
  {
    id: 2,
    title: "Water Conservation",
    description:
      "We implement advanced water-saving technologies and promote responsible water use, ensuring a sustainable luxury experience without compromising comfort.",
    image:
      "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "Sustainable Cuisine",
    description:
      "Our restaurants source local, organic ingredients, reducing food miles and supporting local communities while offering exquisite farm-to-table dining experiences.",
    image:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
  },
  {
    id: 4,
    title: "Waste Reduction",
    description:
      "We've implemented comprehensive recycling programs and are committed to reducing single-use plastics, proving that luxury can coexist with environmental responsibility.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]

export default function SustainabilitySection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : prev + 1))
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = undefined
    }
  }

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]) // Added dependencies

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0))
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1))
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:pr-8">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Sustainable Luxury</h2>
            <p className="text-gray-600 mb-6">
              At  Hotel Patliputra Continental, we believe that true luxury includes a commitment to environmental stewardship. We strive
              to provide an unparalleled guest experience while minimizing our ecological impact and preserving the
              beauty of our surroundings for future generations.
            </p>
            <Button
              variant="outline"
              className="border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
              onClick={() => (window.location.href = "/sustainability")}
            >
              LEARN MORE
            </Button>
          </div>

          {/* Right Slider */}
          <div className="lg:col-span-2 relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {[0, 1].map((groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0 flex gap-6">
                    {sustainabilityItems.slice(groupIndex * 3, groupIndex * 3 + 3).map((item) => (
                      <div key={item.id} className="w-1/3 flex-shrink-0 group">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                          {/* Background Image */}
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                          {/* Content */}
                          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                            <h3 className="text-2xl font-serif mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-white/80 transform transition-transform duration-300 group-hover:-translate-y-1 line-clamp-3">
                              {item.description}
                            </p>
                            <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-white border-white hover:bg-white hover:text-black"
                              >
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-amber-800 w-4" : "bg-amber-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
