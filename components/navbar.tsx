"use client"

import { useState, useEffect } from "react"
import { NavbarDesktop } from "./navbar-desktop"
import { NavbarMobile } from "./navbar-mobile"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Scroll effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          setIsScrolled(scrollTop > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed w-full top-0 left-0 right-0 z-50">
      <div className="w-full">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavbarDesktop isScrolled={isScrolled} />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <NavbarMobile 
            isScrolled={isScrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </div>
    </nav>
  )
}
