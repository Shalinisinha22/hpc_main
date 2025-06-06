"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Gift, Calendar } from "lucide-react"
import { useState } from "react"
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

const eventSpaces = [
  {
    name: "Executive Boardroom",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93997118.jpg-eaN9O2PE6k6fzrdNPNweT0irLQn2U2.jpeg",
    capacity: "Up to 20 guests",
    description: "Modern boardroom featuring state-of-the-art facilities and professional ambiance.",
  },
  {
    name: "Grand Ballroom",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f18ac94e9591b198432d3a6068631b86.jpg-EeR8HFqT7XC0QriR0jGnlcxZ1zeDW1.jpeg",
    capacity: "Up to 500 guests",
    description: "Spacious venue perfect for large conferences, ceremonies, and grand celebrations.",
  },
  {
    name: "Conference Hall",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93734625.jpg-p0c5fglcXNx8L5OMqfBPmtUn5rwrMw.jpeg",
    capacity: "Up to 200 guests",
    description: "Versatile space ideal for corporate meetings and training sessions.",
  },
  {
    name: "Banquet Hall",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a36e56114f70852a3309d5b6792fd8ff-tozsIAyQowOKmgCKBDhSZruCFdu6qq.webp",
    capacity: "Up to 300 guests",
    description: "Elegant setting for conferences and corporate events with modern amenities.",
  },
]

export default function MeetingsEventsSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#bf840d] mb-4">Meetings & Events</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          From intimate gatherings to grand celebrations, our versatile spaces and expert team ensure your event is a
          resounding success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {eventSpaces.map((space, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative h-48">
                <Image src={space.image || "/placeholder.svg"} alt={space.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-[#bf840d]">{space.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{space.capacity}</p>
                <p className="text-gray-600 text-sm">{space.description}</p>
              </div>
            </div>
          ))}
        </div>

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
