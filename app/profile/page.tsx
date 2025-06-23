"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, CreditCard, Gift, History, Home, Settings, Star, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const [preferences, setPreferences] = useState({
    roomPreference: user?.preferences?.roomPreference || "High floor",
    dietaryRestrictions: user?.preferences?.dietaryRestrictions || "None",
    specialRequests: user?.preferences?.specialRequests || "",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form handlers
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    })
  }

  // Form submissions
  const savePersonalInfo = async () => {
    try {
      const token = localStorage.getItem("hpc-Token")
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          name: personalInfo.name,
          email: personalInfo.email,
          phone: personalInfo.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      toast({
        title: "Profile Updated",
        description: "Your personal information has been updated successfully. You will be logged out.",
      })
      localStorage.clear()

    } catch (error: any) {
      toast({
        title: "Profile Update Error",
        description: error.response?.data?.message || error.message || "Failed to update profile.",
        variant: "destructive",
      })
    }
  }

  const savePreferences = () => {
    // In a real app, this would be an API call
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been updated successfully.",
    })
  }

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    try {
      const token = localStorage.getItem("hpc-Token")
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/change-password`,
        {
          currentPassword: passwords.current,
          newPassword: passwords.new,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully. You will be logged out.",
      })
      localStorage.clear()
      // router.push("/login")
      setPasswords({ current: "", new: "", confirm: "" })
    } catch (error: any) {
      toast({
        title: "Password Error",
        description: error.response?.data?.message || error.message || "Failed to change password.",
        variant: "destructive",
      })
    }
  }

  const bookStay = () => {
    toast({
      title: "Booking Started",
      description: "Redirecting to booking page...",
    })
    // In a real app, this would redirect to the booking page
  }

  const modifyStay = (stayId: string) => {
    toast({
      title: "Modify Stay",
      description: `Modifying stay ${stayId}...`,
    })
    // In a real app, this would open a modification form
  }

  const cancelStay = (stayId: string) => {
    toast({
      title: "Cancel Stay",
      description: `Cancelling stay ${stayId}...`,
    })
    // In a real app, this would show a confirmation dialog
  }

  const leaveReview = (stayId: string) => {
    toast({
      title: "Leave Review",
      description: `Writing review for stay ${stayId}...`,
    })
    // In a real app, this would open a review form
  }

  const bookAgain = (stayId: string) => {
    toast({
      title: "Book Again",
      description: `Booking similar to stay ${stayId}...`,
    })
    // In a real app, this would pre-fill the booking form
  }

  const redeemPoints = () => {
    toast({
      title: "Redeem Points",
      description: "Opening points redemption options...",
    })
    // In a real app, this would show redemption options
  }

  // Fetch bookings
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }
    fetchBookings()
  }, [isAuthenticated, router])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem("hpc-Token")
      if (!token) {
        setError("You are not logged in. Please log in again.")
        setBookings([])
        setLoading(false)
        return
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings/my`,{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })

      console.log(response.data[0], "profile bookings")
      if (response.status === 200) {
        setBookings(response.data)
        if (response.data[0]) {
          console.log(response.data[0].booking.checkInDate, "profile")
        }
      } else {
        setError("Failed to fetch bookings")
      }
    } catch (err: any) {
      if (err.response?.status === 404 && err.response?.data?.error === "No bookings found for this user") {
        setBookings([])
      } else {
        setError(err.response?.data?.message || err.response?.data?.error || "Failed to fetch bookings")
      }
    } finally {
      setLoading(false)
    }
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-[#bf840d] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <Image src="https://i.pravatar.cc/300" alt={user.name} fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">{user.name}</h1>
                {/* <div className="flex flex-wrap gap-4 items-center">
                  <Badge className="bg-white text-[#bf840d] hover:bg-white/90">Member</Badge>
                  <p className="text-white/80">Member</p>
                  <p className="text-white/80">Member since {user.memberSince}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    <span>{user.points} Points</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="stays" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden md:inline">My Stays</span>
                </TabsTrigger>
                {/* <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className="hidden md:inline">Rewards</span>
                </TabsTrigger> */}
                {/* <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden md:inline">History</span>
                </TabsTrigger> */}
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-[#bf840d]" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                    {/* <CardFooter>
                      <Button variant="outline" className="w-full">
                        Edit Information
                      </Button>
                    </CardFooter> */}
                  </Card>

                  {/* Upcoming Stays */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-[#bf840d]" />
                        Upcoming Stays
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <p className="text-gray-500">Loading...</p>
                      ) : error ? (
                        <p className="text-red-500">{error}</p>
                      ) : bookings.filter(
                          stay => new Date(stay.booking.checkInDate).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)
                        ).length > 0 ? (
                        <div className="space-y-4">
                          {bookings
                            .filter(stay => new Date(stay.booking.checkInDate).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0))
                            .map((stay) => {
                              const checkIn = new Date(stay.booking.checkInDate)
                              const checkOut = new Date(stay.booking.checkOutDate)
                              const numDays = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
                              return (
                                <div key={stay.booking._id} className="border-b pb-4 last:border-0">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium text-[#bf840d] flex items-center gap-2">
                                        Booking ID: {stay.booking.bookingId}
                                      </p>
                                      <p className="font-semibold text-lg">{stay.room?.room_title || 'Room'}</p>
                                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#bf840d" strokeWidth="1.5"/><path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#bf840d" strokeWidth="1.5"/></svg>
                                          {stay.booking.noOfRooms || 1} Room{stay.booking.noOfRooms > 1 ? 's' : ''}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#bf840d" strokeWidth="1.5"/><path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" stroke="#bf840d" strokeWidth="1.5"/></svg>
                                          {stay.booking.noOfGuests?.adults || 1} Guest{stay.booking.noOfGuests?.adults > 1 ? 's' : ''}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-500 mt-1">
                                        {checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}
                                      </p>
                                    </div>
                                    {stay.booking.paymentStatus && (
                                      <Badge className={`capitalize px-3 py-1 text-xs font-semibold border-0 mt-1 ${stay.booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{stay.booking.paymentStatus}</Badge>
                                    )}
                                  </div>
                                  <div className="mt-3 text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1 font-medium items-center">
                                    <div><span className="text-gray-500 font-normal">Total Price:</span> ₹{stay.booking.totalPrice}</div>
                                    <span className="hidden md:inline-block text-gray-300">|</span>
                                    <div><span className="text-gray-500 font-normal">No. of Days:</span> {numDays}</div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      ) : (
                        <>
                        
                        </>
                     
                      )}
                    </CardContent>
                   
                  </Card>

                  {/* Preferences */}
                  {/* <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-[#bf840d]" />
                        Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Room Preference</p>
                          <p className="font-medium">{user?.preferences?.roomPreference}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Dietary Restrictions</p>
                          <p className="font-medium">{user?.preferences?.dietaryRestrictions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Special Requests</p>
                          <p className="font-medium">{user?.preferences?.specialRequests}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Update Preferences
                      </Button>
                    </CardFooter>
                  </Card> */}
                </div>
              </TabsContent>

              <TabsContent value="stays">
                <Card>
                  <CardHeader>
                    <CardTitle>My Stays</CardTitle>
                    <CardDescription>View and manage your upcoming and past stays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Upcoming Stays</h3>
                        {loading ? (
                          <p className="text-gray-500">Loading...</p>
                        ) : error ? (
                          <p className="text-red-500">{error}</p>
                        ) : bookings.filter(
                            stay => new Date(stay.booking.checkInDate).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)
                          ).length > 0 ? (
                          <div className="space-y-4">
                            {bookings
                              .filter(stay => new Date(stay.booking.checkInDate).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0))
                              .map((stay) => {
                                const checkIn = new Date(stay.booking.checkInDate)
                                const checkOut = new Date(stay.booking.checkOutDate)
                                const numDays = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
                                return (
                                  <div key={stay.booking._id} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <p className="font-medium text-[#bf840d]">Booking ID: {stay.booking.bookingId}</p>
                                        <p className="font-semibold text-lg">{stay.room?.room_title || 'Room'}</p>
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <Badge variant="outline">{stay.booking.noOfGuests?.adults || 1} Guests</Badge>
                                        {stay.booking.paymentStatus && (
                                          <Badge className={`capitalize px-3 py-1 text-xs font-semibold border-0 ${stay.booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{stay.booking.paymentStatus}</Badge>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      {checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}
                                    </p>
                                    <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1">
                                      <div><strong>Total Price:</strong> ₹{stay.booking.totalPrice}</div>
                                      <div><strong>No. of Rooms:</strong> {stay.booking.noOfRooms}</div>
                                      <div><strong>No. of Days:</strong> {numDays}</div>

                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        ) : (
                          <p className="text-gray-500">No upcoming stays</p>
                        )}
                      </div>

                      {/* Past Stays */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Past Stays</h3>
                        {loading ? (
                          <p className="text-gray-500">Loading...</p>
                        ) : error ? (
                          <p className="text-red-500">{error}</p>
                        ) : bookings.filter(
                            stay => new Date(stay.booking.checkOutDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)
                          ).length > 0 ? (
                          <div className="space-y-4">
                            {bookings
                              .filter(stay => new Date(stay.booking.checkOutDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0))
                              .map((stay) => {
                                const checkIn = new Date(stay.booking.checkInDate)
                                const checkOut = new Date(stay.booking.checkOutDate)
                                const numDays = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
                                return (
                                  <div key={stay.booking._id} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <p className="font-medium text-[#bf840d]">Booking ID: {stay.booking.bookingId}</p>
                                        <p className="font-semibold text-lg">{stay.room?.room_title || 'Room'}</p>
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <Badge variant="outline">{stay.booking.noOfGuests?.adults || 1} Guests</Badge>
                                        {stay.booking.paymentStatus && (
                                          <Badge className={`capitalize px-3 py-1 text-xs font-semibold border-0 ${stay.booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{stay.booking.paymentStatus}</Badge>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      {checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}
                                    </p>
                                    <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1">
 <div><strong>Total Price:</strong> ₹{stay.booking.totalPrice}</div>                                      <div><strong>No. of Rooms:</strong> {stay.booking.noOfRooms}</div>
                                      <div><strong>No. of Days:</strong> {numDays}</div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                      <Button variant="outline" size="sm" onClick={() => leaveReview(stay.booking._id)}>
                                        Leave Review
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => bookAgain(stay.booking._id)}>
                                        Book Again
                                      </Button>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        ) : (
                          <p className="text-gray-500">No past stays</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards">
                <Card>
                  <CardHeader>
                    <CardTitle>Rewards & Benefits</CardTitle>
                    <CardDescription>Your loyalty rewards and membership benefits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-amber-700 to-amber-500 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-xl font-bold">Member</h3>
                            <p className="text-white/80">Welcome to our loyalty program</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">—</p>
                            <p className="text-white/80">Points</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="bg-white text-amber-700 hover:bg-white/90" disabled>
                            Redeem Points
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Your Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CreditCard className="h-5 w-5 text-[#bf840d]" />
                              <h4 className="font-medium">Late Checkout</h4>
                            </div>
                            <p className="text-sm text-gray-500">Enjoy late checkout until 2 PM</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Gift className="h-5 w-5 text-[#bf840d]" />
                              <h4 className="font-medium">Welcome Gift</h4>
                            </div>
                            <p className="text-sm text-gray-500">Receive a welcome gift on arrival</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-5 w-5 text-[#bf840d]" />
                              <h4 className="font-medium">Room Upgrade</h4>
                            </div>
                            <p className="text-sm text-gray-500">Complimentary room upgrade when available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity History</CardTitle>
                    <CardDescription>Your recent activities and transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.filter(stay => new Date(stay.checkOutDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)).length > 0 ? (
                        bookings
                          .filter(stay => new Date(stay.checkOutDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0))
                          .map((stay, index) => (
                            <div key={stay._id || index} className="flex items-start gap-4 border-b pb-4 last:border-0">
                              <div className="bg-gray-100 p-2 rounded-full">
                                <CalendarDays className="h-5 w-5 text-[#bf840d]" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium">Stay at {stay.room?.room_title || 'Room'}</p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(stay.checkInDate).toLocaleDateString()} - {new Date(stay.checkOutDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {Math.floor(
                                    (new Date(stay.checkOutDate).getTime() - new Date(stay.checkInDate).getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  )}{" "}
                                  nights, {stay.noOfGuests?.adults || 1} guests
                                </p>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500">No activity history</p>
                      )}
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Gift className="h-5 w-5 text-[#bf840d]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Points Earned</p>
                            <p className="text-sm text-gray-500">January 15, 2024</p>
                          </div>
                          <p className="text-sm text-gray-500">Earned 500 points from your stay</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Star className="h-5 w-5 text-[#bf840d]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Membership Upgrade</p>
                            <p className="text-sm text-gray-500">January 1, 2024</p>
                          </div>
                          <p className="text-sm text-gray-500">Upgraded to Gold Membership</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={personalInfo.name}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={personalInfo.email}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={personalInfo.phone}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                        </div>
                        <Button className="mt-4 bg-[#bf840d] hover:bg-[#a06f0b] text-white" onClick={savePersonalInfo}>
                          Save Changes
                        </Button>
                      </div>

                      {/* <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room Preference</label>
                            <select
                              name="roomPreference"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={preferences.roomPreference}
                              onChange={handlePreferencesChange}
                            >
                              <option>High floor</option>
                              <option>Low floor</option>
                              <option>Near elevator</option>
                              <option>Away from elevator</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Restrictions</label>
                            <select
                              name="dietaryRestrictions"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={preferences.dietaryRestrictions}
                              onChange={handlePreferencesChange}
                            >
                              <option>None</option>
                              <option>Vegetarian</option>
                              <option>Vegan</option>
                              <option>Gluten-free</option>
                              <option>Dairy-free</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                            <textarea
                              name="specialRequests"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              rows={3}
                              value={preferences.specialRequests}
                              onChange={handlePreferencesChange}
                            ></textarea>
                          </div>
                        </div>
                        <Button className="mt-4 bg-[#bf840d] hover:bg-[#a06f0b] text-white" onClick={savePreferences}>
                          Save Preferences
                        </Button>
                      </div> */}

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Password & Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                              type="password"
                              name="current"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={passwords.current}
                              onChange={handlePasswordChange}
                            />
                          </div>
                          <div></div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                              type="password"
                              name="new"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={passwords.new}
                              onChange={handlePasswordChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                              type="password"
                              name="confirm"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={passwords.confirm}
                              onChange={handlePasswordChange}
                            />
                          </div>
                        </div>
                        <Button className="mt-4 bg-[#bf840d] hover:bg-[#a06f0b] text-white" onClick={changePassword}>
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
