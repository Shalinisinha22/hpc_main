"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/services/auth-service"
import type { User, AuthResponse } from "@/types/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  handleTokenExpiration: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("hpc-Token")
    const userData = localStorage.getItem("hpc-User")
    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login(email, password)
      if (response.success) {
        const { token, name, email, role,phone } = response.result
        const userData: User = { name, email, phone, role }
        
        // Save token and user data
        localStorage.setItem("hpc-Token", token)
        localStorage.setItem("hpc-User", JSON.stringify(userData))
        
        setUser(userData)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("hpc-Token")
    localStorage.removeItem("hpc-User")
  }

  const handleTokenExpiration = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("hpc-Token")
    localStorage.removeItem("hpc-User")
    // You can add toast notification here if needed
    console.warn("Your session has expired. Please log in again.")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, handleTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
