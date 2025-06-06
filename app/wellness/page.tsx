"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { PocketIcon as Pool, SpadeIcon as Spa, Dumbbell, Gamepad2 } from "lucide-react"
import { AmenityCard } from "@/components/amenity-card"

const amenities = [
  {
    name: "Swimming Pool",
    icon: Pool,
    description: "Dive into luxury with our infinity pool overlooking the ocean. Perfect for laps or leisurely swims.",
    features: ["Temperature-controlled", "Infinity edge", "Poolside bar", "Comfortable loungers"],
    offer: "Book a cabana for a day and receive complimentary fruit platters and refreshments.",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1519449556851-5720b33024e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
  },
  {
    name: "Ocean Salon & Spa",
    icon: Spa,
    description:
      "Indulge in ultimate relaxation with our range of spa treatments inspired by ancient healing traditions.",
    features: ["Massage therapies", "Facial treatments", "Ayurvedic rituals", "Couples' packages"],
    offer: "Book any 90-minute treatment and receive a complimentary 30-minute add-on of your choice.",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
  },
  {
    name: "Gym",
    icon: Dumbbell,
    description:
      "Stay fit during your stay with our state-of-the-art gym equipment and personalized training sessions.",
    features: ["Latest cardio machines", "Free weights area", "Yoga studio", "Personal trainers available"],
    offer: "Enjoy a complimentary fitness assessment and personalized workout plan with any 5-day gym pass purchase.",
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    ],
  },
  {
    name: "Game Zone",
    icon: Gamepad2,
    description: "Unwind and have fun in our entertainment area featuring a variety of games for all ages.",
    features: ["Billiards table", "Table tennis", "Video game consoles", "Board games collection"],
    offer: "Happy Hour: Enjoy 2-for-1 on all game zone activities every day from 3 PM to 5 PM.",
    images: [
      "https://images.unsplash.com/photo-1582550945154-66ea8fff25e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    ],
  },
]

const wellnessPackages = [
  {
    name: "Relaxation Retreat",
    duration: "3 days",
    price: "₹25,000",
    color: "bg-blue-100",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
  },
  {
    name: "Fitness Fusion",
    duration: "5 days",
    price: "₹40,000",
    color: "bg-green-100",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    ],
  },
  {
    name: "Holistic Healing",
    duration: "7 days",
    price: "₹60,000",
    color: "bg-purple-100",
    images: [
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
  },
]

function useAutoScroll(images: string[], interval = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  return currentIndex
}

function AutoScrollImage({ images, interval = 5000 }: { images: string[]; interval?: number }) {
  const currentIndex = useAutoScroll(images, interval)

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src || "/placeholder.svg"}
          alt={`Amenity image ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  )
}

export default function WellnessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Wellness and spa"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Wellness & Recreation</h1>
            <p className="text-xl mb-8">Rejuvenate your body and mind in our luxurious facilities</p>
            <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white">Explore Our Amenities</Button>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Wellness Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {amenities.map((amenity, index) => (
                <AmenityCard key={index} amenity={amenity} />
              ))}
            </div>
          </div>
        </section>

        {/* Wellness Packages Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Wellness Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wellnessPackages.map((package_, index) => (
                <Card key={index} className={`${package_.color} border-none overflow-hidden`}>
                  <AutoScrollImage images={package_.images} interval={6000} />
                  <CardHeader>
                    <CardTitle className="text-2xl">{package_.name}</CardTitle>
                    <CardDescription>{package_.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[#bf840d]">{package_.price}</p>
                    <p className="mt-4">Experience a transformative journey with our curated wellness package.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#bf840d] hover:bg-[#8B5E04] text-white">Book Package</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function BookingDialog({ amenity }: { amenity: string }) {
  const [date, setDate] = useState<Date>()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#bf840d] hover:bg-[#8B5E04] text-white">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {amenity}</DialogTitle>
          <DialogDescription>Make a reservation for your chosen wellness amenity.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input id="time" type="time" className="col-span-3" />
          </div>
        </div>
        <Button className="w-full bg-[#bf840d] hover:bg-[#8B5E04] text-white">Confirm Booking</Button>
      </DialogContent>
    </Dialog>
  )
}
