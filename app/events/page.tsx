"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"
import { AutoScrollImageCarousel } from "@/components/auto-scroll-image-carousel"
import { SeatingIcon } from "@/components/seating-icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Hall {
  _id: string
  hall_name: string
  max_capacity: number
  short_intro: string
  desc: string
  length: number
  breadth: number
  height: number
  area: number
  guest_entry_point: string
  additionalDetails: string[]
  phone: string
  email: string
  seating: {
    theatre: number
    ushaped: number
    boardroom: number
    classroom: number
    reception: number
    _id: string
  }
  hall_image: Array<{
    name: string
    url: string
    ext: string
    _id: string
  }>
  status: string
  cdate: string
  __v: number
}

export default function EventsPage() {
  const [halls, setHalls] = useState<Hall[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedHall, setSelectedHall] = useState("")
  const [form, setForm] = useState({
    hall: "",
    date: "",
    guests: "",
    name: "",
    mobile: "",
    email: "",
    purpose: "",
    message: ""
  })
  const [formError, setFormError] = useState("")

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/halls`)
        setHalls(response.data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch halls")
        setIsLoading(false)
      }
    }
    fetchHalls()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, mobile, purpose, date, guests } = form

    if (!name.trim() || !email.trim() || !mobile.trim() || !purpose.trim() || !date || !guests) {
      setFormError("All fields are mandatory.")
      return
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const mobileRegex = /^\d{10}$/

    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.")
      return
    }
    if (!mobileRegex.test(mobile)) {
      setFormError("Please enter a valid 10-digit mobile number.")
      return
    }

    setFormError("")
    try {
      const hallObj = halls.find(h => h.hall_name === form.hall)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("hpc-token") || ''}`
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          mobile: form.mobile.trim(),
          eventType: form.purpose,
          date: form.date,
          guests: Number(form.guests),
          message: form.message.trim(),
          hallId: hallObj?._id || undefined
        })
      })

      if (!res.ok) throw new Error("Failed to submit request")
      setModalOpen(false)
      toast.success("Quote request submitted!")
    } catch {
      setFormError("Failed to submit request. Please try again.")
      toast.error("Failed to submit request. Please try again.")
    }
  }

  const openModal = (hallName: string) => {
    setSelectedHall(hallName)
    setForm(f => ({ ...f, hall: hallName }))
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80"
            alt="Events and meetings"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Events & Meetings</h1>
          <p className="text-base sm:text-xl mb-6">Create lasting impressions in our elegant, adaptable venues.
</p>
          <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">Plan Your Event</Button>
        </div>
      </section>

      {/* Event Halls */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl text-center font-serif text-[#bf840d] mb-10">Our Event Halls</h2>

          {/* Loader and Error after Hero Section */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[40vh]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#bf840d]"></div>
            </div>
          )}
          {error && !isLoading && (
            <div className="flex justify-center items-center min-h-[40vh]">
              <div className="text-red-600">{error}</div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 gap-10">
              {halls.map((hall) => (
                <div key={hall._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative h-64 lg:h-auto lg:w-1/2">
                      {hall.hall_image.length ? (
                        <AutoScrollImageCarousel images={hall.hall_image.map(img => img.url)} name={hall.hall_name} />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No image available</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 lg:w-1/2">
                      <h3 className="text-xl sm:text-3xl font-serif text-[#bf840d] mb-2">{hall.hall_name}</h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-2">{hall.short_intro}</p>
                      <div className="text-gray-700 text-sm line-clamp-3 sm:line-clamp-none mb-4" dangerouslySetInnerHTML={{ __html: hall.desc }} />

                      <Tabs defaultValue="seating" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full">
                                <TabsTrigger value="seating">Capacity</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                    
                          <TabsTrigger value="amenities">Amenities</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="mt-4 text-sm">
                          <p><strong>Dimensions:</strong> {hall.length} x {hall.breadth} ft</p>
                          <p><strong>Area:</strong> {hall.area} sq ft</p>
                          <p><strong>Max Capacity:</strong> {hall.max_capacity}</p>
                        </TabsContent>

                        <TabsContent value="seating" className="mt-4 text-sm grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {Object.entries(hall.seating).map(([key, value]) =>
                            key !== "_id" ? (
                              <div key={key} className="flex items-center gap-2">
                                <SeatingIcon style={key} className="w-5 h-5 text-[#bf840d]" />
                                <span>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
                              </div>
                            ) : null
                          )}
                        </TabsContent>

                        <TabsContent value="amenities" className="mt-4 text-sm">
                          <ul className="list-disc ml-4">
                            {hall.additionalDetails.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>

                      <div className="mt-6 flex justify-between flex-col sm:flex-row gap-3 text-sm">
                        <div>
                          <p>📞 {hall.phone}</p>
                          <p>✉️ {hall.email}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white"
                          onClick={() => openModal(hall.hall_name)}
                        >
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4 overflow-y-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 sm:p-8 relative"
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-[#bf840d] mb-4">Request a Quote</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <Label>Venue *</Label>
                    <select
                      value={selectedHall}
                      onChange={e => {
                        setSelectedHall(e.target.value)
                        setForm(f => ({ ...f, hall: e.target.value }))
                      }}
                      className="w-full border rounded p-2"
                      required
                    >
                      <option value="">Select Hall</option>
                      {halls.map(h => (
                        <option key={h._id} value={h.hall_name}>{h.hall_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Date *</Label>
                    <Input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Guests *</Label>
                    <Input type="number" min="1" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Name *</Label>
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Mobile *</Label>
                    <Input type="tel" value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Purpose *</Label>
                    <select
                      value={form.purpose}
                      onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                      className="w-full border rounded p-2"
                      required
                    >
                      <option value="">Select Purpose</option>
                      <option value="wedding">Wedding</option>
                      <option value="conference">Conference</option>
                      <option value="meeting">Meeting</option>
                      <option value="social event">Social Event</option>
                    </select>
                  </div>
                  <div>
                    <Label>Message</Label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full border p-2 rounded"
                      rows={3}
                      placeholder="Optional"
                    />
                  </div>
                  {formError && <p className="text-red-600 text-sm">{formError}</p>}
                  <Button type="submit" className="w-full bg-[#bf840d] text-white mt-2">Submit</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
