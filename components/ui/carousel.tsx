"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type CarouselProps = {
  children: React.ReactNode
  className?: string
  autoPlay?: boolean
  interval?: number
}

type CarouselContextProps = {
  currentSlide: number
  totalSlides: number
  isTransitioning: boolean
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

function Carousel({ children, className, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [totalSlides, setTotalSlides] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(true)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  const goToSlide = React.useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev + 1
      if (next >= totalSlides) {
        // When reaching the end, jump to beginning without animation
        setIsTransitioning(false)
        setTimeout(() => {
          setCurrentSlide(0)
          setIsTransitioning(true)
        }, 50)
        return totalSlides - 1
      }
      return next
    })
  }, [totalSlides])

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev - 1
      if (next < 0) {
        // When going back from first, jump to end without animation
        setIsTransitioning(false)
        setTimeout(() => {
          setCurrentSlide(totalSlides - 1)
          setIsTransitioning(true)
        }, 50)
        return 0
      }
      return next
    })
  }, [totalSlides])

  // Count carousel items
  React.useEffect(() => {
    if (carouselRef.current) {
      // Use requestAnimationFrame to avoid forced reflow
      requestAnimationFrame(() => {
        if (carouselRef.current) {
          const items = carouselRef.current.querySelectorAll('[data-carousel-item]')
          setTotalSlides(items.length)
        }
      })
    }
  }, [children])

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return

    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, nextSlide, totalSlides])

  return (
    <CarouselContext.Provider
      value={{
        currentSlide,
        totalSlides,
        isTransitioning,
        goToSlide,
        nextSlide,
        prevSlide,
      }}
    >
      <div ref={carouselRef} className={cn("relative w-full", className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { currentSlide, totalSlides, isTransitioning } = useCarousel()
  const childrenArray = React.Children.toArray(children)
  
  // Create infinite loop by duplicating slides
  const extendedChildren = React.useMemo(() => {
    if (totalSlides <= 1) return childrenArray
    
    // Add first slide at the end and last slide at the beginning for seamless loop
    const firstSlide = childrenArray[0]
    const lastSlide = childrenArray[totalSlides - 1]
    
    return [lastSlide, ...childrenArray, firstSlide]
  }, [childrenArray, totalSlides])
  
  // Adjust current slide for the extended array (offset by 1)
  const adjustedSlide = currentSlide + 1
  
  return (
    <div className="overflow-hidden rounded-lg">
      <div
        className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${adjustedSlide * 100}%)` }}
      >
        {extendedChildren}
      </div>
    </div>
  )
}

function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div data-carousel-item className={cn("w-full  flex-shrink-0", className)}>{children}</div>
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { prevSlide, currentSlide } = useCarousel()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[#d4a574]/80 hover:bg-[#d4a574] shadow-lg",
        className
      )}
      onClick={prevSlide}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { nextSlide } = useCarousel()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[#d4a574]/80 hover:bg-[#d4a574] shadow-lg",
        className
      )}
      onClick={nextSlide}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

function CarouselDots({ className }: { className?: string }) {
  const { currentSlide, totalSlides, goToSlide } = useCarousel()

  if (totalSlides <= 1) return null

  return (
    <div className={cn("flex justify-center space-x-2 mt-4", className)}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            index === currentSlide ? "bg-[#d4a574]" : "bg-[#d4a574]/50"
          )}
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
}