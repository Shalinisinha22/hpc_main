import { Button } from "@/components/ui/button"

export default function BenefitsSection() {
  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4">
        <div className="h-full flex flex-col justify-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Special Benefits & Privileges for our loyal patrons
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-12">
            Enjoy exclusive discounts, complimentary services, and unique experiences.
          </p>
          <Button
            className="bg-[#bf840d] hover:bg-[#a06f0b] text-white w-fit px-8 py-6 text-lg mt-4"
            onClick={() => (window.location.href = "/membership")}
          >
            EXPLORE MEMBERSHIP
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-t from-[#bf840d]/20 to-transparent" />
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-b from-[#bf840d]/20 to-transparent" />
    </section>
  )
}
