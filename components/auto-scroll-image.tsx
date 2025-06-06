"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function useAutoScroll(images: string[], interval = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  return currentIndex
}

export function AutoScrollImage({ images, interval = 5000 }: { images: string[]; interval?: number }) {
  const currentIndex = useAutoScroll(images, interval)

  return (
    <div className="relative h-64 w-full overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src || "/placeholder.svg"}
          alt={`Amenity image ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  )
}
