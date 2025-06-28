"use client";

import { DialogTrigger } from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import { parse, isAfter, isBefore, isEqual, format } from "date-fns";
import axios from "axios";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Phone,
  Quote,
  Calendar,
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-mobile";
import DiningSection from "@/components/dining-section";

const chefs = [
  {
    name: "Chef Amelia Rodriguez",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1977&q=80",
    restaurant: "The Grand Pavilion",
    bio: "With over 20 years of experience in Michelin-starred restaurants, Chef Amelia brings her passion for innovative cuisine to The Grand Pavilion.",
  },
  {
    name: "Chef Rajesh Sharma",
    image:
      "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    restaurant: "Spice Route",
    bio: "A master of Indian cuisine, Chef Rajesh has traveled across the subcontinent to bring authentic flavors and techniques to Spice Route.",
  },
  {
    name: "Chef Yuki Tanaka",
    image:
      "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    restaurant: "Zen Garden",
    bio: "Trained in Tokyo's top restaurants, Chef Yuki combines traditional Japanese techniques with modern Asian flavors at Zen Garden.",
  },
];

export default function DiningPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentChef, setCurrentChef] = useState(0);
  const [diningData, setDiningData] = useState<any[]>([]);
  const [activeRestaurant, setActiveRestaurant] = useState<any | null>(null);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dining`).then((res) => {
      setDiningData(res.data);
      console.log(res.data[0])
      setActiveRestaurant(res.data[0] || null);
    });
  }, []);

  const nextChef = () => {
    setCurrentChef((prev) => (prev + 1) % chefs.length);
  };

  const prevChef = () => {
    setCurrentChef((prev) => (prev - 1 + chefs.length) % chefs.length);
  };

  useEffect(() => {
    const interval = setInterval(nextChef, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className={`relative ${
            isMobile ? "h-[60vh]" : "h-[80vh]"
          } flex items-center justify-center`}
        >
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxurious dining"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center text-white px-4"
          >
            <h1
              className={`${isMobile ? "text-4xl" : "text-6xl"} font-bold mb-4`}
            >
              A Taste of Perfection
            </h1>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} mb-8`}>
              From gourmet delights to local favourites — dine where flavour
              meets finesse.
            </p>

            <Button
              className="bg-[#bf840d] hover:bg-[#8B5E04] text-white text-lg px-8 py-3"
              onClick={() => {
                const section = document.getElementById("rooms-list-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Dining Options
            </Button>
          </motion.div>
        </section>

        {/* Culinary Excellence Section */}
        <DiningSection />

        {/* Restaurants Section */}
        <section className={`py-${isMobile ? "16" : "24"} bg-white`}>
          <div className="container mx-auto px-4">
            <h2
              className={`${
                isMobile ? "text-3xl" : "text-4xl"
              } font-bold text-center mb-${isMobile ? "10" : "16"}`}
            >
              Our Exquisite Restaurants
            </h2>

            {isMobile ? (
              // Mobile Layout
              <div className="space-y-8">
                {diningData.map((restaurant, index) => (
                  <div
                    key={restaurant._id}
                    className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                  >
                    <div className="relative h-48">
                      <Image
                        src={restaurant.image?.[0]?.url || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-2xl font-semibold mb-2">
                        {restaurant.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {restaurant.shortIntro}
                      </p>
                      <div className="flex flex-col gap-3 mb-5">
                        {restaurant.breakfastTiming && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-[#bf840d]" />
                            <span className="text-sm font-medium">Breakfast: </span>
                            <span className="text-sm ml-1">{restaurant.breakfastTiming}</span>
                          </div>
                        )}
                        {restaurant.lunchDinnerTiming && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-[#bf840d]" />
                            <span className="text-sm font-medium">Lunch & Dinner: </span>
                            <span className="text-sm ml-1">{restaurant.lunchDinnerTiming}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-[#bf840d]" />
                          <span className="text-sm">{restaurant.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-[#bf840d]" />
                          <span className="text-sm">{restaurant.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#bf840d] font-semibold text-sm">Avg. Price for 2: ₹{restaurant.avgPriceFor2}</span>
                        </div>
                      </div>
                      {restaurant.description && (
                        <div className="text-gray-700 text-sm mb-2" dangerouslySetInnerHTML={{ __html: restaurant.description }} />
                      )}
                      <div className="flex flex-col gap-3">
                        <MenuDialog restaurant={restaurant} />
                        <ReservationDialog restaurant={restaurant} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop Layout
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <ul className="space-y-4">
                    {diningData.map((restaurant, index) => (
                      <li key={restaurant._id}>
                        <Button
                          variant={
                            activeRestaurant &&
                            activeRestaurant._id === restaurant._id
                              ? "default"
                              : "outline"
                          }
                          className="w-full text-left justify-start h-auto py-4"
                          onClick={() => setActiveRestaurant(restaurant)}
                        >
                          <div>
                            <h3 className="text-xl font-semibold">
                              {restaurant.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {restaurant.shortIntro}
                            </p>
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2">
                  {activeRestaurant && (
                    <motion.div
                      key={activeRestaurant._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-100 rounded-lg overflow-hidden shadow-xl"
                    >
                      <Image
                        src={
                          activeRestaurant.image?.[0]?.url || "/placeholder.svg"
                        }
                        alt={activeRestaurant.name}
                        width={800}
                        height={400}
                        className="w-full h-80 object-cover"
                      />
                      <div className="p-8">
                        <h3 className="text-3xl font-semibold mb-4">
                          {activeRestaurant.name}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {activeRestaurant.shortIntro}
                        </p>
                        <div className="flex flex-wrap gap-6 mb-8">
                          {activeRestaurant.breakfastTiming && (
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-[#bf840d]" />
                              <span className="text-sm font-medium">Breakfast: </span>
                              <span className="text-sm ml-1">{activeRestaurant.breakfastTiming}</span>
                            </div>
                          )}
                          {activeRestaurant.lunchDinnerTiming && (
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-[#bf840d]" />
                              <span className="text-sm font-medium">Lunch & Dinner: </span>
                              <span className="text-sm ml-1">{activeRestaurant.lunchDinnerTiming}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-[#bf840d]" />
                            <span>{activeRestaurant.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-[#bf840d]" />
                            <span>{activeRestaurant.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-[#bf840d] font-semibold text-sm">Avg. Price for 2: ₹{activeRestaurant.avgPriceFor2}</span>
                          </div>
                        </div>
                        {activeRestaurant.description && (
                          <div className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: activeRestaurant.description }} />
                        )}
                        <div className="flex gap-4">
                          <MenuDialog restaurant={activeRestaurant} />
                          <ReservationDialog restaurant={activeRestaurant} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Chef Highlights Section */}
        {/* <section className={`py-${isMobile ? "16" : "24"} bg-gray-100`}>
          <div className="container mx-auto px-4">
            <h2 className={`${isMobile ? "text-3xl" : "text-4xl"} font-bold text-center mb-${isMobile ? "10" : "16"}`}>
              Meet Our Master Chefs
            </h2>
            <div className="relative">
              {isMobile ? (
                // Mobile Layout
                <div className="px-4">
                  <motion.div
                    key={currentChef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="w-48 h-48 relative rounded-full overflow-hidden">
                      <Image
                        src={chefs[currentChef].image || "/placeholder.svg"}
                        alt={chefs[currentChef].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center max-w-md">
                      <h3 className="text-2xl font-semibold mb-2">{chefs[currentChef].name}</h3>
                      <p className="text-[#bf840d] text-lg mb-3">{chefs[currentChef].restaurant}</p>
                      <p className="text-gray-600 text-sm">{chefs[currentChef].bio}</p>
                    </div>
                  </motion.div>

                  <div className="flex justify-center mt-8 gap-2">
                    {chefs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentChef(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentChef === index ? "bg-[#bf840d] w-6" : "bg-[#bf840d]/30"
                        }`}
                        aria-label={`View chef ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Desktop Layout
                <div className="flex items-center justify-center">
                  <Button onClick={prevChef} variant="outline" className="mr-8">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <motion.div
                    key={currentChef}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="w-64 h-64 relative rounded-full overflow-hidden">
                      <Image
                        src={chefs[currentChef].image || "/placeholder.svg"}
                        alt={chefs[currentChef].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center md:text-left md:max-w-md">
                      <h3 className="text-3xl font-semibold mb-2">{chefs[currentChef].name}</h3>
                      <p className="text-[#bf840d] text-xl mb-4">{chefs[currentChef].restaurant}</p>
                      <p className="text-gray-600">{chefs[currentChef].bio}</p>
                    </div>
                  </motion.div>
                  <Button onClick={nextChef} variant="outline" className="ml-8">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        <TestimonialsSection
          isMobile={isMobile}
          restaurantNames={diningData.map((r) => r.name)}
        />
      </main>
      <Footer />
    </div>
  );
}

function MenuDialog({ restaurant }: { restaurant: any }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${
            isMobile ? "w-full" : "w-full"
          } bg-[#bf840d] hover:bg-[#8B5E04] text-white`}
        >
          View Menu
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${
          isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-[700px]"
        } max-h-[80vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle>{restaurant.name} Menu</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {Array.isArray(restaurant.menu) && restaurant.menu.length > 0 ? (
            restaurant.menu[0].category ? (
              // Structured menu with categories
              restaurant.menu.map((category, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#bf840d]">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div className={isMobile ? "w-3/4" : ""}>
                          <h4 className="text-lg font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-[#bf840d] font-semibold">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Simple menu structure
              <div className="space-y-4">
                {restaurant.menu.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium">{item.name}</h4>
                      <span className="text-[#bf840d] font-semibold">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-gray-500 italic">Menu not available.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReservationDialog({ restaurant }: { restaurant: any }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get today's date in yyyy-mm-dd
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  // Get current time in HH:MM (24h)
  const getCurrentTimeString = () => {
    const now = new Date();
    return now.toTimeString().slice(0,5);
  };
  // Check if selected date is today
  const isToday = date === getTodayString();

  // Parse a time string (either "HH:mm" or "h:mm AM/PM") into a Date object on a reference date
  const parseTimeToDate = (timeStr: string, refDate: Date = new Date(2000, 0, 1)) => {
    // Try "HH:mm" (24h) first
    let parsed = parse(timeStr, "HH:mm", refDate);
    if (!isNaN(parsed.getTime())) return parsed;
    // Try "h:mm a" (AM/PM)
    parsed = parse(timeStr, "h:mm a", refDate);
    if (!isNaN(parsed.getTime())) return parsed;
    // Try "h a" (e.g. "7 AM")
    parsed = parse(timeStr, "h a", refDate);
    if (!isNaN(parsed.getTime())) return parsed;
    return null;
  };

  // Checks if selected time is within any of the provided time ranges
  const isTimeWithinAny = (selected: string, timeRanges: string[]) => {
    if (!selected || !timeRanges.length) return true;
    const refDate = new Date(2000, 0, 1);
    const sel = parseTimeToDate(selected, refDate);
    if (!sel) return false;
    for (const range of timeRanges) {
      if (!range) continue;
      // Support multiple ranges separated by "," (e.g. "6:30 AM - 10:30 AM, 7:00 PM - 11:00 PM")
      const subRanges = range.split(",").map(r => r.trim());
      for (const sub of subRanges) {
        if (!sub.includes("-")) continue;
        const [startStr, endStr] = sub.split("-").map(s => s.trim());
        const start = parseTimeToDate(startStr, refDate);
        const end = parseTimeToDate(endStr, refDate);
        if (!start || !end) continue;
        if ((isAfter(sel, start) || isEqual(sel, start)) && (isBefore(sel, end) || isEqual(sel, end))) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Validate date is not in the past
    const todayStr = getTodayString();
    if (date < todayStr) {
      setError("Reservation date cannot be in the past.");
      setLoading(false);
      return;
    }
    // Validate time is not in the past if date is today
    if (date === todayStr && time < getCurrentTimeString()) {
      setError("Reservation time cannot be in the past.");
      setLoading(false);
      return;
    }
    // Validate time within restaurant hours (breakfast OR lunch/dinner)
    const validRanges: string[] = [];
    if (restaurant.breakfastTiming) validRanges.push(restaurant.breakfastTiming);
    if (restaurant.lunchDinnerTiming) validRanges.push(restaurant.lunchDinnerTiming);

    // Helper to parse all sub-ranges and format as "start - end"
    const getAllReadableRanges = (ranges: string[]) => {
      const readable: string[] = [];
      for (const range of ranges) {
        if (!range) continue;
        const subRanges = range.split(",").map(r => r.trim());
        for (const sub of subRanges) {
          if (!sub.includes("-")) continue;
          const [start, end] = sub.split("-").map(s => s.trim());
          readable.push(`${start} - ${end}`);
        }
      }
      return readable;
    };

    if (!isTimeWithinAny(time, validRanges)) {
      const readableRanges = getAllReadableRanges(validRanges);
      setError(
        `Selected time is outside restaurant's operating hours.\nValid timings: ` +
        readableRanges.join(", ")
      );
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dining-bookings`,
        {
          name,
          phone,
          date,
          time,
          guests,
          dining: restaurant._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("hpc-token") || ""}`, // Ensure you have the correct API key set
          },
        }
      );
      setIsThankYouOpen(true);
      setIsReservationOpen(false);
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests(1);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsReservationOpen(true)}
            className={`${
              isMobile ? "w-full" : "w-full"
            } bg-[#bf840d] hover:bg-[#8B5E04] text-white`}
          >
            Reserve a Table
          </Button>
        </DialogTrigger>
        <DialogContent
          className={`${
            isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-[350px]"
          }`}
        >
          <DialogHeader>
            <DialogTitle>Quick Reservation</DialogTitle>
            <DialogDescription>
              Enter details for your reservation.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={getTodayString()}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                min={isToday ? getCurrentTimeString() : undefined}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="guests">Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-[#bf840d] hover:bg-[#8B5E04] text-white"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Reservation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
        <DialogContent
          className={`${
            isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-[425px]"
          }`}
        >
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Your reservation has been confirmed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsThankYouOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TestimonialsSection({
  isMobile,
  restaurantNames,
}: {
  isMobile: boolean;
  restaurantNames: string[];
}) {
  const diningTestimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      comment:
        "The Bistro offers an unforgettable dining experience. The flavors are exquisite and the service is impeccable!",
      rating: 5,
      date: "March 15, 2023",
      restaurant: "Bistro",
      dish: "Mediterranean Platter",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      avatar: "https://i.pravatar.cc/150?img=1",
      likes: 42,
    },
    {
      name: "Michael Chen",
      location: "London, UK",
      comment:
        "Chao China's authentic Chinese cuisine is the best I've had outside of Beijing. The Peking Duck is a must-try!",
      rating: 5,
      date: "February 22, 2023",
      restaurant: "Chao China",
      dish: "Peking Duck",
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      avatar: "https://i.pravatar.cc/150?img=3",
      likes: 38,
    },
    {
      name: "Elena Rodriguez",
      location: "Madrid, Spain",
      comment:
        "Coca Mocha's coffee selection is outstanding. The ambiance is perfect for both work meetings and casual catch-ups.",
      rating: 5,
      date: "April 5, 2023",
      restaurant: "Coca Mocha",
      dish: "Signature Mocha & Tiramisu",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      avatar: "https://i.pravatar.cc/150?img=5",
      likes: 29,
    },
    {
      name: "John Smith",
      location: "Sydney, Australia",
      comment:
        "The culinary journey at Bistro is unmatched. Each dish tells a story of tradition and innovation. Highly recommended!",
      rating: 4,
      date: "May 12, 2023",
      restaurant: "Bistro",
      dish: "Seafood Paella",
      image:
        "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      avatar: "https://i.pravatar.cc/150?img=7",
      likes: 35,
    },
  ];

  const [activeRestaurant, setActiveRestaurant] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(
    null
  );

  const filteredTestimonials = activeRestaurant
    ? diningTestimonials.filter((t) => t.restaurant === activeRestaurant)
    : diningTestimonials;

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrevious = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    );
  };

  if (filteredTestimonials.length === 0) {
    return (
      <section className={isMobile ? "py-16 bg-gradient-to-b from-white to-gray-50" : "py-24 bg-gradient-to-b from-white to-gray-50"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-3">
            GUEST EXPERIENCES
          </span>
          <h2 className={isMobile ? "text-3xl font-bold mb-3" : "text-4xl md:text-5xl font-bold mb-4"}>What Our Guests Say</h2>
          <p className={isMobile ? "text-sm text-gray-600 max-w-xs mx-auto mb-8" : "text-lg text-gray-600 max-w-2xl mx-auto mb-8"}>
            Authentic reviews from our valued guests
          </p>
          <div className="py-12 text-gray-500 italic text-lg">No testimonials available for this restaurant.</div>
        </div>
      </section>
    );
  }

  if (isMobile) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-3">
              GUEST EXPERIENCES
            </span>
            <h2 className="text-3xl font-bold mb-3">What Our Guests Say</h2>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Authentic reviews from our valued guests
            </p>
          </div>

          {/* Restaurant Filter - Simplified for Mobile */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveRestaurant(null)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  activeRestaurant === null
                    ? "bg-white shadow-sm text-amber-800"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All
              </button>
              {restaurantNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setActiveRestaurant(name)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    activeRestaurant === name
                      ? "bg-white shadow-sm text-amber-800"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Featured Testimonial */}
          <div className="mb-10">
            <div className="relative">
              <motion.div
                key={filteredTestimonials[currentTestimonial].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <Image
                    src={
                      filteredTestimonials[currentTestimonial].image ||
                      "/placeholder.svg"
                    }
                    alt={filteredTestimonials[currentTestimonial].dish}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-sm font-medium">
                      {filteredTestimonials[currentTestimonial].dish}
                    </span>
                    <span className="text-amber-300 text-xs ml-1">
                      at {filteredTestimonials[currentTestimonial].restaurant}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-3">
                    {[
                      ...Array(filteredTestimonials[currentTestimonial].rating),
                    ].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-gray-500 text-xs ml-2">
                      {filteredTestimonials[currentTestimonial].date}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">
                    "{filteredTestimonials[currentTestimonial].comment}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={
                            filteredTestimonials[currentTestimonial].avatar ||
                            "/placeholder.svg"
                          }
                          alt={filteredTestimonials[currentTestimonial].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {filteredTestimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {filteredTestimonials[currentTestimonial].location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-gray-600">
                        {filteredTestimonials[currentTestimonial].likes}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={handlePrevious}
                  className="bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={handleNext}
                  className="bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "bg-amber-500 w-4"
                      : "bg-gray-300 hover:bg-amber-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white px-6 py-2 text-sm">
              Share Your Experience
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
            GUEST EXPERIENCES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Authentic reviews from our valued guests who have experienced our
            culinary delights
          </p>
        </div>

        {/* Restaurant Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveRestaurant(null)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeRestaurant === null
                  ? "bg-white shadow-sm text-amber-800"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Restaurants
            </button>
            {restaurantNames.map((name) => (
              <button
                key={name}
                onClick={() => setActiveRestaurant(name)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeRestaurant === name
                    ? "bg-white shadow-sm text-amber-800"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <motion.div
              key={filteredTestimonials[currentTestimonial].name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={
                      filteredTestimonials[currentTestimonial].image ||
                      "/placeholder.svg"
                    }
                    alt={filteredTestimonials[currentTestimonial].dish}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white font-medium">
                      {filteredTestimonials[currentTestimonial].dish}
                    </span>
                    <span className="text-amber-300 text-sm ml-2">
                      at {filteredTestimonials[currentTestimonial].restaurant}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[
                        ...Array(
                          filteredTestimonials[currentTestimonial].rating
                        ),
                      ].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                      {[
                        ...Array(
                          5 - filteredTestimonials[currentTestimonial].rating
                        ),
                      ].map((_, i) => (
                        <Star
                          key={
                            i + filteredTestimonials[currentTestimonial].rating
                          }
                          className="w-5 h-5 text-gray-300"
                        />
                      ))}
                      <span className="text-gray-500 text-sm ml-2">
                        {filteredTestimonials[currentTestimonial].date}
                      </span>
                    </div>

                    <div className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-amber-200 opacity-50" />
                      <p className="text-gray-700 text-lg italic pl-6 leading-relaxed">
                        "{filteredTestimonials[currentTestimonial].comment}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={
                            filteredTestimonials[currentTestimonial].avatar ||
                            "/placeholder.svg"
                          }
                          alt={filteredTestimonials[currentTestimonial].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {filteredTestimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {filteredTestimonials[currentTestimonial].location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">
                        {filteredTestimonials[currentTestimonial].likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentTestimonial === index
                    ? "bg-amber-500 w-6"
                    : "bg-gray-300 hover:bg-amber-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* More Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all ${
                expandedTestimonial === index
                  ? "md:col-span-2 lg:col-span-3"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {testimonial.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-2">
                  {testimonial.restaurant}
                </span>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium mb-2 ml-2">
                  {testimonial.dish}
                </span>
                <p className="text-gray-700 mt-2">
                  {expandedTestimonial === index
                    ? testimonial.comment
                    : testimonial.comment.length > 120
                    ? `${testimonial.comment.substring(0, 120)}...`
                    : testimonial.comment}
                </p>
              </div>

              {testimonial.comment.length > 120 && (
                <button
                  onClick={() =>
                    setExpandedTestimonial(
                      expandedTestimonial === index ? null : index
                    )
                  }
                  className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                >
                  {expandedTestimonial === index ? "Read less" : "Read more"}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white px-8 py-3">
            Share Your Experience
          </Button>
        </div>
      </div>
    </section>
  );
}
