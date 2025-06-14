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
      
      const response = await api.get('/bookings/my')
      
      if (response.status === 200) {
        setBookings(response.data)
      } else {
        setError('Failed to fetch bookings')
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err)
      setError(err.response?.data?.message || 'Failed to fetch bookings')
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

     
    
          
          <div className="flex-1 space-y-4 p-4 md:p-8">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-6">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={fetchBookings} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
                  <p className="text-gray-600">Welcome back, {user?.name}! Here are your booking details.</p>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                      <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                      <Button onClick={() => router.push('/rooms')}>
                        Browse Rooms
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bookings.map((bookingData) => (
                      <Card key={bookingData.booking._id} className="overflow-hidden">
                        <CardHeader className="bg-white border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-semibold text-gray-900">
                                {bookingData.room.room_title}
                              </CardTitle>
                              <p className="text-sm text-gray-500 mt-1">
                                Booking #{bookingData.booking.bookingId}
                              </p>
                              <p className="text-sm text-gray-500">
                                Booked on {formatDate(bookingData.booking.createdAt)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(bookingData.booking.paymentStatus)}>
                              {bookingData.booking.paymentStatus.charAt(0).toUpperCase() + 
                               bookingData.booking.paymentStatus.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Booking Details */}
                            <div className="space-y-4">
                              <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                              
                              <div className="flex items-center space-x-3">
                                <CalendarDays className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Check-in</p>
                                  <p className="text-sm text-gray-600">
                                    {formatDate(bookingData.booking.checkInDate)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <Users className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Guests</p>
                                  <p className="text-sm text-gray-600">
                                    {bookingData.booking.noOfGuests.adults} Adult
                                    {bookingData.booking.noOfGuests.adults > 1 ? 's' : ''}
                                    {bookingData.booking.noOfGuests.children > 0 && 
                                      `, ${bookingData.booking.noOfGuests.children} Child
                                      ${bookingData.booking.noOfGuests.children > 1 ? 'ren' : ''}`}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Room Price</p>
                                  <p className="text-sm text-gray-600">
                                    ₹{bookingData.room.pricePerNight.toLocaleString('en-IN')} per night
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Total Price */}
                            <div className="mt-6 pt-6 border-t">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <CreditCard className="h-5 w-5 text-gray-400" />
                                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">
                                  {formatPrice(bookingData.booking.totalPrice)}
                                </span>
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
  
 
        <Footer></Footer>
       </div>


  )
}