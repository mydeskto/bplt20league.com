"use client";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import whiteLogo from "@/public/images/bpl-logo.avif"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const linkClasses = "text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-white after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"

  return (
    <div className="bg-[#0a0e27]">
    <footer className="relative bg-[#0a0e27] pl-5 h-fit pt-8 text-white overflow-hidden font-inter">
      <div className="border-t border-white/20 mt-8 pt-6 mr-4 text-center"></div>

      {/* Logo Section */}
          <div className="max-w-screen mx-auto px-4">
            <div className="flex flex-col items-start">
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                  width={168}
                  height={88}
                    src={whiteLogo.src}
                    alt="BPL Logo"
                    className="w-42 h-22 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    loading="lazy"
                  />
                </Link>
              <p className="text-sm text-gray-300 pl-0 lg:pl-25  leading-relaxed max-w-[100vw]">
                BPLT20League.com is an independent cricket website providing complete coverage and updates on the Bangladesh Premier League 2026 — not affiliated with the official BPL.
              </p>
              </div>
            </div>
          </div>

      <div className="relative z-10 max-w-screen mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 justify-self-center">
          

          {/* Teams Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">TEAMS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/teams/sylhet-titans" className={linkClasses}>
                  Sylhet Titans
                </Link>
              </li>
              <li>
                <Link href="/teams/chattogram-royals" className={linkClasses}>
                  Chattogram Royals
                </Link>
              </li>
              <li>
                <Link href="/teams/dhaka-capitals" className={linkClasses}>
                  Dhaka Capitals
                </Link>
              </li>
              <li>
                <Link href="/teams/noakhali-express" className={linkClasses}>
                  Noakhali Express
                </Link>
              </li>
              <li>
                <Link href="/teams/rangpur-riders" className={linkClasses}>
                  Rangpur Riders
                </Link>
              </li>
              <li>
                <Link href="/teams/rajshahi-warriors" className={linkClasses}>
                  Rajshahi Warriors
                </Link>
              </li>
            </ul>
          </div>

          {/* Sitemap Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">SITEMAP</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className={linkClasses}>
                  Home
                </Link>
              </li>
              
              <li>
                <Link href="/matches" className={linkClasses}>
                  Matches
                </Link>
              </li>
              <li>
                <Link href="/teams" className={linkClasses}>
                  Teams
                </Link>
              </li>

              <li>
                <Link href="/stats" className={linkClasses}>
                  Stats
                </Link>
              </li>
              <li>
                <Link href="/news" className={linkClasses}>
                  News
                </Link>
              </li>
              <li>
                <Link href="/schedule" className={linkClasses}>
                  SCHEDULE
                </Link>
              </li>
              <li>
                <Link href="/points-table" className={linkClasses}>
                  Points Table
                </Link>
              </li>
              <li>
                <Link href="/bpl-venue" className={linkClasses}>
                  Venues
                </Link>
              </li>
              
              
            </ul>
          </div>

          {/* Legal & Policy Pages */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Legal & Policy Pages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className={linkClasses}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className={linkClasses}>
                  Contact-Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClasses}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className={linkClasses}>
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className={linkClasses}>
                  Terms and Conditions
                </Link>
              </li>
              
              
            </ul>
          </div>

          

          {/* Useful Links Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">USEFUL LINKS</h4>
            <ul className="space-y-2 text-sm">
              
              <li>
                <Link href="/blog/bpl-tickets/" className={linkClasses}>
                  BPL 2026 Tickets
                </Link>
              </li>
              
              <li>
                <Link href="#" className={linkClasses}>
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">SOCIALS</h4>
            <div className="space-y-2">
              {/* Large screen - text links */}
              <div className="hidden lg:block space-y-2">
                <a href="https://www.youtube.com/channel/UCsin34Ns_3LDsvyQnBv73mw" target="_blank" rel="noopener noreferrer" className={`block text-sm ${linkClasses}`}>
                  YouTube
                </a>
                <a href="https://www.facebook.com/profile.php?id=61585356341115" target="_blank" rel="noopener noreferrer" className={`block text-sm ${linkClasses}`}>
                  Facebook
                </a>
                <a href="https://x.com/bplt20league" target="_blank" rel="noopener noreferrer" className={`block text-sm ${linkClasses}`}>
                  Twitter
                </a>
                <a href="https://www.instagram.com/bplt20league/" target="_blank" rel="noopener noreferrer" className={`block text-sm ${linkClasses}`}>
                  Instagram
                </a>
               
              </div>

              {/* Small/Medium screens - icon buttons */}
              <div className="flex flex-wrap gap-3 lg:hidden">
                <a
                  href="https://www.youtube.com/channel/UCsin34Ns_3LDsvyQnBv73mw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:rotate-6" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61585356341115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:-rotate-6" />
                </a>
                <a
                  href="https://x.com/bplt20league"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:rotate-6" />
                </a>
                <a
                  href="https://www.instagram.com/bplt20league/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:-rotate-6" />
                </a>
                
              
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-5 mt-5 text-center">
          <p className="text-sm text-gray-300">© 2026 Bangladesh Premier League. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}
