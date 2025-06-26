import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#50442e] text-amber-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-2xl font-serif mb-6 text-amber-200">About HPC</h3>
            <p className="mb-6">
              Experience unparalleled luxury at  Hotel Patliputra Continental. Our commitment to excellence ensures your stay is nothing
              short of extraordinary.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/hpcpatna/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="https://x.com/hpcpatna" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="https://www.instagram.com/hpcpatna/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.youtube.com/channel/UClR4U0_8xV_2m4TumSP59xw?view_as=subscriber" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-serif mb-6 text-amber-200">Quick Links</h3>
            <ul className="space-y-3">
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
                    <span className="w-4 h-4 flex items-center justify-center text-xs">→</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-2xl font-serif mb-6 text-amber-200">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-200 flex-shrink-0 mt-1" />
                <p>PC Golambar, Bypass Crossing, Anisabad, Patna - 800002</p>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-amber-200 flex-shrink-0" />
                <p>+91 612 2250 204 / 205 / 206 </p>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-amber-200 flex-shrink-0" />
                <a href="mailto: reservations@hpcpatna.com" className="hover:text-white transition-colors">
                   reservations@hpcpatna.com
                </a>
              </li>
            </ul>
          </div>

          {/* Google Map */}
          <div>
            <h3 className="text-2xl font-serif mb-6 text-amber-200">Locate Us</h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-amber-700 aspect-[4/3] bg-white">
              <iframe
                title="Hotel Patliputra Continental Location"
                src="https://www.google.com/maps?q=Hotel+Patliputra+Continental,+PC+Golambar,+Bypass+Crossing,+Anisabad,+Patna+-+800002&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-12 border-t border-amber-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hpc1-3yc9VOEom6Jd5lIMdYHerWUqjOgFlm.png"
              alt="Luxe Haven Logo"
              width={120}
              height={40}
              className="object-contain bg-white p-2 rounded-lg"
            />
            <span className="text-xl font-serif"> Hotel Patliputra Continental </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
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
          <p className="text-sm text-amber-200/70">© 2025  Hotel Patliputra Continental . All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
