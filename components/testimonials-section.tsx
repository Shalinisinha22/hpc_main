import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ThumbsUp, ChevronLeft, ChevronRight, Calendar, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  name: string
  location: string
  comment: string
  rating: number
  date: string
  restaurant: string
  dish: string
  image: string
  avatar: string
  likes: number
}

const testimonials: Testimonial[] = [
  {
    name: "Umesh S",
    location: "Patna, Bihar",
    comment:
      "Good service no doubt. Staffs are very comparative and also help me. Location was great nearby market everything shop available here. Thanks to Miss Muskan Shalini Also one more muskan. Room amenities size cleaning awesome. Most valuable price for stay.",
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
    name: "Sonu",
    location: "Patna, Bihar",
    comment:
      "The hotel was too good ambiance. Food quality service everything perfect. Staff behaviour was so comparative and also friendly.",
    rating: 5,
    date: "April 2, 2023",
    restaurant: "Bistro",
    dish: "Signature Buffet",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    avatar: "https://i.pravatar.cc/150?img=3",
    likes: 38,
  },
  {
    name: "Ujjal Naskar",
    location: "Patna, Bihar",
    comment:
      "It was an excellent stay in hotel patliputra continental,patna. The Room is clean, well maintained with other facilities and the staffs are also well groomed, polite and their behaviour is also very gentle and professional.",
    rating: 5,
    date: "May 10, 2023",
    restaurant: "Bistro",
    dish: "Deluxe Room",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    avatar: "https://i.pravatar.cc/150?img=5",
    likes: 29,
  },
  // {
  //   name: "John Smith",
  //   location: "Sydney, Australia",
  //   comment:
  //     "The culinary journey at Bistro is unmatched. Each dish tells a story of tradition and innovation. Highly recommended!",
  //   rating: 4,
  //   date: "May 12, 2023",
  //   restaurant: "Bistro",
  //   dish: "Seafood Paella",
  //   image:
  //     "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  //   avatar: "https://i.pravatar.cc/150?img=7",
  //   likes: 35,
  // },
]

export default function TestimonialsSection({ isMobile, restaurantNames }: { isMobile: boolean, restaurantNames: string[] }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null)

  const filteredTestimonials = testimonials
  const safeCurrent = filteredTestimonials.length > 0 ? currentTestimonial % filteredTestimonials.length : 0;
  const hasTestimonials = filteredTestimonials.length > 0;

  const handleNext = () => {
    if (!hasTestimonials) return;
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const handlePrevious = () => {
    if (!hasTestimonials) return;
    setCurrentTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  if (isMobile) {
    // ...mobile version omitted for brevity...
    return null
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1  text-amber-800 rounded-full text-sm font-medium mb-4">
            GUEST EXPERIENCES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Authentic reviews from our valued guests who have experienced our culinary delights
          </p>
        </div>
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Previous testimonial"
              disabled={!hasTestimonials}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            {hasTestimonials ? (
              <motion.div
                key={filteredTestimonials[safeCurrent].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-xl"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={filteredTestimonials[safeCurrent].image || "/placeholder.svg"}
                      alt={filteredTestimonials[safeCurrent].dish}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-white font-medium">{filteredTestimonials[safeCurrent].dish}</span>
                      <span className="text-amber-300 text-sm ml-2">
                        at {filteredTestimonials[safeCurrent].restaurant}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(filteredTestimonials[safeCurrent].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                        {[...Array(5 - filteredTestimonials[safeCurrent].rating)].map((_, i) => (
                          <Star
                            key={i + filteredTestimonials[safeCurrent].rating}
                            className="w-5 h-5 text-gray-300"
                          />
                        ))}
                        <span className="text-gray-500 text-sm ml-2">
                          {filteredTestimonials[safeCurrent].date}
                        </span>
                      </div>
                      <div className="relative mb-6">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-amber-200 opacity-50" />
                        <p className="text-gray-700 text-lg italic pl-6 leading-relaxed">
                          "{filteredTestimonials[safeCurrent].comment}"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={filteredTestimonials[safeCurrent].avatar || "/placeholder.svg"}
                            alt={filteredTestimonials[safeCurrent].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{filteredTestimonials[safeCurrent].name}</h4>
                          <p className="text-sm text-gray-500">{filteredTestimonials[safeCurrent].location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-gray-600">{filteredTestimonials[safeCurrent].likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl overflow-hidden shadow-xl flex items-center justify-center h-64">
                <p className="text-gray-400 text-lg">No testimonials available.</p>
              </div>
            )}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Next testimonial"
              disabled={!hasTestimonials}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {hasTestimonials && filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  safeCurrent === index ? "bg-amber-500 w-6" : "bg-gray-300 hover:bg-amber-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all ${
                expandedTestimonial === index ? "md:col-span-2 lg:col-span-3" : ""
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
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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
                  onClick={() => setExpandedTestimonial(expandedTestimonial === index ? null : index)}
                  className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                >
                  {expandedTestimonial === index ? "Read less" : "Read more"}
                </button>
              )}
            </motion.div>
          ))}
        </div>
        {/* <div className="text-center mt-16">
          <Button className="bg-[#bf840d] hover:bg-[#8B5E04] text-white px-8 py-3">Share Your Experience</Button>
        </div> */}
      </div>
    </section>
  )
}
