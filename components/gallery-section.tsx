"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  title: string
  width: number
  height: number
}

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchImages() {
      try {
        const [roomsRes, hallsRes, diningRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/roomImages`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/halls/hallImages`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dining/diningImages`),
        ])
        const roomImages = roomsRes.data.flatMap((item: any) =>
          (item.images || []).map((img: any) => ({
            src: img.url || "/placeholder.svg",
            alt: img.alt || item.room_name || "Room Image",
            title: item.room_name || "Room",
            width: img.width || 2070,
            height: img.height || 1380,
            type: 'room',
          }))
        )
        const hallImages = hallsRes.data.flatMap((item: any) =>
          (item.images || []).map((img: any) => ({
            src: img.url || "/placeholder.svg",
            alt: img.alt || item.hall_name || "Hall Image",
            title: item.hall_name || "Hall",
            width: img.width || 2070,
            height: img.height || 1380,
            type: 'hall',
          }))
        )
        const diningImages = diningRes.data.flatMap((item: any) =>
          (item.images || []).map((img: any) => ({
            src: img.url || "/placeholder.svg",
            alt: img.alt || item.dining_name || "Dining Image",
            title: item.dining_name || "Dining",
            width: img.width || 2070,
            height: img.height || 1380,
            type: 'dining',
          }))
        )
        // Interleave images for a mixed gallery
        const maxLen = Math.max(roomImages.length, hallImages.length, diningImages.length)
        const mixed: any[] = []
        for (let i = 0; i < maxLen; i++) {
          if (roomImages[i]) mixed.push(roomImages[i])
          if (hallImages[i]) mixed.push(hallImages[i])
          if (diningImages[i]) mixed.push(diningImages[i])
        }
        setGalleryImages(mixed.slice(0, 8))
      } catch (e) {
        // handle error (optional: set error state)
      }
    }
    fetchImages()
  }, [])

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#bf840d] mb-12">Glimpses of Luxury</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-lg group"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black border-none">
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={galleryImages[currentImageIndex]?.src || "/placeholder.svg"}
                    alt={galleryImages[currentImageIndex]?.title || ""}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                    <h3 className="text-lg font-semibold">{galleryImages[currentImageIndex]?.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                    onClick={() => document.querySelector('[data-state="open"]')?.closest("button")?.click()}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
