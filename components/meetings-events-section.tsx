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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#bf840d] mb-4">Meetings & Events</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          From intimate gatherings to grand celebrations, our versatile spaces and expert team ensure your event is a
          resounding success.
        </p>

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
                  {/* {hall.status === 'available' && (
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Available
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mb-12">
          <Button
            className="bg-[#bf840d] hover:bg-[#a06f0b] text-white px-8 py-3 text-lg"
            onClick={() => setIsDialogOpen(true)}
          >
            Request a Proposal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Business Meetings</h3>
            <p className="text-gray-600">State-of-the-art facilities for productive sessions</p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Conferences</h3>
            <p className="text-gray-600">Spacious venues for large-scale events</p>
          </div>
          <div className="text-center">
            <Gift className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Weddings</h3>
            <p className="text-gray-600">Elegant settings for your special day</p>
          </div>
          <div className="text-center">
            <Calendar className="w-12 h-12 text-[#bf840d] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Social Events</h3>
            <p className="text-gray-600">Versatile spaces for all types of celebrations</p>
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
    </section>
  )
}
