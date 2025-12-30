"use client"
import { useEffect, useState, useRef, memo, useCallback } from "react"
import { usePathname } from "next/navigation"

// Routes that should show progress bar - Using Set for O(1) lookup
const PROGRESS_ROUTES = new Set([
  "/matches/",
  "/points-table/",
  "/news/",
  "/stats/",
  "/teams/",
  "/schedule/",
  "/bpl-venue/",
  "/blog/",
  "/contact-us/"
])

// Check if route should show progress bar
const shouldShowProgress = (pathname: string): boolean => {
  if (PROGRESS_ROUTES.has(pathname)) return true
  if (pathname.startsWith("/teams/") && pathname !== "/teams" && pathname !== "/news/" && pathname !== "/blog/") return true
  return false
}

export const ProgressBar = () => {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const progressRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isNavigatingRef = useRef(false)

  // Start progress bar on navigation - Memoized with useCallback
  const startProgress = useCallback(() => {
    // Clean up existing
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    isNavigatingRef.current = true
    setIsVisible(true)
    progressRef.current = 10
    setProgress(10)

    // Simulate progress
    intervalRef.current = setInterval(() => {
      progressRef.current = progressRef.current + Math.random() * 10
      
      if (progressRef.current > 70) {
        progressRef.current = progressRef.current + Math.random() * 2
      }
      
      if (progressRef.current >= 90) {
        progressRef.current = 90
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
      
      setProgress(progressRef.current)
    }, 80)
  }, [])

  // Complete progress bar - Memoized with useCallback
  const completeProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setProgress(100)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
      setProgress(0)
      progressRef.current = 0
      isNavigatingRef.current = false
    }, 300)
  }, [])

  // Listen for link clicks to start progress early
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      
      if (link && link.href) {
        try {
          const url = new URL(link.href)
          const path = url.pathname
          
          if (shouldShowProgress(path) && path !== pathname) {
            startProgress()
          }
        } catch (err) {
          // Invalid URL, ignore
        }
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [pathname, startProgress])

  // Handle pathname changes
  useEffect(() => {
    const showProgress = shouldShowProgress(pathname)
    
    if (!showProgress) {
      setIsVisible(false)
      setProgress(0)
      progressRef.current = 0
      isNavigatingRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    // If not already navigating, start progress
    if (!isNavigatingRef.current) {
      startProgress()
    }

    // Complete when page loads
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        setTimeout(completeProgress, 100)
      } else {
        window.addEventListener("load", completeProgress, { once: true })
        timeoutRef.current = setTimeout(completeProgress, 500)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("load", completeProgress)
      }
    }
  }, [pathname, startProgress, completeProgress])

  if (!isVisible || progress === 0) return null

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[99999] h-[3px] pointer-events-none"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        className="h-full transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: '#d4a574',
          boxShadow: '0 0 10px rgba(212, 165, 116, 0.9), 0 0 5px rgba(212, 165, 116, 0.7)',
        }}
      />
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'


