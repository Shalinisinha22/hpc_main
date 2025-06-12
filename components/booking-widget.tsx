"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomCalendar } from "@/components/ui/custom-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import RoomResults from "./room-results"

export default function BookingWidget() {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [adults, setAdults] = useState<string>("1")
  const [children, setChildren] = useState<string>("0")
  const [noOfRooms, setNoOfRooms] = useState<string>("1")
  const [searchResult, setSearchResult] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate || !adults || !noOfRooms) {
      setSearchResult("Please fill in all required fields.")
      setShowResults(false)
      return
    }

    if (checkOutDate <= checkInDate) {
      setSearchResult("Check-out date must be after check-in date.")
      setShowResults(false)
      return
    }

    setSearchResult(`Available rooms for your stay:`)
    setShowResults(true)
  }

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date)
    setCheckInOpen(false)
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date)
    setCheckOutOpen(false)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 -mt-16 relative z-10 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!checkInDate ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, "EEE, MMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CustomCalendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={handleCheckInSelect}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="rounded-md border shadow-md"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!checkOutDate ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, "EEE, MMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CustomCalendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={handleCheckOutSelect}
                  initialFocus
                  disabled={(date) => date <= (checkInDate || new Date())}
                  className="rounded-md border shadow-md"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Number of Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
            <Select value={noOfRooms} onValueChange={setNoOfRooms}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Room</SelectItem>
                <SelectItem value="2">2 Rooms</SelectItem>
                <SelectItem value="3">3 Rooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <div className="flex gap-2">
              <Select value={adults} onValueChange={setAdults}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Adults" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                  <SelectItem value="4">4 Adults</SelectItem>
    
                </SelectContent>
              </Select>

              <Select value={children} onValueChange={setChildren}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 Children</SelectItem>
                  <SelectItem value="1">1 Child</SelectItem>
                  <SelectItem value="2">2 Children</SelectItem>
                
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              className="w-full bg-amber-800 hover:bg-amber-900 text-white py-6"
              onClick={handleCheckAvailability}
            >
              Check Availability
            </Button>
          </div>
        </div>

        {/* Search Result */}
        {searchResult && (
          <Alert className="mt-4">
            <AlertTitle>Search Result</AlertTitle>
            <AlertDescription>{searchResult}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Room Results */}
      {showResults && (
        <div className="container mx-auto px-4">
          <RoomResults
            checkInDate={checkInDate!}
            checkOutDate={checkOutDate!}
            adults={Number.parseInt(adults)}
            children={Number.parseInt(children)}
            noOfRooms={Number.parseInt(noOfRooms)}
          />
        </div>
      )}
    </>
  )
}
