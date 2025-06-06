"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Blissful Escapes",
    image: "https://patliputracontinental.com/images/sliders/dining/3.jpg",
    buttonText: "EXPLORE",
  },
  {
    id: 2,
    title: "HPC DISCOVERY Member Special Offer",
    image: "https://lh3.googleusercontent.com/p/AF1QipPBeMqMMmB_mqPnoB4vH_AfAW81vxW_3Jodmyxf=s680-w680-h510",
    buttonText: "EXPLORE",
  },
  {
    id: 3,
    title: "Time Travel with The HPC",
    image: "https://lh3.googleusercontent.com/p/AF1QipMttoMzn0BjHLxviHHl7vS4eEDVwEGo0kNLQHrK=s680-w680-h510",
    buttonText: "EXPLORE",
  },
  {
    id: 4,
    title: "Culinary Delights",
    image: "https://patliputracontinental.com/images/sliders/hpc-offers/11.jpg",
    buttonText: "EXPLORE",
  },
]

export default function ExperiencesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handlePrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? experiences.length - 1 : prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === experiences.length - 1 ? 0 : prev + 1))
  }, [])

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current)
    autoScrollIntervalRef.current = setInterval(() => {
      handleNext()
    }, 5000) // Change slide every 5 seconds
  }, [handleNext])

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }, [])

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScrolling((prev) => !prev)
  }, [])

  useEffect(() => {
    if (isAutoScrolling) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }

    return () => stopAutoScroll() // Cleanup on component unmount
  }, [isAutoScrolling, startAutoScroll, stopAutoScroll])

  const handleManualInteraction = useCallback(() => {
    // Temporarily stop auto-scrolling when user interacts
    stopAutoScroll()
    // Resume auto-scrolling after a delay
    setTimeout(() => {
      if (isAutoScrolling) startAutoScroll()
    }, 10000) // Resume after 10 seconds of inactivity
  }, [isAutoScrolling, startAutoScroll, stopAutoScroll])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-amber-900 mb-4">
            Unforgettable experiences.
            <br className="hidden md:block" />
            Unmatched curations.
          </h2>
          <p className="text-lg text-amber-800/80">Because you deserve the best, especially when you stay with us.</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              handlePrevious()
              handleManualInteraction()
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg -ml-4 md:ml-4"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              handleNext()
              handleManualInteraction()
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg -mr-4 md:mr-4"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Auto-scroll toggle button */}
          <button
            onClick={toggleAutoScroll}
            className="absolute left-1/2 bottom-4 -translate-x-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
            aria-label={isAutoScrolling ? "Pause auto-scroll" : "Play auto-scroll"}
          >
            {isAutoScrolling ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {experiences.map((experience, index) => (
                <div key={experience.id} className="w-full flex-shrink-0 px-2">
                  <div className="relative h-[500px]">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{experience.title}</h3>
                      <Button
                        variant="outline"
                        className="border-white text-[#bf840d] hover:bg-white hover:text-black transition-colors duration-300"
                        onClick={handleManualInteraction}
                      >
                        {experience.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  handleManualInteraction()
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
    </section>
  )
}
