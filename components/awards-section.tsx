import Image from "next/image"
import { Trophy, Star, Utensils, SpadeIcon as Spa, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const awards = [
  {
    name: "World's Leading Luxury Hotel 2023",
    organization: "World Travel Awards",
    description:
      "Recognized for exceptional luxury accommodations, personalized service, and unparalleled guest experiences.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    icon: Trophy,
    year: "2023",
  },
  {
    name: "Five-Star Hotel",
    organization: "Forbes Travel Guide",
    description:
      "Awarded the prestigious five-star rating for consistently exceeding guest expectations and maintaining exceptional standards.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    icon: Star,
    year: "2022-2023",
  },
  {
    name: "Best Culinary Experience",
    organization: "Travel + Leisure",
    description:
      "Honored for our innovative cuisine, farm-to-table dining concepts, and exceptional culinary team led by award-winning chefs.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    icon: Utensils,
    year: "2023",
  },
  {
    name: "Best Hotel Spa 2023",
    organization: "Condé Nast Traveler",
    description:
      "Celebrated for our holistic wellness approach, innovative treatments, and serene atmosphere that promotes relaxation and rejuvenation.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    icon: Spa,
    year: "2023",
  },
]

export default function AwardsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="h-6 w-6 text-[#bf840d]" />
            <span className="text-sm uppercase tracking-wider text-gray-500 font-medium">Recognition</span>
          </div>
          <h2 className="text-center text-3xl md:text-4xl font-serif text-[#bf840d] mb-4">
            <span className="inline-block border-b-2 border-[#bf840d] pb-2">Our Awards</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Luxe Haven has been recognized for its exceptional service, luxurious accommodations, and unforgettable
            experiences by some of the most prestigious organizations in the travel industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="w-full h-48 relative overflow-hidden">
                <div className="absolute top-3 right-3 z-10 bg-[#bf840d]/90 text-white text-xs font-bold py-1 px-2 rounded">
                  {award.year}
                </div>
                <Image
                  src={award.image || "/placeholder.svg"}
                  alt={award.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <award.icon className="w-8 h-8 text-white mb-2" />
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[#bf840d] group-hover:text-[#d4a44c] transition-colors">
                    {award.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-2">{award.organization}</p>
                <p className="text-sm text-gray-600 mt-auto line-clamp-3">{award.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white transition-colors group"
          >
            View All Awards
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
