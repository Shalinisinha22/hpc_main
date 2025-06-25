"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { api } from '@/utils/auth'
import { Booking } from '@/types/booking'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, Users, Phone, Mail, CreditCard, MapPin, User, Settings, Gift, History, Home, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { set } from 'date-fns'





export default function MyBookingsPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }
    fetchBookings()
  }, [isAuthenticated, router])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings/my`,{
       headers:{
          Authorization: `Bearer ${localStorage.getItem('hpc-Token')}`,
          "Content-Type": "application/json",
        }
      })
      
      if (response.status === 200) {
        setBookings(response.data)
      } else {
        setError('Failed to fetch bookings')
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err)
      
      // Check if it's a 404 with "No bookings found" message - this is not an error, just empty state
      if (err.response?.status === 404 && 
          err.response?.data?.error === "No bookings found for this user") {
        setBookings([]) // Set empty array for no bookings
      } else {
        // This is a real error
        setError(err.response?.data?.message || err.response?.data?.error || 'Failed to fetch bookings')
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif text-amber-900 mb-4">My Bookings</h1>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchBookings} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-amber-900 mb-4">My Bookings</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Welcome back, {user?.name}! Here are your booking details and reservation history.
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-12 max-w-lg mx-auto border border-amber-100">
                    <div className="bg-amber-100 rounded-full p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center shadow-inner">
                      <CalendarDays className="h-12 w-12 text-amber-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">No Bookings Yet</h3>
                    <p className="text-gray-600 mb-2 leading-relaxed text-lg">
                      Ready to start your next adventure? 
                    </p>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                      Discover our beautiful rooms and create unforgettable memories.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        onClick={() => router.push('/rooms')}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Explore Our Rooms
                      </Button>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <span className="text-amber-500">✨</span>
                        Special offers available for first-time guests
                        <span className="text-amber-500">✨</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {bookings.map((bookingData) => (
                    <Card key={bookingData.booking._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl md:text-2xl font-serif text-amber-900 mb-2">
                              {bookingData.room.room_title}
                            </CardTitle>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600 font-medium">
                                Booking #{bookingData.booking.bookingId}
                              </p>
                              <p className="text-sm text-gray-500">
                                Booked on {formatDate(bookingData.booking.createdAt)}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(bookingData.booking.paymentStatus)} px-4 py-2 text-sm font-medium`}>
                            {bookingData.booking.paymentStatus.charAt(0).toUpperCase() + 
                             bookingData.booking.paymentStatus.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6 md:p-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Booking Details */}
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <CalendarDays className="h-5 w-5 text-amber-600" />
                              Booking Details
                            </h3>
                            
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <CalendarDays className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 mb-1">Check-in Date</p>
                                  <p className="text-gray-700 font-medium">
                                    {formatDate(bookingData.booking.checkInDate)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <CalendarDays className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 mb-1">Check-out Date</p>
                                  <p className="text-gray-700 font-medium">
                                    {formatDate(bookingData.booking.checkOutDate)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <Users className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 mb-1">Guests</p>
                                  <p className="text-gray-700 font-medium">
                                    {bookingData.booking.noOfGuests.adults} Adult
                                    {bookingData.booking.noOfGuests.adults > 1 ? 's' : ''}
                                    {bookingData.booking.noOfGuests.children > 0 && 
                                      `, ${bookingData.booking.noOfGuests.children} Child
                                      ${bookingData.booking.noOfGuests.children > 1 ? 'ren' : ''}`}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <MapPin className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 mb-1">Room Rate</p>
                                  <p className="text-gray-700 font-medium">
                                    ₹{bookingData.room.pricePerNight.toLocaleString('en-IN')} per night
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Total Price Section */}
                          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <CreditCard className="h-5 w-5 text-amber-600" />
                              Payment Summary
                            </h3>
                            
                            <div className={`rounded-xl p-6 border ${
                              bookingData.booking.paymentStatus === 'pending' 
                                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100' 
                                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
                            }`}>
                              <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">
                                  {bookingData.booking.paymentStatus === 'pending' ? 'Total Amount Due' : 'Total Amount Paid'}
                                </p>
                                <p className={`text-3xl md:text-4xl font-bold mb-4 ${
                                  bookingData.booking.paymentStatus === 'pending' ? 'text-amber-600' : 'text-green-600'
                                }`}>
                                  {formatPrice(bookingData.booking.totalPrice)}
                                </p>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                                  bookingData.booking.paymentStatus === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${
                                    bookingData.booking.paymentStatus === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}></div>
                                  Payment {bookingData.booking.paymentStatus}
                                </div>
                                
                                {bookingData.booking.paymentStatus === 'pending' && (
                                  <div className="mt-4 p-3 bg-amber-100 rounded-lg border border-amber-200">
                                    <p className="text-sm font-medium text-amber-800 mb-1">Payment Method</p>
                                    <p className="text-amber-700 font-semibold">Pay at Hotel</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-6 space-y-3">
                              <Button 
                                variant="outline" 
                                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                                onClick={() => window.print()}
                              >
                                Download Receipt
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => router.push('/contact')}
                              >
                                Contact Support
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>


  )
}