"use client"

import { useState } from "react"
import { PhoneIcon as WhatsappIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsappButton() {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank") // Replace with your WhatsApp number
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePopup}
        className="bg-[#bf840d] text-white rounded-full p-3 shadow-lg hover:bg-[#a06f0b] transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappIcon className="w-6 h-6" />
      </button>

      {isPopupVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-64">
          <button onClick={togglePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
          <h3 className="text-lg font-semibold mb-2">Need help?</h3>
          <p className="text-sm text-gray-600 mb-4">Chat with us on WhatsApp for quick assistance!</p>
          <Button onClick={handleWhatsAppClick} className="w-full bg-[#bf840d] hover:bg-[#a06f0b] text-white">
            <WhatsappIcon className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      )}
    </div>
  )
}
