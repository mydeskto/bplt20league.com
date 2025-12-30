"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatedScrollingText } from "./AnimatedScrollingText"
import { motion, AnimatePresence } from "@/lib/motion"

// import pattern from '@/public/images/carousel-side-pattern.png'
import hero12 from '@/public/images/hero/hero1.avif'
import hero2 from '@/public/images/hero/hero2.avif'
import hero3 from '@/public/images/hero/hero3.avif'
import hero4 from '@/public/images/hero/hero4.avif'
import Link from "next/link"
import Image from "next/image"

const carouselData = [
  {
    id: "bpl-reg-198",
    backgroundImage: hero12,
    title: "BPL 2026 Schedule",
    subtitle: "Bangladesh Premier League Match Fixtures",
    description: "",
    buttonText: "View Schedule",
    link: "/schedule"
  },
  {
    id: "bpl-tickets-2765",
    backgroundImage: hero2,
    title: "BPL TICKETS",
    subtitle: "Get Your Tickets Now",
    description: "Don't miss the action! Secure your seats for BPL 2026",
    buttonText: "BPL 2026 Tickets",
    link: "/blog/bpl-tickets/"
  },
  {
    id: "bpl-fixtures-398765",
    backgroundImage: hero4,
    title: "BPL Points Table",
    subtitle: "Bangladesh Premier League Standings",
    description: "Updated Points Table Bangladesh Premier League 2025-26",
    buttonText: "View Standings",
    link: "/points-table"
  },
  {
    id: "bpl-fantasy-98756",
    backgroundImage: hero3,
    title: "BPL Live Score",
    subtitle: "Bangladesh Premier League Live Match Score",
    description: "",
    buttonText: "View Live Score",
    link: "/matches"
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentData = carouselData[currentSlide]

  const handlePrevious = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }, [])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }, [])


  // Calculate visible cards (current + next)
  const getVisibleCards = () => {
    const nextIndex = (currentSlide + 1) % carouselData.length
    return [
      { ...carouselData[currentSlide], position: 'current' },
      { ...carouselData[nextIndex], position: 'next' }
    ]
  }

  const visibleCards = getVisibleCards()

  // Hide server-side LCP element once component mounts
  useEffect(() => {
    const lcpElement = document.querySelector('.hero-lcp-fade')
    if (lcpElement) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        lcpElement.setAttribute('style', 'opacity: 0; pointer-events: none; transition: opacity 0.3s ease-out;')
      }, 100)
    }
  }, [])

  return (
    <div className="hero-carousel-container relative w-full h-screen overflow-hidden lora">

      {/* Background Image with Overlay - Using current slide's image */}
      <div className="hero-background absolute inset-0 w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 transition-opacity duration-300 ease-out"
          >
            <Image
              src={carouselData[currentSlide]?.backgroundImage}
              alt={`Background for ${carouselData[currentSlide]?.title}`}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              loading={currentSlide === 0 ? "eager" : "lazy"}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70 z-10" />
        {/* Pattern overlay - Updated position and style */}
        {/* <div
          className="hidden lg:block absolute top-0 bottom-0 right-0 -left-[65%]"
          style={{
            backgroundImage: `url(${typeof pattern === 'string' ? pattern : pattern.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '400px auto',
            opacity: 0.6,
            zIndex: 999,
          }}
        /> */}
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 mt-15 md:mt-0 w-full h-full flex items-center">
        <div className="w-full px-4 md:px-6">
          <div className="grid grid-cols-12 items-center h-full w-full">
            {/* Left Content - Dynamic based on current slide */}
            <div className="col-span-12 lg:col-span-6 pl-0 md:pl-8 text-white space-y-6 md:pt-16 w-full relative">
              {/* Decorative accent line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d4a574] via-[#d4a574]/50 to-transparent hidden lg:block" />
              
              <motion.h2
                className="text-xl md:text-3xl font-bold text-[#d4a574] inline-block relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="relative z-10">#BPL2026</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#d4a574]/30"></span>
              </motion.h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`slide-${currentSlide}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{
                    duration: 1,
                    staggerChildren: 0.1
                  }}
                  className="space-y-2"
                >

                  <motion.h2
                    className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  >
                    {currentData.title}
                  </motion.h2>
                  <motion.h3
                    className="text-lg md:text-2xl font-semibold leading-tight text-white/95"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                    style={{ opacity: currentSlide === 0 ? 0 : 1 }}
                  >
                    {currentData.subtitle}
                  </motion.h3>
                  <motion.p
                    className="text-base md:text-lg text-white/85 max-w-lg leading-relaxed"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  >
                    {currentData.description}
                  </motion.p>
                  {currentData.buttonText && (
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                      className="mt-4"
                    >
                      <Link 
                        href={currentData.link || "#"}
                        className="inline-block px-8 py-3 bg-[#d4a574] hover:bg-[#c49563] text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#d4a574]/20 border border-[#d4a574]/30"
                      >
                        {currentData.buttonText}
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Right Cards Section - Hidden on mobile, visible on large screens */}
            <div className="hero-preview-section hidden lg:flex lg:col-span-6 flex-col items-end space-y-4 mt-50" >
              <div className="w-full max-w-1xl relative">
                <div className="w-full overflow-hidden">
                  <div className="flex gap-3 items-center">
                    <AnimatePresence initial={false} mode="popLayout">
                      {visibleCards.map((card, index) => (
                        <motion.div
                          key={`${card.id}-${card.position}`}
                          initial={{ 
                            x: direction > 0 ? 300 : -300, 
                            opacity: 0,
                            scale: 0.8,
                            rotateY: direction > 0 ? 15 : -15
                          }}
                          animate={{ 
                            x: 0, 
                            opacity: 1,
                            scale: 1,
                            rotateY: 0
                          }}
                          exit={{ 
                            x: direction > 0 ? -300 : 300, 
                            opacity: 0,
                            scale: 0.8,
                            rotateY: direction > 0 ? -15 : 15
                          }}
                          transition={{ 
                            duration: 0.6, 
                            ease: [0.4, 0, 0.2, 1],
                            delay: index * 0.15 
                          }}
                          className="hero-preview-cards w-[280px] h-[160px] rounded-2xl overflow-hidden shadow-2xl relative group flex-shrink-0 border-2 border-white/10 hover:border-[#d4a574]/50 transition-all duration-300"
                          style={{ 
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <Image
                            src={card.backgroundImage}
                            alt={card.title}
                            className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-90 transition-all duration-500 group-hover:scale-110"
                            width={280}
                            height={160}
                            sizes="(max-width: 1024px) 0vw, 280px"
                            quality={75}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <p className="text-xs text-[#d4a574] font-bold tracking-widest mb-2 uppercase">#BPL2026</p>
                            <h4 className="text-white text-[15px] font-semibold leading-tight">{card.title}</h4>
                          </div>
                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-[#d4a574]/0 group-hover:bg-[#d4a574]/10 transition-all duration-300" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress Bar with Navigation - Updated Design */}
                <div className="flex-1 mx-4 mt-6 relative -top-3">
                  {/* Dots indicator */}
                  {/* <div className="flex gap-2  justify-start">
                    {carouselData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentSlide ? 1 : -1)
                          setCurrentSlide(index)
                        }}
                        className={`w-2 h-1 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-[#d4a574] w-3 h-1' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div> */}
                  
                  <div className="w-[70%] bg-white/10 h-1.5 justify-self-center rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#d4a574] to-[#c49563] shadow-lg shadow-[#d4a574]/30"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentSlide + 1) / carouselData.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Navigation Buttons - Updated Style */}
                  <div className="absolute -top-8 left-0 right-0 flex justify-left items-center gap-4">
                    <button
                      onClick={handlePrevious}
                      className="relative left-0 top-0 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#d4a574]/50 rounded-lg flex items-center justify-center text-[#d4a574] transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      className="relative right-0 top-0 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#d4a574]/50 rounded-lg flex items-center justify-center text-[#d4a574] transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  {/* Count Display - Updated Style */}
                  <div className="text-[#d4a574] absolute -right-2 -top-16 z-99 text-7xl font-black opacity-20">
                    {String(currentSlide + 1).padStart(2, "0")}
                  </div>
                  <div className="text-white/60 absolute -right-2 -top-8 z-99 text-sm font-semibold">
                    / {String(carouselData.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden col-span-12 flex justify-between items-center mt-8">
              {/* Mobile dots indicator */}
              <div className="flex gap-2">
                {/* {carouselData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1)
                      setCurrentSlide(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[#d4a574] w-6' 
                        : 'bg-white/30'
                    }`}
                  />
                ))} */}
              </div>
              
              {/* Mobile navigation buttons */}
              <div className="flex items-left justify-center space-x-3">
                <button
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#d4a574]/50 flex items-center justify-center text-[#d4a574] pointer-events-auto transition-all duration-300 hover:scale-110 shadow-lg"
                  onClick={handlePrevious}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#d4a574]/50 flex items-center justify-center text-[#d4a574] pointer-events-auto transition-all duration-300 hover:scale-110 shadow-lg"
                  onClick={handleNext}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Animated Scrolling Text - After the carousel */}
            <AnimatedScrollingText />
          </div>
        </div>
      </div>
    </div>
  )
}