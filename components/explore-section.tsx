"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const exploreImages = [
  {
    url: "https://cdn.getyourguide.com/img/tour/d3ece1033c08c32e0053fe0e52dd497d5c663170ee12ae0a9b781de3519dbefb.jpg/145.jpg",
    caption: "Mahabodhi Temple, Bodh Gaya",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg",
    caption: "Nalanda University Ruins",
  },
  {
    url: "https://cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/LZI5P4XGXBENJILAROAWWMFRSI.jpg",
    caption: "Great Buddha Statue, Bodh Gaya",
  },
  {
    url: "https://s7ap1.scene7.com/is/image/incredibleindia/gol-ghar-patna-bihar-3-attr-hero?qlt=82&ts=1726740434905",
    caption: "Golghar, Patna",
  },
  {
    url: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/takht_sri_harmandir_sahib/gurudwara_sri_harmandir_sahib__36.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg",
    caption: "Takht Sri Patna Sahib",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/27/%22_Tomb_of_Sher_Shah_Suri_%22.jpg",
    caption: "Sher Shah Suri Tomb, Sasaram",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vikramshila_2012-08-10-17.14.08.jpg/800px-Vikramshila_2012-08-10-17.14.08.jpg",
    caption: "Ruins of Vikramshila University",
  },
]

export default function ExploreSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let startTime: number

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (!isPaused) {
        scrollContainer.scrollLeft = (progress * 0.05) % (scrollContainer.scrollWidth / 2)
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#bf840d] mb-4">#ExploreBihar</h2>
          <p className="text-gray-600 text-lg">Share your journey and tag us #HPCPatna and @HotelPatliputraContinental </p>
        </div>

        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Image Gallery */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {[...exploreImages, ...exploreImages].map((image, index) => (
              <div key={index} className="relative flex-none w-[300px] group">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-lg font-medium">{image.caption}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=Exploring ${image.caption} in Bihar! %23LuxeHavenBihar`,
                      )
                    }
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg mb-6">
            Discover the rich cultural heritage and spiritual significance of Bihar, from ancient Buddhist sites to
            historical landmarks and vibrant local art. Experience the diverse attractions that make Bihar a unique
            destination.
          </p>
          <Button
            className="bg-[#bf840d] hover:bg-[#a06f0b] text-white px-8 py-6 text-lg"
            onClick={() => (window.location.href = "/explore-bihar")}
          >
            Explore More
          </Button>
        </div>
      </div>
    </section>
  )
}
