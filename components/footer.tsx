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
            <h3 className="text-2xl font-serif mb-6 text-amber-200">About Luxe Haven</h3>
            <p className="mb-6">
              Experience unparalleled luxury at  Hotel Patliputra Continental. Our commitment to excellence ensures your stay is nothing
              short of extraordinary.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Link key={index} href="#" className="text-amber-200 hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-serif mb-6 text-amber-200">Quick Links</h3>
            <ul className="space-y-3">
              {["Our Rooms", "Dining", "Wellness", "Events", "Gallery", "Offers"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-4 h-4 flex items-center justify-center text-xs">→</span>
                    {item}
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

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-serif mb-6 text-amber-200">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-amber-800/50 border-amber-700 text-white placeholder:text-amber-200/70 focus:border-amber-500"
              />
              <Button className="w-full bg-amber-600 text-white hover:bg-amber-500">Subscribe</Button>
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
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
          <p className="text-sm text-amber-200/70">© 2025  Hotel Patliputra Continental . All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
