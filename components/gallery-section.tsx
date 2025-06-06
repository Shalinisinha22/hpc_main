"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93734625.jpg-mOf4hEhWwtnasulhIfvqGLU9ujOt1i.jpeg",
    alt: "Spacious conference room with modern lighting and classroom-style setup",
    title: "Conference Facility",
    width: 2070,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coca1_11zon%20%281%29.jpg-TudrTtXkPmDRD6i4Mueiy4sSJ2xQTz.jpeg",
    alt: "Modern café with stylish yellow furniture",
    title: "Coca Mocha Café",
    width: 2070,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chao_china_11zon%20%281%29.jpg-A1pCdF8HvXZKhZxPW1EyDpDQDqViVq.jpeg",
    alt: "Elegant Chinese restaurant with traditional patterns",
    title: "Chinese Restaurant",
    width: 2070,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6ddf6236a969b6ab4622f54dc0f776fd-Ja6DWW8hxwy6FKwYdOq4G8d4dPVH8x.webp",
    alt: "Luxurious suite with romantic setup",
    title: "Luxury Suite",
    width: 2070,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tower_Suite.jfif-dXmaKDaeOuUr3tXNvgsjQY0mNZ8yct.jpeg",
    alt: "Unique circular suite with dramatic decor",
    title: "Tower Suite",
    width: 2071,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93997118.jpg-BVGoMR9L9pmmqmvMnxAVlmXiSGznK7.jpeg",
    alt: "Modern boardroom with oval table",
    title: "Executive Boardroom",
    width: 2070,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bistro_11zon%20%281%29%20%281%29.jpg-XifAUDnZyiiCqM6o179OEr9mLpnjiU.jpeg",
    alt: "Contemporary restaurant with elegant table settings",
    title: "Bistro Restaurant",
    width: 2025,
    height: 1380,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Presidential_Suite.jpg-Dlc4cAxTEY3VzGCoktcHeJINuoljgP.jpeg",
    alt: "Presidential suite with luxury amenities",
    title: "Presidential Suite",
    width: 2070,
    height: 1380,
  },
]

export default function GallerySection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
                    src={image.src || "/placeholder.svg"}
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
                    src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
                    alt={galleryImages[currentImageIndex].title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                    <h3 className="text-lg font-semibold">{galleryImages[currentImageIndex].title}</h3>
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
