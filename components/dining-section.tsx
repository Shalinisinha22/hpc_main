"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

const diningOptions = [
  {
    id: 1,
    title: "Bistro",
    description:
      "Multi Cuisines Restaurant offering an exquisite blend of international and local cuisines in a luxurious setting.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    specialties: "International, Continental, Indian",
    openingHours: "7:00 AM - 11:00 PM",
  },
  {
    id: 2,
    title: "Chao China",
    description: "Chinese Restaurant with authentic flavors and modern interpretations of classic dishes.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2129&q=80",
    specialties: "Chinese, Asian Fusion",
    openingHours: "12:00 PM - 11:00 PM",
  },
  {
    id: 3,
    title: "Coca Mocha",
    description:
      "Coffee Shop featuring artisanal coffees, pastries, and a relaxed atmosphere perfect for casual meetings.",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80",
    specialties: "Coffee, Pastries, Light Snacks",
    openingHours: "6:00 AM - 10:00 PM",
  },
]

export default function DiningSection() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      if (isMobile) {
        setCurrentSlide((prev) => (prev === diningOptions.length - 1 ? 0 : prev + 1))
      } else {
        setCurrentSlide((prev) => (prev === 0 ? 0 : 0))
      }
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
  }, [isAutoPlaying, isMobile])

  const handlePrevious = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev === 0 ? diningOptions.length - 1 : prev - 1))
    } else {
      setCurrentSlide(0)
    }
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev === diningOptions.length - 1 ? 0 : prev + 1))
    } else {
      setCurrentSlide(0)
    }
    setIsAutoPlaying(false)
  }

  if (isMobile) {
    return (
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-[#bf840d] mb-3 text-center">Culinary Excellence</h2>
          <p className="text-gray-600 mb-6 text-center text-sm">
            Indulge in a world of flavors at our award-winning restaurants.
          </p>

          <div className="relative mb-8">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {diningOptions.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                        <p className="text-sm text-white/80 mb-3">{item.description}</p>
                        <div className="mt-1">
                          <p className="text-xs text-white/90 mb-1">{item.specialties}</p>
                          <p className="text-xs text-white/70">{item.openingHours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#bf840d] p-2 rounded-full shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#bf840d] p-2 rounded-full shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {diningOptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-[#bf840d] w-4" : "bg-[#bf840d]/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white"
              onClick={() => (window.location.href = "/dining")}
            >
              EXPLORE OUR RESTAURANTS
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:pr-8">
            <h2 className="text-4xl md:text-5xl font-serif text-[#bf840d] mb-4">Culinary Excellence</h2>
            <p className="text-gray-600 mb-6">
              Indulge in a world of flavors at our award-winning restaurants. Our diverse dining options cater to every
              palate, featuring locally-sourced ingredients and innovative culinary techniques. From casual coffee to
              authentic Chinese cuisine, savor the flavors that make each meal memorable.
            </p>
            <Button
              variant="outline"
              className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white"
              onClick={() => (window.location.href = "/dining")}
            >
              EXPLORE OUR RESTAURANTS
            </Button>
          </div>

          {/* Right Slider */}
          <div className="lg:col-span-2 relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="w-full flex-shrink-0 flex gap-6">
                  {diningOptions.map((item) => (
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
                          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-xs text-white/90">{item.specialties}</p>
                            <p className="text-xs text-white/70">{item.openingHours}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons - Hidden since we only have one slide now */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#bf840d] p-2 rounded-full shadow-lg opacity-0"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#bf840d] p-2 rounded-full shadow-lg opacity-0"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots - Hidden since we only have one slide now */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 opacity-0">
              <button
                onClick={() => {
                  setCurrentSlide(0)
                  setIsAutoPlaying(false)
                }}
                className="w-4 h-2 rounded-full bg-[#bf840d]"
                aria-label="Go to slide 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
