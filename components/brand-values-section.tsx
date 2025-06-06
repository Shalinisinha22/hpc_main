"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"

const brandValues = [
  {
    title: "TIMELESS",
    description:
      "Immerse yourself in our heritage of elegance that transcends eras. Our timeless hospitality combines classic sophistication with contemporary comfort, creating memories that last a lifetime.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Presidential_Suite.jpg-tIEq1ZM5t2rjZM0kYjhTeovCWJw9ma.jpeg",
  },
  {
    title: "ICONIC",
    description:
      "Experience the hallmark of luxury that has defined us for generations. Our iconic presence offers distinctive experiences, unmatched service excellence, and a legendary heritage that continues to set new standards.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aaeb224cdb5535543793ca4da4c53618-HeJcACVvWgYeVDcAYLTiD3D6kzCy4F.jpeg",
  },
  {
    title: "AUTHENTIC",
    description:
      "Discover the true essence of our destination through carefully curated experiences. Our authentic approach celebrates local culture, traditions, and flavors, connecting you meaningfully to the heart of Bihar.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/86928392.jpg-vbAAnNxKFIaE53YR9xtrnluwQKxmS2.jpeg",
  },
  {
    title: "SOULFUL",
    description:
      "Feel the warmth of hospitality that touches your heart. Our soulful service goes beyond luxury amenities to create deeply personal connections, mindful moments, and transformative experiences that nurture your wellbeing.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/216924189.jpg-RxFU7h9xybc7OyKSK9N74e9i4Ad7lx.jpeg",
  },
]

export default function BrandValuesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      handlePrev()
    }
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === brandValues.length - 1 ? 0 : prev + 1))
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      startAutoPlay()
    }
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? brandValues.length - 1 : prev - 1))
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      startAutoPlay()
    }
  }

  const startAutoPlay = () => {
    if (isMobile) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev === brandValues.length - 1 ? 0 : prev + 1))
      }, 5000)
    }
  }

  // Auto-rotate through values on mobile
  useEffect(() => {
    startAutoPlay()
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isMobile])

  return (
    <section className="relative w-full overflow-hidden" style={{ height: isMobile ? "auto" : "100vh" }}>
      {isMobile ? (
        // Enhanced Mobile layout with reduced image height
        <div className="flex flex-col w-full py-10 bg-gray-50">
          <h2 className="text-3xl font-serif text-center mb-6">Our Brand Values</h2>

          <div
            className="relative w-full px-4 mb-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ height: "40vh" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={brandValues[activeIndex].image || "/placeholder.svg"}
                    alt={brandValues[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-full"
                    >
                      <h3 className="text-3xl font-serif tracking-wider mb-2 text-center">
                        {brandValues[activeIndex].title}
                      </h3>
                      <p className="text-center text-sm leading-relaxed line-clamp-3">
                        {brandValues[activeIndex].description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors z-10"
                aria-label="Previous value"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors z-10"
                aria-label="Next value"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Value indicators */}
          <div className="flex justify-center items-center gap-2 px-4">
            {brandValues.map((value, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-1 py-2 px-1 rounded-lg transition-all ${
                  activeIndex === index
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-200"
                }`}
              >
                <p className="text-xs font-medium text-center">{value.title}</p>
              </button>
            ))}
          </div>

          {/* Full description for mobile */}
          <div className="px-6 mt-4">
            <p className="text-sm text-gray-700 text-center">{brandValues[activeIndex].description}</p>
          </div>
        </div>
      ) : (
        // Desktop layout - horizontal flex
        <div className="flex h-full">
          {brandValues.map((value, index) => (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden cursor-pointer"
              initial={{ flex: 1 }}
              animate={{ flex: hoveredIndex === index ? 3 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Image
                src={value.image || "/placeholder.svg"}
                alt={value.title}
                fill
                className="object-cover transition-transform duration-700"
                style={{
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                }}
              />
              <div
                className="absolute inset-0 bg-black transition-opacity duration-300"
                style={{
                  opacity: hoveredIndex === index ? 0.2 : 0.4,
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <motion.h3
                  className="text-3xl md:text-4xl font-serif tracking-wider mb-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {value.title}
                </motion.h3>
                <motion.p
                  className="text-center text-sm md:text-base max-w-xs"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {value.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
