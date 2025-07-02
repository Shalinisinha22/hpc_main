import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#50442e] text-amber-100">
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg sm:text-2xl font-serif mb-4 sm:mb-6 text-amber-200">About HPC</h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
              Experience unparalleled luxury at  Hotel Patliputra Continental. Our commitment to excellence ensures your stay is nothing
              short of extraordinary.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="https://www.facebook.com/hpcpatna/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link href="https://x.com/hpcpatna" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link href="https://www.instagram.com/hpcpatna/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link href="https://www.youtube.com/channel/UClR4U0_8xV_2m4TumSP59xw?view_as=subscriber" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-2xl font-serif mb-4 sm:mb-6 text-amber-200">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              { [
                { name: "Our Rooms", href: "/rooms" },
                { name: "Dining", href: "/dining" },
                { name: "Wellness", href: "/wellness" },
                { name: "Events", href: "/events" },
                { name: "Gallery", href: "/gallery" },
                { name: "Offers", href: "/offers" },
                // { name: "Privacy Policy", href: "/privacy-policy" },
                // { name: "Terms & Conditions", href: "/terms-conditions" },
        
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-xs">→</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg sm:text-2xl font-serif mb-4 sm:mb-6 text-amber-200">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-200 flex-shrink-0 mt-1" />
                <p>PC Golambar, Bypass Crossing, Anisabad, Patna - 800002</p>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 flex-shrink-0" />
                <p>+91 612 2250 204 / 205 / 206 </p>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 flex-shrink-0" />
                <a href="mailto: reservations@hpcpatna.com" className="hover:text-white transition-colors">
                   reservations@hpcpatna.com
                </a>
              </li>
            </ul>
          </div>

          {/* Google Map */}
          <div>
            <h3 className="text-lg sm:text-2xl font-serif mb-4 sm:mb-6 text-amber-200">Locate Us</h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-amber-700 aspect-[4/3] bg-white max-w-xs mx-auto md:max-w-full">
              <iframe
                title="Hotel Patliputra Continental Location"
                src="https://www.google.com/maps?q=Hotel+Patliputra+Continental,+PC+Golambar,+Bypass+Crossing,+Anisabad,+Patna+-+800002&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 sm:my-12 border-t border-amber-700" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hpc1-3yc9VOEom6Jd5lIMdYHerWUqjOgFlm.png"
              alt="Luxe Haven Logo"
              width={100}
              height={32}
              className="object-contain bg-white p-2 rounded-lg mb-2 sm:mb-0"
            />
            <span className="text-base sm:text-xl font-serif"> Hotel Patliputra Continental </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm sm:text-base">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <Link href="/banquet-policy" className="hover:text-white transition-colors">
              Banquet Policy
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/70">© 2025  Hotel Patliputra Continental . All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
