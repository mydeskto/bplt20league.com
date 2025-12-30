"use client"

import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"

type PropType = {
  slides: number[]
  className?: string
}

const HeroCarousel: React.FC<PropType> = ({ slides, className }) => {
  return (
    <Carousel className={className} autoPlay={true} interval={5000}>
      <CarouselContent>
        {slides.map((index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={`https://picsum.photos/1200/600?v=${index}`}
                alt={`Hero slide ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-[#d4a574]/20 rounded-lg" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}

export default HeroCarousel