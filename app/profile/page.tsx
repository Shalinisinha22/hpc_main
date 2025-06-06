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
    roomPreference: user?.preferences.roomPreference || "High floor",
    dietaryRestrictions: user?.preferences.dietaryRestrictions || "None",
    specialRequests: user?.preferences.specialRequests || "",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

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
  const savePersonalInfo = () => {
    // In a real app, this would be an API call
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    })
  }

  const savePreferences = () => {
    // In a real app, this would be an API call
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been updated successfully.",
    })
  }

  const changePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwords.current !== "password123") {
      toast({
        title: "Password Error",
        description: "Current password is incorrect.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    })

    setPasswords({
      current: "",
      new: "",
      confirm: "",
    })
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
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge className="bg-white text-[#bf840d] hover:bg-white/90">{user.membershipLevel} Member</Badge>
                  <p className="text-white/80">Member</p>
                  <p className="text-white/80">Member since {user.memberSince}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    <span>{user.points} Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="stays" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden md:inline">My Stays</span>
                </TabsTrigger>
                <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className="hidden md:inline">Rewards</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden md:inline">History</span>
                </TabsTrigger>
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
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Edit Information
                      </Button>
                    </CardFooter>
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
                      {user.upcomingStays.length > 0 ? (
                        <div className="space-y-4">
                          {user.upcomingStays.map((stay) => (
                            <div key={stay.id} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between">
                                <p className="font-medium">{stay.roomType}</p>
                                <Badge variant="outline">{stay.guests} Guests</Badge>
                              </div>
                              <p className="text-sm text-gray-500">
                                {new Date(stay.checkIn).toLocaleDateString()} -{" "}
                                {new Date(stay.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No upcoming stays</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Book a Stay
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Preferences */}
                  <Card>
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
                          <p className="font-medium">{user.preferences.roomPreference}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Dietary Restrictions</p>
                          <p className="font-medium">{user.preferences.dietaryRestrictions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Special Requests</p>
                          <p className="font-medium">{user.preferences.specialRequests}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Update Preferences
                      </Button>
                    </CardFooter>
                  </Card>
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
                        {user.upcomingStays.length > 0 ? (
                          <div className="space-y-4">
                            {user.upcomingStays.map((stay) => (
                              <div key={stay.id} className="border rounded-lg p-4">
                                <div className="flex justify-between">
                                  <p className="font-medium">{stay.roomType}</p>
                                  <Badge variant="outline">{stay.guests} Guests</Badge>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {new Date(stay.checkIn).toLocaleDateString()} -{" "}
                                  {new Date(stay.checkOut).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2 mt-4">
                                  <Button variant="outline" size="sm" onClick={() => modifyStay(stay.id)}>
                                    Modify
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500 hover:bg-red-50"
                                    onClick={() => cancelStay(stay.id)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No upcoming stays</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Past Stays</h3>
                        {user.pastStays.length > 0 ? (
                          <div className="space-y-4">
                            {user.pastStays.map((stay) => (
                              <div key={stay.id} className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex justify-between">
                                  <p className="font-medium">{stay.roomType}</p>
                                  <Badge variant="outline">{stay.guests} Guests</Badge>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {new Date(stay.checkIn).toLocaleDateString()} -{" "}
                                  {new Date(stay.checkOut).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2 mt-4">
                                  <Button variant="outline" size="sm" onClick={() => leaveReview(stay.id)}>
                                    Leave Review
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => bookAgain(stay.id)}>
                                    Book Again
                                  </Button>
                                </div>
                              </div>
                            ))}
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
                            <h3 className="text-xl font-bold">{user.membershipLevel} Membership</h3>
                            <p className="text-white/80">Member since {user.memberSince}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{user.points}</p>
                            <p className="text-white/80">Points</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="bg-white text-amber-700 hover:bg-white/90" onClick={redeemPoints}>
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
                      {user.pastStays.map((stay, index) => (
                        <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <CalendarDays className="h-5 w-5 text-[#bf840d]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">Stay at {stay.roomType}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(stay.checkIn).toLocaleDateString()} -{" "}
                                {new Date(stay.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              {Math.floor(
                                (new Date(stay.checkOut).getTime() - new Date(stay.checkIn).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{" "}
                              nights, {stay.guests} guests
                            </p>
                          </div>
                        </div>
                      ))}
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

                      <div className="border-t pt-6">
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
                      </div>

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
