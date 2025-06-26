"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Add coordinates for Hotel Patliputra and each site
const HOTEL_COORDS = { lat: 25.6154, lng: 85.1415 } // Hotel Patliputra, Patna, Bihar
const exploreImages = [
  {
    url: "https://cdn.getyourguide.com/img/tour/d3ece1033c08c32e0053fe0e52dd497d5c663170ee12ae0a9b781de3519dbefb.jpg/145.jpg",
    caption: "Mahabodhi Temple, Bodh Gaya",
    coords: { lat: 24.6951, lng: 84.9914 },
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg",
    caption: "Nalanda University",
    coords: { lat: 25.1357, lng: 85.4436 },
  },
  {
    url: "https://cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/LZI5P4XGXBENJILAROAWWMFRSI.jpg",
    caption: "Great Buddha Statue, Bodh Gaya",
    coords: { lat: 24.6959, lng: 84.9916 },
  },
  {
    url: "https://s7ap1.scene7.com/is/image/incredibleindia/gol-ghar-patna-bihar-3-attr-hero?qlt=82&ts=1726740434905",
    caption: "Golghar, Patna",
    coords: { lat: 25.6121, lng: 85.1376 },
  },
  {
    url: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/takht_sri_harmandir_sahib/gurudwara_sri_harmandir_sahib__36.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg",
    caption: "Takht Sri Patna Sahib",
    coords: { lat: 25.6207, lng: 85.2307 },
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/27/%22_Tomb_of_Sher_Shah_Suri_%22.jpg",
    caption: "Sher Shah Suri Tomb, Sasaram",
    coords: { lat: 24.9506, lng: 84.0287 },
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vikramshila_2012-08-10-17.14.08.jpg/800px-Vikramshila_2012-08-10-17.14.08.jpg",
    caption: "Ruins of Vikramshila University",
    coords: { lat: 25.3956, lng: 87.0173 },
  },
]

// Haversine formula to calculate distance in km
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180
  const R = 6371 // Radius of Earth in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

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
          <p className="text-gray-600 text-lg">Create memories worth sharing — tag @HotelPatliputraContinental and use #HPCPatna to be a part of our story. </p>
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
                  <div className="absolute top-0 left-0 right-0 flex justify-end items-start p-4">
                    {image.coords && (
                      <span className="flex items-center gap-1 text-xs text-amber-200 bg-black/40 rounded px-2 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  text-red-800" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2C6.686 2 4 4.686 4 8c0 4.418 5.293 9.293 5.52 9.52a.75.75 0 0 0 1.06 0C10.707 17.293 16 12.418 16 8c0-3.314-2.686-6-6-6zm0 2a4 4 0 0 1 4 4c0 2.763-2.74 6.234-4 7.554C8.74 12.234 6 8.763 6 6a4 4 0 0 1 4-4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" clipRule="evenodd"/></svg>
                        {`${getDistanceKm(HOTEL_COORDS.lat, HOTEL_COORDS.lng, image.coords.lat, image.coords.lng)} km from hotel`}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-lg font-medium">{image.caption}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      if (image.coords) {
                        const hotel = `${HOTEL_COORDS.lat},${HOTEL_COORDS.lng}`;
                        const dest = `${image.coords.lat},${image.coords.lng}`;
                        window.open(`https://www.google.com/maps/dir/?api=1&origin=${hotel}&destination=${dest}&travelmode=driving`, '_blank');
                      }
                    }}
                    aria-label="Show directions on map"
                  >

                    <img src="/google-maps.png" alt="Google Maps" className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg mb-6">
          Step into the soul of Bihar — where history breathes, spirituality awakens, and tradition thrives in every corner.
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
