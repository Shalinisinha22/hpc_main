"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Demo user credentials
export const DEMO_USER = {
  id: "user123",
  password: "password123",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  membershipLevel: "Gold",
  memberSince: "January 2022",
  points: 1250,
  upcomingStays: [
    {
      id: "stay1",
      checkIn: "2025-04-15",
      checkOut: "2025-04-18",
      roomType: "Deluxe King Room",
      guests: 2,
    },
  ],
  pastStays: [
    {
      id: "past1",
      checkIn: "2024-01-10",
      checkOut: "2024-01-15",
      roomType: "Executive Suite",
      guests: 2,
    },
    {
      id: "past2",
      checkIn: "2023-08-22",
      checkOut: "2023-08-25",
      roomType: "Ocean View Room",
      guests: 3,
    },
  ],
  preferences: {
    roomPreference: "High floor",
    dietaryRestrictions: "Vegetarian",
    specialRequests: "Extra pillows",
  },
}

type User = typeof DEMO_USER

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (id: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem("hpcAuth")
    if (storedAuth === "true") {
      setUser(DEMO_USER)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (id: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    if (id === DEMO_USER.id && password === DEMO_USER.password) {
      setUser(DEMO_USER)
      setIsAuthenticated(true)
      localStorage.setItem("hpcAuth", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("hpcAuth")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
