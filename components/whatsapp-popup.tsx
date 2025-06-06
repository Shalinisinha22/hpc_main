"use client"

import { useState, useEffect } from "react"

export default function WhatsappPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // Show popup after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank") // Replace with your WhatsApp number
  }

  if (!isVisible) return null

  return null
}
