"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const heroContent = [
  // {
  //   title: "Experience Luxury in the Heart of Patna",
  //   description: "Where modern comfort meets traditional hospitality at Hotel Patliputra Continental.",
  //   image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22.jpg-QbgXA0qOxbvDFx7L4aNYf6V3fMJnCu.jpeg",
  // },
  // {
  //   title: "Elegant Accommodations",
  //   description: "Discover our thoughtfully designed rooms with premium amenities and contemporary styling.",
  //   image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/26.jpg-fuJtksW8PUBnyd3scARCJC3ez9HRbs.jpeg",
  // },
  {
    title: "Where Comfort Meets Sophistication",
    description: "Unwind in our spacious, thoughtfully designed rooms featuring modern aesthetics and elegant furnishings",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24.jpg-5rTgBj6FxRTHp1dHBsAD7TcK8EHvlT.jpeg",
  },
  // {
  //   title: "Your Home Away From Home",
  //   description: "Experience our warm hospitality and attention to every detail.",
  //   image:
  //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23%20%281%29.jpg-U0n1vgUbDc625xfWuos00s4E0bkfe1.jpeg",
  // },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length)
    }, 5000) // Change content every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[350px] sm:h-[400px] md:h-[550px] -mt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroContent[currentIndex].image || "/placeholder.svg"}
          alt={heroContent[currentIndex].title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-2 sm:px-4 mt-6 sm:mt-10 md:mt-20 z-10">
        <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl bg-[rgba(95,72,43,0.65)] rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-8 shadow-lg backdrop-blur-sm mx-auto">
          <h1 className="text-sm sm:text-xl md:text-3xl lg:text-5xl font-serif font-medium text-white mb-2 sm:mb-4 transition-opacity duration-500 text-center">
            {heroContent[currentIndex].title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/90 mb-4 sm:mb-8 transition-opacity duration-500 text-center">
            {heroContent[currentIndex].description}
          </p>
          <div className="flex flex-row flex-wrap gap-2 sm:gap-4 w-full justify-center">
            <Button
              className="flex-1 min-w-[100px] max-w-[140px] bg-amber-600 hover:bg-amber-700 text-white px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-base"
              onClick={() => (window.location.href = "/rooms")}
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 min-w-[100px] max-w-[140px] bg-black/20 border-white text-white hover:bg-amber-600 hover:border-amber-600 px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-base transition-colors duration-300"
              onClick={() => (window.location.href = "/rooms")}
            >
              View Our Rooms
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
