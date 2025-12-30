"use client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { useState } from "react"
import { AnimatePresence, motion } from "@/lib/motion"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export const HoverEffectForTeam = ({
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
  const pathname = usePathname()

  return (
    <div className={cn("grid grid-cols-4 md:grid-cols-6 w-[90vw] gap-4 md:gap-6 justify-self-center pt-5", className)}>
      {items.map((item, idx) => {
        const isSelected = pathname === item.link || pathname.startsWith(`${item.link}/`);
        return (
          <Link
            href={item?.link}
            key={item?.link}
            className="relative group block p-3 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {(hoveredIndex === idx || isSelected) && (
                <motion.span
                  className={cn(
                    "absolute inset-0 h-[70px] w-[70px] md:h-[100px] md:w-[100px] block rounded-lg",
                    isSelected 
                      ? "bg-gradient-to-r from-[#d4a574]/20 to-[#d4a574]/20" 
                      : "bg-gradient-to-r from-[#d4a574]/20 to-[#d4a574]/20"
                  )}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className="h-[70px] w-[70px] md:h-[100px] md:w-[100px]">
              <div className="flex flex-col items-center justify-center pt-2 relative">
                {item.logo && <CardLogo src={item.logo} alt={`${item.title} logo`} />}
                {isSelected && (
                  <div className="absolute top-1 -right-3 rounded-full p-1 shadow-lg">
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5  text-green-500"
                      fill="none"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
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
        "rounded-2xl h-full w-full p-6 md:p-8 overflow-hidden bg-slate-900/80 border-2 border-green-500/30 group-hover:border-green-400 relative z-20 flex flex-col items-center justify-center text-center space-y-4 transition-all duration-300",
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
    <div className={cn("relative w-10 h-10 md:w-20 md:h-20 mb-4", className)}>
      <img src={src || "/placeholder.svg"} alt={alt} className="object-contain w-full h-full" />
    </div>
  )
}
