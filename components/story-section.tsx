"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const storyImages = [
  {
    id: 1,
    url: "https://pix8.agoda.net/hotelImages/129/1292195/1292195_16092714010046992314.jpg?ca=6&ce=1&s=1024x",
    alt: "Hotel Patliputra Continental exterior view",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/26.jpg-fuJtksW8PUBnyd3scARCJC3ez9HRbs.jpeg",
    alt: "Luxurious hotel room interior",
  },
  {
    id: 3,
    url: "https://pix8.agoda.net/hotelImages/129/1292195/1292195_16092714010046992314.jpg?ca=6&ce=1&s=1024x",
    alt: "Modern hotel accommodation",
  },
]

export default function StorySection() {
  const [currentFace, setCurrentFace] = useState(0)

  const handlePrevious = () => {
    setCurrentFace((prev) => (prev === 0 ? storyImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentFace((prev) => (prev === storyImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            <div className="cube-container w-full h-full">
              <div className="cube" style={{ transform: `rotateY(${currentFace * -90}deg)` }}>
                {storyImages.map((image, index) => (
                  <div key={image.id} className={`cube-face cube-face-${index + 1}`}>
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Text Content */}
          <div className="lg:pl-8">
            <div className="mb-4">
              <span className="text-amber-800 text-sm tracking-wider uppercase border-b-2 border-amber-800 pb-1">
                THE PATLIPUTRA EXPERIENCE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Hotel Patliputra Continental stands as a beacon of modern luxury in the heart of Patna. Our journey
                began with a vision to provide world-class hospitality while honoring the rich cultural heritage of
                Bihar's capital city.
              </p>
              <p>
                Today, we pride ourselves on delivering exceptional service and contemporary comfort to both business
                and leisure travelers. Our commitment to excellence is reflected in every aspect of our hotel, from our
                sophisticated accommodations to our premium amenities and professional staff.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cube-container {
          perspective: 1000px;
          perspective-origin: 50% 50%;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .cube-face-1 { transform: rotateY(0deg) translateZ(50%); }
        .cube-face-2 { transform: rotateY(90deg) translateZ(50%); }
        .cube-face-3 { transform: rotateY(180deg) translateZ(50%); }
        .cube-face-4 { transform: rotateY(-90deg) translateZ(50%); }

        @media (max-width: 640px) {
          .cube-container {
            perspective: 500px;
          }
        }
      `}</style>
    </section>
  )
}
