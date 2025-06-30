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
    url: "/hotel-patliputra-continental.jpg",
    alt: "Luxurious hotel room interior",
  },
  {
    id: 3,
    url: "https://pix8.agoda.net/hotelImages/129/1292195/1292195_16092714010046992314.jpg?ca=6&ce=1&s=1024x",
    alt: "Modern hotel accommodation",
  },
    {
    id: 4,
    url: "/hotel-patliputra-continental.jpg",
    alt: "Luxurious hotel room interior",
  },
]

// Use exactly the images provided, up to 4 faces
const cubeImages = storyImages.slice(0, 4)

export default function StorySection() {
  const [currentFace, setCurrentFace] = useState(0)

  const handlePrevious = () => {
    setCurrentFace((prev) => (prev === 0 ? cubeImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentFace((prev) => (prev === cubeImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 sm:px-4 mb-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-center">
          {/* Image Section */}
          <div className="relative w-full max-w-[420px] aspect-square min-h-[220px] mx-auto flex-shrink-0 md:max-w-[340px] md:min-h-[180px] sm:max-w-[95vw] sm:min-h-[120px] xs:max-w-full xs:min-h-[100px]">
            <div className="cube-container w-full h-full">
              <div className="cube" style={{ transform: `rotateY(${currentFace * -90}deg)` }}>
                {cubeImages.map((image, index) => (
                  <div key={index} className={`cube-face cube-face-${index + 1}`}>
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 340px, 420px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Text Content */}
          <div className="w-full lg:pl-8 md:pl-4 sm:pl-0 mt-8 md:mt-0 text-center lg:text-left">
            <div className="mb-4">
              <span className="text-amber-800 text-sm tracking-wider uppercase border-b-2 border-amber-800 pb-1">
                THE PATLIPUTRA EXPERIENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg">
              <p>
                Hotel Patliputra Continental stands as a distinguished symbol of luxury in the heart of Patna. Founded with a vision to offer world-class hospitality while embracing the cultural richness of Bihar, we continue to ror business or leisure, our unwavering dedication to service, modern comforts, and elegant surroundings ensures a memorable experience, every time.
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

        /* Calculate the correct Z distance for the cube faces */
        .cube-face-1 { transform: rotateY(0deg) translateZ(210px); }
        .cube-face-2 { transform: rotateY(90deg) translateZ(210px); }
        .cube-face-3 { transform: rotateY(180deg) translateZ(210px); }
        .cube-face-4 { transform: rotateY(-90deg) translateZ(210px); }

        @media (max-width: 1024px) {
          .cube-face-1, .cube-face-2, .cube-face-3, .cube-face-4 {
            transform: none !important;
            position: static;
            width: 100%;
            height: 100%;
          }
          .cube {
            transform: none !important;
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
          }
        }

        @media (max-width: 640px) {
          .cube-container {
            min-width: 0;
            min-height: 0;
            max-width: 100vw;
            max-height: 60vw;
            perspective: 500px;
          }
          .cube {
            width: 100vw;
            height: 60vw;
            min-height: 100px;
            max-width: 100vw;
            max-height: 60vw;
          }
          .cube-face {
            width: 100vw;
            height: 60vw;
            min-height: 100px;
            max-width: 100vw;
            max-height: 60vw;
          }
        }
      `}</style>
    </section>
  )
}
