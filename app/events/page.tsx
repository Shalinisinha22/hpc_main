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

const eventSpaces = [
  {
    name: "Diamond Hall",
    description:
      "Our flagship venue, specially designed for business conferences, grand weddings, and prestigious events. Features state-of-the-art audiovisual equipment and elegant décor.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f18ac94e9591b198432d3a6068631b86.jpg-EeR8HFqT7XC0QriR0jGnlcxZ1zeDW1.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93734625.jpg-p0c5fglcXNx8L5OMqfBPmtUn5rwrMw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a36e56114f70852a3309d5b6792fd8ff-tozsIAyQowOKmgCKBDhSZruCFdu6qq.webp",
    ],
    capacity: "Up to 500 guests",
    details: {
      dimension: "80 ft x 40 ft",
      area: "3,200 Sq.ft.",
      height: "18 ft",
      entryPoints: 3,
      seating: {
        theatre: 500,
        classroom: 300,
        ushaped: 120,
        boardroom: 150,
        reception: 600,
        circular: 400,
      },
    },
    amenities: [
      "State-of-the-art AV equipment",
      "Customizable LED lighting",
      "High-speed Wi-Fi",
      "Built-in stage",
      "Separate entrance foyer",
      "VIP lounge",
      "Catering kitchen access",
      "Complimentary parking",
    ],
    contact: {
      phone: "+91 9798888243",
      email: "events@luxehaven.com",
    },
  },
  {
    name: "Emerald Boardroom",
    description:
      "Premium executive meeting space with sophisticated technology and ergonomic furnishings, perfect for high-level business discussions.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93997118.jpg-eaN9O2PE6k6fzrdNPNweT0irLQn2U2.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93734625.jpg-p0c5fglcXNx8L5OMqfBPmtUn5rwrMw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a36e56114f70852a3309d5b6792fd8ff-tozsIAyQowOKmgCKBDhSZruCFdu6qq.webp",
    ],
    capacity: "Up to 30 guests",
    details: {
      dimension: "40 ft x 20 ft",
      area: "800 Sq.ft.",
      height: "12 ft",
      entryPoints: 1,
      seating: {
        boardroom: 30,
        ushaped: 22,
        theatre: 40,
        classroom: 24,
      },
    },
    amenities: [
      "4K video conferencing system",
      "Interactive smart board",
      "Ergonomic executive chairs",
      "Built-in power and data ports",
      "Soundproof walls",
      "Adjustable lighting",
      "Private restrooms",
      "Executive catering service",
    ],
    contact: {
      phone: "+91 9798888244",
      email: "boardroom@luxehaven.com",
    },
  },
  {
    name: "Crystal Garden",
    description:
      "Stunning outdoor venue with manicured gardens and elegant pavilions, ideal for weddings and social gatherings.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f18ac94e9591b198432d3a6068631b86.jpg-EeR8HFqT7XC0QriR0jGnlcxZ1zeDW1.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93734625.jpg-p0c5fglcXNx8L5OMqfBPmtUn5rwrMw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93997118.jpg-eaN9O2PE6k6fzrdNPNweT0irLQn2U2.jpeg",
    ],
    capacity: "Up to 300 guests",
    details: {
      dimension: "100 ft x 60 ft",
      area: "6,000 Sq.ft.",
      height: "Open air",
      entryPoints: 4,
      seating: {
        reception: 300,
        circular: 250,
        theatre: 280,
      },
    },
    amenities: [
      "Picturesque landscaping",
      "Covered pavilions",
      "Outdoor lighting",
      "Water features",
      "Bridal suite",
      "Outdoor power sources",
      "Portable dance floor",
      "Backup indoor space",
    ],
    contact: {
      phone: "+91 9798888245",
      email: "garden@luxehaven.com",
    },
  },
  {
    name: "Ruby Suites",
    description:
      "Versatile meeting rooms that can be combined or used separately, featuring modern amenities and natural lighting.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93734625.jpg-p0c5fglcXNx8L5OMqfBPmtUn5rwrMw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a36e56114f70852a3309d5b6792fd8ff-tozsIAyQowOKmgCKBDhSZruCFdu6qq.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93997118.jpg-eaN9O2PE6k6fzrdNPNweT0irLQn2U2.jpeg",
    ],
    capacity: "20-80 guests per suite",
    details: {
      dimension: "30 ft x 25 ft (per suite)",
      area: "750 Sq.ft. (per suite)",
      height: "10 ft",
      entryPoints: 2,
      seating: {
        theatre: 80,
        classroom: 40,
        ushaped: 30,
        boardroom: 36,
        reception: 100,
      },
    },
    amenities: [
      "Modular furniture",
      "Built-in projectors and screens",
      "Individual climate control",
      "Natural daylight",
      "Blackout curtains",
      "Breakout area",
      "Writing walls",
      "Refreshment station",
    ],
    contact: {
      phone: "+91 9798888246",
      email: "suites@luxehaven.com",
    },
  },
]

export default function EventsPage() {
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
                          {/* <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">View Details</Button> */}
                          <Button
                            variant="outline"
                            //  className="bg-[#bf840d] hover:bg-[#8B5E04] text-white"
                            className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white"
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
