"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { authService } from "@/services/auth-service"

export default function Header() {
  const { toast } = useToast()
  const router = useRouter()
  const { user, isAuthenticated, login, logout } = useAuth()

  const announcements = [
    "Get 10% Off on your First Purchase use coupon code 'FIRSTBUY'",
    "Free Breakfast with Every Stay",
    "Book Direct for Best Rates Guaranteed",
  ]
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false)
  const bookDropdownRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Registration form state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  const bookingOptions = [
    { title: "Rooms & Suites", href: "/rooms", description: "Luxurious accommodations for your stay" },
    { title: "Dining", href: "/dining", description: "Exquisite culinary experiences" },
    { title: "Wellness", href: "/wellness", description: "Rejuvenating spa and fitness services" },
    { title: "Events", href: "/events", description: "Memorable gatherings and celebrations" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bookDropdownRef.current && !bookDropdownRef.current.contains(event.target as Node)) {
        setIsBookDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => (prevIndex + 1) % announcements.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [announcements.length])

  const navigateAnnouncement = (direction: "prev" | "next") => {
    setCurrentAnnouncementIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % announcements.length
      }
      return prev === 0 ? announcements.length - 1 : prev - 1
    })
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const success = await login(loginEmail, loginPassword)
      if (success) {
        setIsLoginDialogOpen(false)
        setIsPopoverOpen(false)
        toast({
          title: "Login successful",
          description: "Welcome back to Hotel Patliputra Continental!",
        })
        router.push("/profile")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try ID: user123, Password: password123",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateRegistrationForm = () => {
    if (!registerName || !registerEmail || !registerPhone || !registerPassword || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return false
    }

    if (!registerEmail.includes("@")) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }

    if (!/^\d{10}$/.test(registerPhone)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      })
      return false
    }

    if (registerPassword.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return false
    }

    if (registerPassword !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleRegister = async () => {
    if (!validateRegistrationForm()) {
      return
    }

    setIsRegistering(true)
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          phone: parseInt(registerPhone),
          password: registerPassword,
          role: "user",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully!",
        })

        // Clear registration form
        setRegisterName("")
        setRegisterEmail("")
        setRegisterPhone("")
        setRegisterPassword("")
        setConfirmPassword("")

        // Close registration dialog and open login dialog
        const dialogElement = document.querySelector('[role="dialog"]')
        if (dialogElement) {
          const closeButton = dialogElement.querySelector('button[aria-label="Close"]')
          if (closeButton instanceof HTMLButtonElement) {
            closeButton.click()
          }
        }
        setIsLoginDialogOpen(true)
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <>
      <div className="bg-black text-white py-2 px-4 flex items-center justify-center relative announcement-banner">
        <button
          onClick={() => navigateAnnouncement("prev")}
          className="absolute left-2 sm:left-4 text-white/80 hover:text-white"
          aria-label="Previous announcement"
        >
          ‹
        </button>
        <p className="text-xs sm:text-sm text-center px-8 sm:px-12" key={currentAnnouncementIndex}>
          {announcements[currentAnnouncementIndex]}
        </p>
        <button
          onClick={() => navigateAnnouncement("next")}
          className="absolute right-8 sm:right-12 text-white/80 hover:text-white"
          aria-label="Next announcement"
        >
          ›
        </button>
        <button
          onClick={() => document.querySelector(".announcement-banner")?.remove()}
          className="absolute right-2 sm:right-4 text-white/80 hover:text-white"
          aria-label="Close announcement"
        >
          ×
        </button>
      </div>
      <header
        className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${isScrolled ? "bg-white" : ""}`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hpc1-3yc9VOEom6Jd5lIMdYHerWUqjOgFlm.png"
              alt="Hotel Patliputra Continental"
              width={180}
              height={60}
              className="h-16 w-auto bg-white p-2 rounded-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#bf840d] hover:text-[#8B5E04] font-medium transition">
              Home
            </Link>
            <Link
              href="/rooms"
              className="text-white font-medium transition bg-[#bf840d] hover:bg-black px-3 py-1 rounded-full border border-[#bf840d]"
            >
              Rooms & Suites
            </Link>
            <Link href="/dining" className="text-[#bf840d] hover:text-[#8B5E04] font-medium transition">
              Dining
            </Link>
            <Link href="/offers" className="text-[#bf840d] hover:text-[#8B5E04] font-medium transition">
              Offers
            </Link>
            <Link href="/wellness" className="text-[#bf840d] hover:text-[#8B5E04] font-medium transition">
              Wellness
            </Link>
            <Link href="/events" className="text-[#bf840d] hover:text-[#8B5E04] font-medium transition">
              Events
            </Link>
            <Link href="/gallery" className="text-[#bf840d] hover:text-[#8B5E04] font-medium transition">
              Gallery
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white flex items-center gap-2"
                  >
                    <User size={16} />
                    {user?.name.split(" ")[0]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold mb-2">My Account</h3>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      My Bookings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Preferences
                    </Button>
                    <Button
                      className="w-full bg-zinc-900 hover:bg-zinc-700 mt-2"
                      onClick={() => {
                        logout()
                        toast({
                          title: "Logged out",
                          description: "You have been successfully logged out",
                        })
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white"
                    onMouseEnter={() => setIsPopoverOpen(true)}
                  >
                    Sign In
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-3" onMouseLeave={() => setIsPopoverOpen(false)}>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold mb-2">Sign-In/Join</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Join
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create an Account</DialogTitle>
                          <DialogDescription>
                            Join our loyalty program to enjoy exclusive benefits and rewards.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="register-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="register-name"
                              className="col-span-3"
                              value={registerName}
                              onChange={(e) => setRegisterName(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="register-email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="register-email"
                              type="email"
                              className="col-span-3"
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="register-phone" className="text-right">
                              Phone
                            </Label>
                            <Input
                              id="register-phone"
                              type="tel"
                          
                              className="col-span-3"
                              value={registerPhone}
                              onChange={(e) => setRegisterPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="register-password" className="text-right">
                              Password
                            </Label>
                            <Input
                              id="register-password"
                              type="password"
                              className="col-span-3"
                              value={registerPassword}
                              onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="register-confirm-password" className="text-right">
                              Confirm
                            </Label>
                            <Input
                              id="register-confirm-password"
                              type="password"
                              className="col-span-3"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-[#bf840d] hover:bg-[#a06f0b] text-white"
                            onClick={handleRegister}
                            disabled={isRegistering}
                          >
                            {isRegistering ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating Account...
                              </div>
                            ) : (
                              "Create Account"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-zinc-900 hover:bg-zinc-700">Sign In</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Sign In</DialogTitle>
                          <DialogDescription>
                            Enter your credentials to access your account.
                            {/* <div className="mt-2 p-2 bg-amber-50 text-amber-800 rounded-md text-xs">
                              Demo credentials:
                              <br />
                              ID: {DEMO_USER.id}
                              <br />
                              Password: {DEMO_USER.password}
                            </div> */}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="login-email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="login-email"
                              type="email"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="login-password" className="text-right">
                              Password
                            </Label>
                            <Input
                              id="login-password"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button
                              variant="link"
                              className="text-[#bf840d] hover:text-[#8B5E04] p-0 h-auto font-normal"
                            >
                              Forgot password?
                            </Button>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-[#bf840d] hover:bg-[#a06f0b] text-white"
                            onClick={handleLogin}
                            disabled={isLoading}
                          >
                            {isLoading ? "Signing in..." : "Sign In"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button variant="link" className="text-[#bf840d] hover:text-[#8B5E04] p-0 h-auto font-normal">
                      Manage Booking
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <div className="relative" ref={bookDropdownRef}>
              <Button
                className="bg-[#bf840d] text-white hover:bg-[#8B5E04] flex items-center"
                onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)}
              >
                Book Now
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              {isBookDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {bookingOptions.map((option, index) => (
                      <Link
                        key={index}
                        href={option.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <span className="block text-[#bf840d] font-medium">{option.title}</span>
                        <span className="block mt-1 text-xs text-gray-500">{option.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#bf840d]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Rooms & Suites
              </Link>
              <Link
                href="/dining"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Dining
              </Link>
              <Link
                href="/offers"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link
                href="/wellness"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Wellness
              </Link>
              <Link
                href="/events"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/gallery"
                className="py-2 text-[#bf840d] hover:text-[#8B5E04] font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile">
                      <Button
                        variant="outline"
                        className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white w-full flex items-center justify-center gap-2"
                      >
                        <User size={16} />
                        My Profile
                      </Button>
                    </Link>
                    <Button
                      className="bg-zinc-900 hover:bg-zinc-700 text-white w-full"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                        toast({
                          title: "Logged out",
                          description: "You have been successfully logged out",
                        })
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white w-full"
                      >
                        Sign In
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                        <DialogDescription>
                          Enter your credentials to access your account.
                          {/* <div className="mt-2 p-2 bg-amber-50 text-amber-800 rounded-md text-xs">
                            Demo credentials:
                            <br />
                            ID: {DEMO_USER.id}
                            <br />
                            Password: {DEMO_USER.password}
                          </div> */}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="mobile-login-email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="mobile-login-email"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="mobile-login-password" className="text-right">
                            Password
                          </Label>
                          <Input
                            id="mobile-login-password"
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button variant="link" className="text-[#bf840d] hover:text-[#8B5E04] p-0 h-auto font-normal">
                            Forgot password?
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="bg-[#bf840d] hover:bg-[#a06f0b] text-white"
                          onClick={async () => {
                            setIsLoading(true)
                            try {
                              const success = await login(loginEmail, loginPassword)
                              if (success) {
                                setIsMenuOpen(false)
                                toast({
                                  title: "Login successful",
                                  description: "Welcome back to Hotel Patliputra Continental!",
                                })
                                router.push("/profile")
                              } else {
                                toast({
                                  title: "Login failed",
                                  description: "Invalid credentials. Try ID: user123, Password: password123",
                                  variant: "destructive",
                                })
                              }
                            } catch (error) {
                              toast({
                                title: "Login error",
                                description: "An error occurred during login",
                                variant: "destructive",
                              })
                            } finally {
                              setIsLoading(false)
                            }
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <div className="relative">
                  <Button
                    className="bg-[#bf840d] text-white hover:bg-[#8B5E04] w-full flex items-center justify-center"
                    onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)}
                  >
                    Book Now
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                  {isBookDropdownOpen && (
                    <div className="mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {bookingOptions.map((option, index) => (
                          <Link
                            key={index}
                            href={option.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            <span className="block text-[#bf840d] font-medium">{option.title}</span>
                            <span className="block mt-1 text-xs text-gray-500">{option.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
