import { Dumbbell, UtensilsCrossed, Wifi, Wine } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Dumbbell className="w-10 h-10" />,
      title: "Fitness Center",
      description: "State-of-the-art fitness center with personal trainers available upon request.",
    },
    {
      icon: <UtensilsCrossed className="w-10 h-10" />,
      title: "Fine Dining",
      description: "Award-winning restaurants offering international and local cuisine.",
    },
    {
      icon: <Wifi className="w-10 h-10" />,
      title: "High-Speed WiFi",
      description: "Complimentary high-speed internet access throughout the property.",
    },
    {
      icon: <Wine className="w-10 h-10" />,
      title: "Premium Bar",
      description: "Elegant bar serving craft cocktails, fine wines, and premium spirits.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-amber-900 mb-4">Exceptional Services</h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
            Indulge in our premium amenities designed to enhance your stay experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-800 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-medium text-amber-900 mb-2">{service.title}</h3>
              <p className="text-amber-800/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
