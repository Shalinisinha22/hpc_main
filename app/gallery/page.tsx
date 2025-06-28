"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import axios from "axios"

type GalleryImage = {
  url: string
  name?: string
  ext?: string
  _id?: string
  room_name?: string
  hall_name?: string
  dining_name?: string
}

export default function GalleryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [roomImages, setRoomImages] = useState<GalleryImage[]>([])
  const [hallImages, setHallImages] = useState<GalleryImage[]>([])
  const [diningImages, setDiningImages] = useState<GalleryImage[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImages, setModalImages] = useState<GalleryImage[]>([])
  // Show more toggles for each section
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAllHalls, setShowAllHalls] = useState(false);
  const [showAllDining, setShowAllDining] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        const [roomsRes, hallsRes, diningRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/roomImages`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/halls/hallImages`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dining/diningImages`),
        ])
        // Attach room_name/hall_name/dining_name to each image
        setRoomImages(roomsRes.data.flatMap((item: any) => (item.images || []).map((img: any) => ({ ...img, room_name: item.room_name }))
        ))
        setHallImages(hallsRes.data.flatMap((item: any) => (item.images || []).map((img: any) => ({ ...img, hall_name: item.hall_name }))
        ))
        setDiningImages(diningRes.data.flatMap((item: any) => (item.images || []).map((img: any) => ({ ...img, dining_name: item.dining_name }))
        ))
      } catch (e) {
        // handle error
      }
    }
    fetchImages()
  }, [])

  const openModal = (images: GalleryImage[], idx: number) => {
    setModalImages(images)
    setCurrentImageIndex(idx)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handlePrevModal = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1))
  }
  const handleNextModal = () => {
    setCurrentImageIndex((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Hotel gallery"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Our Gallery</h1>
            <p className="text-xl">Moments of grandeur, captured just for you.</p>
          </div>
        </section>

        {/* Rooms & Suites Gallery */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-[#bf840d] mb-8 tracking-wide border-b-2 border-[#bf840d] pb-1 flex items-center justify-between">
              <span>Rooms & Suites</span>
              {roomImages.length > 4 && (
                <button
                  className="ml-4 text-[#bf840d] hover:text-[#8B5E04] transition-colors flex items-center"
                  onClick={() => setShowAllRooms((v) => !v)}
                  aria-label={showAllRooms ? "Show less" : "Show more"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-6 h-6 transition-transform ${showAllRooms ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
                  </svg>
                  <span className="ml-1 text-base font-medium">{showAllRooms ? "Show less" : "Show more"}</span>
                </button>
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(showAllRooms ? roomImages : roomImages.slice(0, 4)).map((img, idx) => (
                <div
                  key={img._id || idx}
                  className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lg cursor-pointer group bg-gray-100"
                  onClick={() => openModal(showAllRooms ? roomImages : roomImages.slice(0, 4), idx)}
                >
                  <Image src={img.url || "/placeholder.svg"} alt={img.room_name || img.name || "Room image"} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-end justify-start p-4">
                    <span className="text-white text-lg font-semibold transition-opacity duration-300 bg-black/60 px-3 py-1 rounded shadow">
                      {img.room_name || img.name || "Room"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meeting & Events Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-[#bf840d] mb-8 tracking-wide border-b-2 border-[#bf840d] pb-1 flex items-center justify-between">
              <span>Meeting & Events</span>
              {hallImages.length > 4 && (
                <button
                  className="ml-4 text-[#bf840d] hover:text-[#8B5E04] transition-colors flex items-center"
                  onClick={() => setShowAllHalls((v) => !v)}
                  aria-label={showAllHalls ? "Show less" : "Show more"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-6 h-6 transition-transform ${showAllHalls ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
                  </svg>
                  <span className="ml-1 text-base font-medium">{showAllHalls ? "Show less" : "Show more"}</span>
                </button>
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(showAllHalls ? hallImages : hallImages.slice(0, 4)).map((img, idx) => (
                <div
                  key={img._id || idx}
                  className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lg cursor-pointer group bg-gray-100"
                  onClick={() => openModal(showAllHalls ? hallImages : hallImages.slice(0, 4), idx)}
                >
                  <Image src={img.url || "/placeholder.svg"} alt={img.hall_name || img.name || "Hall image"} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-end justify-start p-4">
                    <span className="text-white text-lg font-semibold transition-opacity duration-300 bg-black/60 px-3 py-1 rounded shadow">
                      {img.hall_name || img.name || "Hall"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dining Gallery */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-[#bf840d] mb-8 tracking-wide border-b-2 border-[#bf840d] pb-1 flex items-center justify-between">
              <span>Dining</span>
              {diningImages.length > 4 && (
                <button
                  className="ml-4 text-[#bf840d] hover:text-[#8B5E04] transition-colors flex items-center"
                  onClick={() => setShowAllDining((v) => !v)}
                  aria-label={showAllDining ? "Show less" : "Show more"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-6 h-6 transition-transform ${showAllDining ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
                  </svg>
                  <span className="ml-1 text-base font-medium">{showAllDining ? "Show less" : "Show more"}</span>
                </button>
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(showAllDining ? diningImages : diningImages.slice(0, 4)).map((img, idx) => (
                <div
                  key={img._id || idx}
                  className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lg cursor-pointer group bg-gray-100"
                  onClick={() => openModal(showAllDining ? diningImages : diningImages.slice(0, 4), idx)}
                >
                  <Image src={img.url || "/placeholder.svg"} alt={img.dining_name || img.name || "Dining image"} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-end justify-start p-4">
                    <span className="text-white text-lg font-semibold transition-opacity duration-300 bg-black/60 px-3 py-1 rounded shadow">
                      {img.dining_name || img.name || "Dining"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for image preview */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black border-none flex items-center justify-center">
            {modalImages.length > 0 && (
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <Image
                  src={modalImages[currentImageIndex]?.url || "/placeholder.svg"}
                  alt={modalImages[currentImageIndex]?.dining_name || modalImages[currentImageIndex]?.room_name || modalImages[currentImageIndex]?.hall_name || modalImages[currentImageIndex]?.name || "Gallery image"}
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white p-3 rounded">
                  <h3 className="text-lg font-semibold">
                    {modalImages[currentImageIndex]?.dining_name || modalImages[currentImageIndex]?.room_name || modalImages[currentImageIndex]?.hall_name || modalImages[currentImageIndex]?.name}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                  onClick={closeModal}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                  onClick={handlePrevModal}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                  onClick={handleNextModal}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
