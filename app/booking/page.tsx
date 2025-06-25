"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Check, CreditCard, Calendar, Users, Info, Tag, ArrowRight, ArrowLeft, CheckCircle2, Printer, Share2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { api, useAuth } from '@/utils/auth'
import axios from "axios"

// Sample coupon codes
const VALID_COUPONS = [
  { code: "FIRSTBUY", discount: 10, description: "10% off for first-time customers" },
  { code: "SUMMER25", discount: 25, description: "25% off summer special" },
  { code: "WEEKEND15", discount: 15, description: "15% off weekend bookings" },
]

interface Room {
  _id: string
  roomImage: Array<{ url: string; name: string; ext: string; _id: string }>
  room_title: string
  desc: string
  pricePerNight: number
  max_person: number
  max_children: number
  totalRooms: number
  roomSize: number
  bedType: string
  amenities: string[]
  additionalDetails: string[]
  status: string
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  // const { checkAuth } = useAuth();
  const [room, setRoom] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get room ID from URL params
  const roomId = searchParams.get("roomId")
  console.log("Room ID:", roomId)

  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState(2)
  const [noOfRooms, setNoOfRoom] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("pay-later")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<(typeof VALID_COUPONS)[0] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [saveInfo, setSaveInfo] = useState(false)
  const [expressCheckout, setExpressCheckout] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState("")

  const [adults, setAdults] = useState<string>("1")
  const [children, setChildren] = useState<string>("0")

  // Calculate nights
  const nights = calculateNights(checkInDate, checkOutDate)

  // Print receipt function
  const handlePrintReceipt = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Booking Receipt - ${bookingId}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .booking-details { margin-bottom: 20px; }
          .section { margin-bottom: 15px; }
          .label { font-weight: bold; color: #92400e; }
          .value { margin-left: 10px; }
          .price-section { border-top: 2px solid #92400e; padding-top: 15px; margin-top: 20px; }
          .total { font-size: 18px; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Hotel Booking Receipt</h1>
          <h2>Booking Confirmed!</h2>
        </div>
        
        <div class="booking-details">
          <div class="section">
            <span class="label">Booking ID:</span>
            <span class="value">${bookingId}</span>
          </div>
          
          <div class="section">
            <span class="label">Room:</span>
            <span class="value">${room.room_title}</span>
          </div>
          
          <div class="section">
            <span class="label">Guest Name:</span>
            <span class="value">${name}</span>
          </div>
          
          <div class="section">
            <span class="label">Email:</span>
            <span class="value">${email}</span>
          </div>
          
          <div class="section">
            <span class="label">Phone:</span>
            <span class="value">${phone}</span>
          </div>
          
          <div class="section">
            <span class="label">Check-in Date:</span>
            <span class="value">${new Date(checkInDate).toLocaleDateString()}</span>
          </div>
          
          <div class="section">
            <span class="label">Check-out Date:</span>
            <span class="value">${new Date(checkOutDate).toLocaleDateString()}</span>
          </div>
          
          <div class="section">
            <span class="label">Duration:</span>
            <span class="value">${nights} ${nights === 1 ? 'night' : 'nights'}</span>
          </div>
          
          <div class="section">
            <span class="label">Guests:</span>
            <span class="value">${adults} ${Number(adults) === 1 ? 'Adult' : 'Adults'}${children !== "0" ? `, ${children} ${Number(children) === 1 ? 'Child' : 'Children'}` : ''}</span>
          </div>
          
          <div class="section">
            <span class="label">Rooms:</span>
            <span class="value">${noOfRooms} ${Number(noOfRooms) === 1 ? 'Room' : 'Rooms'}</span>
          </div>
          
          <div class="section">
            <span class="label">Payment Status:</span>
            <span class="value">${paymentMethod === 'pay-later' ? 'Pay at Hotel' : 'Paid'}</span>
          </div>
        </div>
        
        <div class="price-section">
          <div class="section">
            <span class="label">Room Rate (${nights} nights):</span>
            <span class="value">₹${basePrice.toLocaleString('en-IN')}</span>
          </div>
          
          <div class="section">
            <span class="label">Taxes & Fees (${gstRate * 100}%):</span>
            <span class="value">₹${taxesAndFees.toLocaleString('en-IN')}</span>
          </div>
          
          ${appliedCoupon ? `
          <div class="section">
            <span class="label">Discount (${appliedCoupon.discount}%):</span>
            <span class="value">-₹${discountAmount.toLocaleString('en-IN')}</span>
          </div>
          ` : ''}
          
          <div class="section total">
            <span class="label">Total Amount:</span>
            <span class="value">₹${totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing our hotel!</p>
          <p>For any queries, please contact us with your booking ID.</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  // WhatsApp share function
  const handleWhatsAppShare = () => {
    const message = `🏨 *Hotel Booking Confirmed!* 🎉

📋 *Booking Details:*
• Booking ID: ${bookingId}
• Room: ${room.room_title}
• Guest: ${name}
• Check-in: ${new Date(checkInDate).toLocaleDateString()}
• Check-out: ${new Date(checkOutDate).toLocaleDateString()}
• Duration: ${nights} ${nights === 1 ? 'night' : 'nights'}
• Guests: ${adults} ${Number(adults) === 1 ? 'Adult' : 'Adults'}${children !== "0" ? `, ${children} ${Number(children) === 1 ? 'Child' : 'Children'}` : ''}
• Rooms: ${noOfRooms} ${Number(noOfRooms) === 1 ? 'Room' : 'Rooms'}

💰 *Total Amount: ₹${totalPrice.toLocaleString('en-IN')}*
💳 *Payment Status: ${paymentMethod === 'pay-later' ? 'Pay at Hotel' : 'Paid'}*

Thank you for your booking! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Calculate prices
  const basePrice = (room?.pricePerNight || 0) * nights * Number(noOfRooms)
  // Apply different GST rates based on base price
  const gstRate = basePrice < 7000 ? 0.12 : 0.18
  const taxesAndFees = basePrice * gstRate
  const discountAmount = appliedCoupon ? (basePrice * appliedCoupon.discount) / 100 : 0
  const totalPrice = basePrice + taxesAndFees - discountAmount




  useEffect(() => {
  const userData = localStorage.getItem('hpc-User')
  if (userData) {
    const user = JSON.parse(userData)
    setName(user.name || '')
    setEmail(user.email || '')
    setPhone(user.phone || '')
  }
}, [])

  function calculateNights(checkIn: string, checkOut: string): number {
    if (!checkIn || !checkOut) return 1

    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays || 1
  }

  const getTodayString = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDateString = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 6) // Allow bookings up to 6 months in advance
    return maxDate.toISOString().split('T')[0]
  }

  const handleApplyCoupon = () => {
    const foundCoupon = VALID_COUPONS.find((coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase())

    if (foundCoupon) {
      setAppliedCoupon(foundCoupon)
      toast({
        title: "Coupon Applied",
        description: `${foundCoupon.description} (${foundCoupon.discount}% off)`,
      })
    } else {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      })
    }
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      console.log(checkInDate, checkOutDate, adults, children, noOfRooms)
      if (!checkInDate || !checkOutDate) {
        toast({
          title: "Missing Information",
          description: "Please select check-in and check-out dates.",
          variant: "destructive",
        })
        return
      }
    } else if (currentStep === 2) {
      if (!name || !email || !phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleCompleteBooking()
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // const handleExpressCheckout = async () => {
  //   if (!roomId || !checkInDate || !checkOutDate || !name || !email || !phone) {
  //     toast({
  //       title: "Missing Information",
  //       description: "Please fill in all required fields before proceeding.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   setIsProcessing(true)
  //   try {
  //     const bookingData = {
  //       roomId,
  //       checkInDate: new Date(checkInDate),
  //       checkOutDate: new Date(checkOutDate),
  //       noOfGuests: {
  //         adults: Number(adults),
  //         children: Number(children)
  //       },
  //       noOfRooms: Number(noOfRooms),
  //       fullName: name,
  //       email,
  //       phone,
  //       specialRequest: specialRequests,
  //       totalPrice: totalPrice,
  //       paymentStatus: 'confirmed'
  //     }

  //     const response = await fetch('http://localhost:8000/api/v1/bookings', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         "authorization": `Bearer ${localStorage.getItem("hpcToken")}`
  //       },
  //       body: JSON.stringify(bookingData)
  //     })

  //     const result = await response.json()
      
  //     if (result?.bookingId) {
  //       setBookingId(result.bookingId || '')
  //       setBookingComplete(true)
  //       toast({
  //         title: "Booking Confirmed!",
  //         description: "Your express checkout was successful. Check your email for booking details.",
  //       })
  //     } else {
  //       throw new Error(result.message || 'Failed to create booking')
  //     }
  //   } catch (error) {
  //     console.error('Express checkout error:', error)
  //     toast({
  //       title: "Booking Failed",
  //       description: error instanceof Error ? error.message : "Failed to complete booking. Please try again.",
  //       variant: "destructive",
  //     })
  //   } finally {

  const handleCompleteBooking = async () => {
    if (!roomId || !checkInDate || !checkOutDate || !name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const bookingData = {
        roomId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        noOfGuests: {
          adults: Number(adults),
          children: Number(children)
        },
        noOfRooms: Number(noOfRooms),
        fullName: name,
        email,
        phone,
        specialRequest: specialRequests,
        totalPrice: totalPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'pay-later' ? 'pending' : 'pending',
        isGuest: !localStorage.getItem('hpc-User'),
        token: localStorage.getItem("hpc-Token") || ''
      }

      const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, bookingData,{
        headers:{
          "Content-Type": "application/json",

          "authorization": `Bearer ${localStorage.getItem("hpc-Token") || ''}`
        }
      });
 


      if (response.data) {
        setBookingId(response.data.booking._id)
        if (paymentMethod === 'ccavenue') {
          if (response.data.payment && response.data.payment.url) {
            sessionStorage.setItem('pendingBookingId', response.data.booking.bookingId);

            const { url, parameters } = response.data.payment;

            const form = document.createElement("form");
            form.method = "POST";
            form.action = url;
            form.style.display = "none";

            Object.keys(parameters).forEach((key) => {
              const input = document.createElement("input");
              input.name = key;
              input.value = parameters[key];
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

            return;
          } else {
            toast({
              title: "Payment Error",
              description: "Could not initiate payment. Please try again.",
              variant: "destructive",
            });
            return;
          }
        } else {
          setBookingComplete(true)
          toast({
            title: "Booking Confirmed!",
            description: "Your booking has been successfully created. Please pay at the hotel.",
          })
        }
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error: any) {
      console.error('Booking error:', error)
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "Failed to complete booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Listen for payment cancel/success on mount
useEffect(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentStatus = urlParams.get('payment')
    const bookingIdParam = urlParams.get('bookingId')
    if (paymentStatus === 'cancel' && bookingIdParam) {
      // Stay on page, show toast, do not redirect
      toast({
        title: 'Payment Cancelled',
        description: 'Your payment was cancelled. You can try again or choose another payment method.',
        variant: 'destructive',
      })
      sessionStorage.removeItem('pendingBookingId')
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }
}, [toast])

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) {
        toast({
          title: "Error",
          description: "Room ID is missing",
          variant: "destructive",
        })
        return
      }

      try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`);

        console.log(response)
        if (response.status==200) {
          setRoom(response.data)
        } else {
          throw new Error(response.data.message || "Failed to fetch room details")
        }
      } catch (error: any) {
        console.error("Error fetching room details:", error)
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to load room details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoomDetails()
  }, [roomId, toast])





  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show error if room not found
  if (!room) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-serif text-amber-900">Room not found</h1>
            <Button
              className="mt-4 bg-amber-600 hover:bg-amber-700"
              onClick={() => (window.location.href = "/rooms")}
            >
              Back to Rooms
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-serif text-amber-900 mb-4">Booking Confirmed!</h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for your booking. A confirmation has been sent to your email.
              </p>

              {/* Room Image and Basic Details */}
              <div className="bg-amber-50/50 p-6 rounded-lg mb-6">
                <div className="flex gap-6 mb-6">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={room.roomImage[0]?.url || "/placeholder.svg"}
                      alt={room.room_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl font-medium text-amber-900">{room.room_title}</h3>
                    {/* <p className="text-sm text-gray-600 mt-1">{room.desc}</p> */}
                    <div className="flex gap-4 mt-2 text-sm text-amber-700">
                      {/* <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Max {room.max_person} Adults, {room.max_children} Children
                      </span> */}
                      <span className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                           Payment Status:
                        {paymentMethod === 'pay-later' ? 'Pay at Hotel' : 'Paid'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detailed Booking Information */}
                <div className="grid grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Booking Details</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <p className="font-medium">{bookingId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-in & Check-out</p>
                        <p className="font-medium">
                          {new Date(checkInDate).toLocaleDateString()} - {new Date(checkOutDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-amber-600">
                          {nights} {nights === 1 ? 'night' : 'nights'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Room Configuration</p>
                        <p className="font-medium">
                          {noOfRooms} {Number(noOfRooms) === 1 ? 'Room' : 'Rooms'} • {room.roomSize} sq ft
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Guest Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Guest Name</p>
                        <p className="font-medium">{name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact Details</p>
                        <p className="font-medium">{email}</p>
                        <p className="font-medium">{phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Number of Guests</p>
                        <p className="font-medium">
                          {adults} {Number(adults) === 1 ? 'Adult' : 'Adults'}{children !== "0" && `, ${children} ${Number(children) === 1 ? 'Child' : 'Children'}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 border-t border-amber-100 pt-6">
                  <h4 className="font-medium text-amber-900 mb-3 text-left">Price Details</h4>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Rate ({nights} nights)</span>
                      <span>₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees ({gstRate * 100}%)</span>
                      <span>₹{taxesAndFees.toLocaleString('en-IN')}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon.discount}%)</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium text-lg pt-2 border-t">
                      <span>Total Amount</span>
                      <span className="text-amber-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
              <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => (window.location.href = "/")}
              >
              Return to Home
              </Button>
              
              {localStorage.getItem('hpc-User') && (
              <Button
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
              onClick={() => (window.location.href = "/my-bookings")}
              >
              View My Bookings
              </Button>
              )}
              
              <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 flex items-center gap-2"
              onClick={handlePrintReceipt}
              >
              <Printer className="w-4 h-4" />
              Print Receipt
              </Button>
              
              <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
              onClick={handleWhatsAppShare}
              >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
              </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-serif text-amber-900 mb-8 text-center">Complete Your Booking</h1>

          {/* Express Checkout Option
          {!expressCheckout && (
            <div className="bg-amber-50 p-4 rounded-lg mb-8 flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-amber-600 mr-2" />
                <span className="font-medium">Express Checkout</span>
                <span className="ml-2 text-sm text-gray-600">Complete your booking in one click</span>
              </div>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={handleExpressCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Book Now"}
              </Button>
            </div>
          )} */}

          {/* Booking Steps */}
          <div className="flex justify-between mb-8">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-amber-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-amber-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="text-sm mt-1">Dates</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className={`h-1 w-full ${currentStep >= 2 ? "bg-amber-600" : "bg-gray-200"}`}></div>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-amber-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-amber-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="text-sm mt-1">Details</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className={`h-1 w-full ${currentStep >= 3 ? "bg-amber-600" : "bg-gray-200"}`}></div>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-amber-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-amber-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="text-sm mt-1">Payment</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  {/* Step 1: Dates */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-medium flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-amber-600" />
                        Booking Dates
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="check-in">Check-in Date * {checkInDate}</Label>
                          <Input
                            id="check-in"
                            type="date"
                                 placeholder="DD/MM/YYYY"
                            value={checkInDate}
                            onChange={(e) => {
                              setCheckInDate(e.target.value)
                              if (checkOutDate && e.target.value > checkOutDate) {
                                setCheckOutDate(e.target.value)
                              }
                            }}
                            min={getTodayString()}
                            max={getMaxDateString()}
                            required
                            className="mt-1"
                       
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => {
                              if (!e.target.value) e.target.type = 'text'
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="check-out">Check-out Date *</Label>
                          <Input
                            id="check-out"
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate || getTodayString()}
                            max={getMaxDateString()}
                            required
                            className="mt-1"
                            placeholder="DD/MM/YYYY"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => {
                              if (!e.target.value) e.target.type = 'text'
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests *</Label>
                        <div className="grid grid-cols-2 gap-4 mt-1">
                          <div>
                            <select
                              id="adults"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={adults}
                              onChange={(e) => setAdults(e.target.value)}
                            >
                              <option value="1">1 Adult</option>
                              <option value="2">2 Adults</option>
                              <option value="3">3 Adults</option>
                              <option value="4">4 Adults</option>
                              <option value="5">5 Adults</option>
                            </select>
                          </div>
                          <div>
                            <select 
                              id="children" 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={children}
                              onChange={(e) => setChildren(e.target.value)}
                            >
                              <option value="0">0 Children</option>
                              <option value="1">1 Child</option>
                              <option value="2">2 Children</option>
                              <option value="3">3 Children</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of rooms *</Label>
                        <div className="grid grid-cols-2 gap-4 mt-1">
                          <div>
                            <select
                              id="adults"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={noOfRooms}
                              onChange={(e) => setNoOfRoom(e.target.value)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Guest Information */}
              {currentStep === 2 && (
  <div className="space-y-6">
    <h2 className="text-xl font-medium flex items-center gap-2">
      <Users className="h-5 w-5 text-amber-600" />
   {!localStorage.getItem('hpc-User')?" Guest Information":" Your Information"}  
    </h2>
    <div>
      <Label htmlFor="name">Full Name *</Label>
      <Input
        id="name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mt-1"
        disabled={!!localStorage.getItem('userData')}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
          disabled={!!localStorage.getItem('userData')}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          placeholder="Your contact number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1"
          disabled={!!localStorage.getItem('userData')}
        />
      </div>
    </div>

    <div>
      <Label htmlFor="special-requests">Special Requests (Optional)</Label>
      <textarea
        id="special-requests"
        className="w-full min-h-[100px] p-2 border rounded-md mt-1"
        placeholder="Any special requests or preferences?"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
      ></textarea>
    </div>

    {!localStorage.getItem('hpc-User') && (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="save-info"
          checked={saveInfo}
          onCheckedChange={(checked) => setSaveInfo(!!checked)}
        />
        <label
          htmlFor="save-info"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Save my information for future bookings
        </label>
      </div>
    )}
  </div>
)}
                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-medium flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-amber-600" />
                        Payment Method
                      </h2>

                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
  <div className="flex items-center space-x-2 border p-4 rounded-md">
    <RadioGroupItem value="ccavenue" id="ccavenue" />
    <Label htmlFor="ccavenue" className="flex-1 flex items-center gap-2">
      {/* Use local logo instead of remote CCAvenue logo to avoid 404 */}
      <Image src="/cc_avenue.png" alt="CCAvenue" width={60} height={30} />
      CCAvenue
    </Label>
  </div>
  <div className="flex items-center space-x-2 border p-4 rounded-md">
    <RadioGroupItem value="pay-later" id="pay-later" />
    <Label htmlFor="pay-later" className="flex-1">
      Pay at Hotel
    </Label>
    <Info className="h-5 w-5 text-amber-600" />
  </div>
</RadioGroup>

                     

                      <div className="p-4 bg-amber-50 rounded-md">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Booking Policies</p>
                            <p className="text-sm text-gray-600">
                              By completing this booking, you agree to our terms and conditions, including the
                              cancellation policy.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                      <Button variant="outline" onClick={handlePreviousStep} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Button
                      className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
                      onClick={handleNextStep}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : currentStep < 3 ? (
                        <>
                          Next <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        "Complete Booking"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium mb-4">Booking Summary</h2>
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={room.roomImage[0]?.url || "/placeholder.svg"}
                        alt={room.room_title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{room.room_title}</h3>
                      <p className="text-sm text-gray-500">
                        {checkInDate ? new Date(checkInDate).toLocaleDateString() : "Check-in"} to{" "}
                        {checkOutDate ? new Date(checkOutDate).toLocaleDateString() : "Check-out"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {guests} Guests • {nights} {nights === 1 ? "Night" : "Nights"} • {noOfRooms}{" "}
                        {noOfRooms === "1" ? "Room" : "Rooms"}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        Room Rate ({nights} {nights === 1 ? "night" : "nights"})
                      </span>
                      <span>₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees ({gstRate * 100}%)</span>
                      <span>₹{taxesAndFees.toLocaleString('en-IN')}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon.discount}%)</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="coupon" className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      Apply Coupon
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="coupon"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleApplyCoupon} disabled={!couponCode}>
                        Apply
                      </Button>
                    </div>
                    {appliedCoupon && (
                      <div className="mt-2 text-sm flex items-center gap-1 text-green-600">
                        <Check className="h-4 w-4" />
                        {appliedCoupon.description}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Check className="h-4 w-4" />
                      <span>Free cancellation up to 48 hours before check-in</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600">
                      <Check className="h-4 w-4" />
                      <span>No payment needed today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
