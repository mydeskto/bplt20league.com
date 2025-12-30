"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface VenueCardProps {
  name: string
  slug: string
  capacity: number
  image: string
}

export function VenueCard({ name, slug, capacity, image }: VenueCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/bpl-venue/${slug}`}>
      <div
        className="relative h-80 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform font-font-inter "
        style={{
          backgroundColor: "#0a0e27",
          transform: isHovered ? "scale(1.05) translateY(-8px)" : "scale(1)",
          boxShadow: isHovered ? "0 20px 40px rgba(18, 39, 84, 0.4)" : "0 10px 20px rgba(18, 39, 84, 0.2)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            quality={75}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div
            className="transition-all duration-300"
            style={{
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            }}
          >
            <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">{name}</h3>
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full" />
              <span>Capacity: {capacity.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        {isHovered && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            View Details
          </div>
        )}
      </div>
    </Link>
  )
}
