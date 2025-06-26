"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import RoomResults from "./room-results"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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

  // Helper functions for date formatting
  function getTodayString() {
    const now = new Date();
    // Always use local midnight for today
    now.setHours(0, 0, 0, 0);
    // Fix: always use local date, not UTC
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function getMaxDateString() {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split('T')[0];
  }

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
          {/* Check-in & Check-out Dates (custom input style) */}
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check-in">Check-in Date *</Label>
                <Input
                  id="check-in"
                  type="date"
                  placeholder="DD/MM/YYYY"
                  value={checkInDate ? new Date(checkInDate.getTime() - checkInDate.getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
                  onChange={e => {
                    const val = e.target.value ? new Date(e.target.value + 'T00:00:00') : undefined;
                    // Prevent selecting a date before today
                    const today = new Date(getTodayString() + 'T00:00:00');
                    if (val && val < today) {
                      setCheckInDate(undefined);
                      return;
                    }
                    setCheckInDate(val);
                    if (checkOutDate && val && checkOutDate <= val) {
                      setCheckOutDate(undefined);
                    }
                  }}
                  min={getTodayString()}
                  max={getMaxDateString()}
                  required
                  className="mt-1"
                  onFocus={e => (e.target.type = 'date')}
                  onBlur={e => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                />
              </div>
              <div>
                <Label htmlFor="check-out">Check-out Date *</Label>
                <Input
                  id="check-out"
                  type="date"
                  placeholder="DD/MM/YYYY"
                  value={checkOutDate ? new Date(checkOutDate.getTime() - checkOutDate.getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
                  onChange={e => {
                    const val = e.target.value ? new Date(e.target.value + 'T00:00:00') : undefined;
                    setCheckOutDate(val);
                  }}
                  min={checkInDate ? new Date(checkInDate.getTime() - checkInDate.getTimezoneOffset() * 60000).toISOString().split('T')[0] : getTodayString()}
                  max={getMaxDateString()}
                  required
                  className="mt-1"
                  onFocus={e => (e.target.type = 'date')}
                  onBlur={e => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                />
              </div>
            </div>
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
            roomType={"any"}
          />
        </div>
      )}
    </>
  )
}
