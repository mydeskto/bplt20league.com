"use client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { useState } from "react"
import { AnimatePresence, motion } from "@/lib/motion"
import Link from "next/link"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description?: string
    link: string
    logo?: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-3 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#d4a574]/20 to-[#d4a574]/20 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { 
                    duration: 0.15,
                    ease: "easeOut"
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: { 
                    duration: 0.15, 
                    delay: 0.2,
                    ease: "easeIn"
                  },
                }}
                style={{
                  willChange: 'opacity, transform'
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <div className="flex flex-col items-center justify-center">
              {item.logo && <CardLogo src={item.logo}  alt={`${item.title} logo`} />}
            {item.description && <CardDescription>{item.description}</CardDescription>}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 md:p-8 overflow-hidden bg-slate-900/80 border border-green-500/30 group-hover:border-green-400 relative z-20 flex flex-col items-center justify-center text-center space-y-4 transition-all duration-300",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide text-xl md:text-2xl text-balance", className)}>
      {children}
    </h4>
  )
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>{children}</p>
}

export const CardLogo = ({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) => {
  return (
    <div className={cn("relative w-24 h-24 md:w-32 md:h-32 mb-4", className)}>
      <img src={src || "/placeholder.svg"} alt={alt} className="object-contain w-full h-full" />
    </div>
  )
}
