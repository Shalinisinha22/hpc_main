"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Gift, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

export default function MeetingsEventsSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
        console.error("Error fetching halls:", err)
      }
    }

    fetchHalls()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim() || !form.purpose.trim() || !form.date || !form.guests) {
      setFormError("All fields are mandatory.")
      toast.error("All fields are mandatory.")
      return
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const mobileRegex = /^\d{10}$/
    if (!emailRegex.test(form.email)) {
      setFormError("Please enter a valid email address.")
      toast.error("Please enter a valid email address.")
      return
    }
    if (!mobileRegex.test(form.mobile)) {
      setFormError("Please enter a valid 10-digit mobile number.")
      toast.error("Please enter a valid 10-digit mobile number.")
      return
    }
    setFormError("")
    try {
      const hallObj = halls.find(h => h.hall_name === form.hall)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
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
      toast.success("Quote request submitted!")
      setModalOpen(false)
    } catch (err) {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#bf840d] mb-4">Meetings & Events</h2>
        <p className="text-center text-gray-600 mb-2 max-w-2xl mx-auto">
      Where Every Event Becomes a Signature Moment
        </p>
        <p  className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Be it a grand wedding or an exclusive boardroom meet — our team brings energy, precision, and a personalised approach to every occasion.</p>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#bf840d] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading halls...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {halls.slice(0, 4).map((hall) => (
              <div key={hall._id} className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={hall.hall_image && hall.hall_image.length > 0 ? hall.hall_image[0].url : "/placeholder.svg"} 
                    alt={hall.hall_name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2 text-[#bf840d]">{hall.hall_name}</h3>
                  <p className="text-gray-600 text-sm mb-2">Up to {hall.max_capacity} guests</p>
                  <p className="text-gray-600 text-sm">{hall.short_intro}</p>
                  <Button className="mt-4 bg-[#bf840d] text-white" onClick={() => openModal(hall.hall_name)}>
                    Request Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <div className="text-center mb-12">
          <Button
            className="bg-[#bf840d] hover:bg-[#a06f0b] text-white px-8 py-3 text-lg"
            onClick={() => setIsDialogOpen(true)}
          >
            Request a Proposal
          </Button>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Business Meetings</h3>
            <p className="text-gray-600">Modern amenities and seamless service for focused, productive sessions.</p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Conferences</h3>
            <p className="text-gray-600">Spacious, tech-enabled venues perfect for impactful gatherings.</p>
          </div>
          <div className="text-center">
            <Gift className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Weddings</h3>
            <p className="text-gray-600">Timeless elegance and flawless execution for your big day.</p>
          </div>
          <div className="text-center">
            <Calendar className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Social Events</h3>
            <p className="text-gray-600">Flexible, stylish spaces tailored for every celebration</p>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request a Proposal</DialogTitle>
            <DialogDescription>
              Fill out this form and we'll get back to you with a custom proposal for your event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-type" className="text-right">
                Event Type
              </Label>
              <Input id="event-type" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input id="date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="guests" className="text-right">
                Guests
              </Label>
              <Input id="guests" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea id="message" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#bf840d] hover:bg-[#a06f0b] text-white">
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
          <div className="w-full max-w-lg h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg relative z-50 p-0">
            <form
              className="p-8"
              onSubmit={handleSubmit}
              style={{ minHeight: '100%', overflowY: 'auto' }}
            >
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
        </div>
      )}
      {halls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No halls available at the moment.</p>
        </div>
      )}
    </section>
  )
}
