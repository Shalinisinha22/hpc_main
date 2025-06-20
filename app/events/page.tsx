"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { AutoScrollImageCarousel } from "@/components/auto-scroll-image-carousel"
import { SeatingIcon } from "@/components/seating-icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { X } from "lucide-react"
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
    // time: "",
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
        console.error("Error fetching halls:", err)
      }
    }

    fetchHalls()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#bf840d] mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading halls...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#bf840d] hover:bg-[#8B5E04] text-white"
            >
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Modal form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate all fields
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim() || !form.purpose.trim() || !form.date || !form.guests) {
      setFormError("All fields are mandatory.")
      return
    }
    // Email and mobile validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const mobileRegex = /^\d{10}$/
    if (!emailRegex.test(form.email)) {
      setFormError("Please enter a valid email address.")
      return
    }
    if (!mobileRegex.test(form.mobile)) {
      setFormError("Please enter a valid 10-digit mobile number.")
      return
    }
    setFormError("")
    try {
      const hallObj = halls.find(h => h.hall_name === form.hall)
      const res = await fetch("/api/v1/event-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch (err) {
      setFormError("Failed to submit request. Please try again.")
      toast.error("Failed to submit request. Please try again.")
    }
  }

  // Only open modal when user clicks Request Quote
  const openModal = (hallName: string) => {
    setSelectedHall(hallName)
    setForm(f => ({ ...f, hall: hallName }))
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Events and meetings"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Events & Meetings</h1>
            <p className="text-xl mb-8">Host unforgettable events in our versatile spaces</p>
            <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">Plan Your Event</Button>
          </div>
        </section>

        {/* Event Spaces Section */}
        <section className="py-16 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif text-center mb-12 text-[#bf840d]">Our Event Halls</h2>
            <div className="grid grid-cols-1 gap-16">
              {halls.map((hall) => (
                <div key={hall._id} className="bg-white rounded-lg overflow-hidden shadow-2xl border border-amber-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Hall Images */}
                    <div className="relative h-96 lg:h-auto">
                      {hall.hall_image && hall.hall_image.length > 0 ? (
                        <AutoScrollImageCarousel 
                          images={hall.hall_image.map(img => img.url)} 
                          name={hall.hall_name} 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No image available</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-3xl font-serif text-[#bf840d] mb-4">{hall.hall_name}</h3>
                      <p className="text-gray-600 mb-4">{hall.short_intro}</p>
                      
                      {/* Full Description */}
                      <div className="mb-6">
                        <div 
                          className="text-gray-700 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: hall.desc }}
                        />
                      </div>
                      
                      {/* Status Badge */}
                      {/* <div className="mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          hall.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {hall.status.charAt(0).toUpperCase() + hall.status.slice(1)}
                        </span>
                      </div> */}

                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="seating">Seating</TabsTrigger>
                          <TabsTrigger value="amenities">Amenities</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="details" className="mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-[#bf840d] text-base mb-3">Physical Specifications</h4>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="mb-2">
                                  <span className="font-semibold">Dimensions:</span> {hall.length} ft × {hall.breadth} ft
                                </p>
                              
                              
                                <p className="mb-2">
                                  <span className="font-semibold">Total Area:</span> {hall.area} sq ft
                                </p>
                                  <p className="mb-2">
                                  <span className="font-semibold">Height:</span> <span>{hall.height} ft</span>
                                </p>
                             
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-semibold text-[#bf840d] text-base mb-3">Capacity & Contact</h4>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="mb-2">
                                  <span className="font-semibold">Maximum Capacity:</span> <span className="text-[#bf840d] font-bold">Up to {hall.max_capacity} guests</span>
                                </p>
                                <p>
                                  <span className="font-semibold">Entry Points:</span> <span>{hall.guest_entry_point}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="seating" className="mt-4">
                          {hall.seating && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center">
                                <SeatingIcon style="Theatre" className="w-6 h-6 mr-2 text-[#bf840d]" />
                                <span>Theatre: {hall.seating.theatre}</span>
                              </div>
                              <div className="flex items-center">
                                <SeatingIcon style="Ushaped" className="w-6 h-6 mr-2 text-[#bf840d]" />
                                <span>U-shaped: {hall.seating.ushaped}</span>
                              </div>
                              <div className="flex items-center">
                                <SeatingIcon style="Boardroom" className="w-6 h-6 mr-2 text-[#bf840d]" />
                                <span>Boardroom: {hall.seating.boardroom}</span>
                              </div>
                              <div className="flex items-center">
                                <SeatingIcon style="Classroom" className="w-6 h-6 mr-2 text-[#bf840d]" />
                                <span>Classroom: {hall.seating.classroom}</span>
                              </div>
                              <div className="flex items-center">
                                <SeatingIcon style="Reception" className="w-6 h-6 mr-2 text-[#bf840d]" />
                                <span>Reception: {hall.seating.reception}</span>
                              </div>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="amenities" className="mt-4">
                          <ul className="grid grid-cols-1 gap-2 text-sm">
                            {hall.additionalDetails.map((detail, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>

                      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <p>Contact: {hall.phone}</p>
                          <p>Email: {hall.email}</p>
                        </div>
                        <div className="flex gap-4">
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
                </div>
              ))}
            </div>
            {/* Modal for Request Quote */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
                <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative z-50" onSubmit={handleSubmit}>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h3 className="text-2xl font-bold mb-6 text-[#bf840d]">Request for Quote</h3>
                  <div className="mb-4">
                    <Label htmlFor="venue">Venue Name *</Label>
                    <select
                      id="venue"
                      className="form-select w-full border rounded p-2"
                      value={selectedHall}
                      onChange={e => {
                        setSelectedHall(e.target.value)
                        setForm(f => ({ ...f, hall: e.target.value }))
                      }}
                      required
                    >
                      <option value="">Select Hall</option>
                      {halls.map(h => (
                        <option key={h._id} value={h.hall_name}>{h.hall_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={form.guests}
                      onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  {/* <div className="mb-4">
                    <Label htmlFor="time">Time of the Event *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                      required
                    />
                  </div> */}
                  <div className="mb-4">
                    <Label htmlFor="purpose">Purpose of the Event *</Label>
                    <select
                      id="purpose"
                      className="form-select w-full border rounded p-2"
                      value={form.purpose}
                      onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                      required
                    >
                      <option value="">Choose Purpose of the Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="conference">Conference</option>
                      <option value="meeting">Meeting</option>
                      <option value="social event">Social Event</option>
                     
                    </select>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="message">Message (optional)</Label>
                    <textarea
                      id="message"
                      className="form-input w-full border rounded p-2"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      maxLength={1000}
                      rows={3}
                      placeholder="Any special requests or details (max 1000 characters)"
                    />
                  </div>
                  {formError && <div className="text-red-600 mb-2 text-sm">{formError}</div>}
                  <div className="text-xs text-gray-500 mb-4">* All fields are mandatory.</div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#bf840d] text-white">Submit</Button>
                  </div>
                </form>
              </div>
            )}
            {halls.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No halls available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
