"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react"
import { motion } from "@/lib/motion"
import { matchesData } from "@/data/matches-data"
import imgae from '@/public/images/AnimatedChevronWhite.svg'
import Image from 'next/image'
import { getWindowDimensions } from '@/lib/performance-utils'
import { usePathname } from 'next/navigation'

interface Match {
  id: number
  matchId?: string // Original API _id for fetching scorecard
  matchNumber: string
  date: string
  time: string
  venue: string
  status?: string
  matchType?: string
  team1: {
    name: string
    logo: string
    score?: string
    overs?: string
  }
  team2: {
    name: string
    logo: string
    score?: string
    overs?: string
    target?: string
  }
  result?: string
  winner?: string
  keywords?: string[]
}

interface ScorecardData {
  result: {
    teams: {
      team1: {
        name: string
        shortName: string
        logo: string
      }
      team2: {
        name: string
        shortName: string
        logo: string
      }
    }
    resultLine: {
      message: string
    }
    inningsOrder: string[]
    innings: Array<{
      teamInfo: {
        teamName: string
        shortName: string
        runs: number
        wickets: number
        extras: number
        overs: string
      }
      batting: Array<{
        playerName: string
        runs: number
        ballsFaced: number
        fours: number
        sixes: number
        strikeRate: number
        isOut: boolean
        outSummary: string
      }>
      bowling: Array<{
        playerName: string
        runsConceded: number
        wickets: number
        economyRate: number
        overs: string
        maidens: number
      }>
      fallOfWickets: Array<{
        score: string
        playerName: string
        over: string
      }>
    }>
  }
}

const LoadingCard = () => (
  <div className="animate-pulse bg-[#0a0e27] rounded-xl h-48"></div>
)

const matches: Match[] = matchesData.matches

// Helper function to extract runs from score string (e.g., "145/4" -> 145)
const extractRuns = (score: string | undefined): number => {
  if (!score) return 0
  const runs = parseInt(score.split('/')[0]) || 0
  return runs
}

// Detect score changes between previous and current matches
const detectScoreChanges = (previous: Match[], current: Match[]): Array<{
  matchId: number
  team: 'team1' | 'team2'
  runsAdded: number
  previousRuns: number
  currentRuns: number
}> => {
  const changes: Array<{
    matchId: number
    team: 'team1' | 'team2'
    runsAdded: number
    previousRuns: number
    currentRuns: number
  }> = []

  current.forEach(currentMatch => {
    const previousMatch = previous.find(p => p.id === currentMatch.id)

    if (previousMatch) {
      // Check team1 score - only detect 4s and 6s for confetti
      const prevT1Runs = extractRuns(previousMatch.team1.score)
      const currT1Runs = extractRuns(currentMatch.team1.score)
      const t1RunsAdded = currT1Runs - prevT1Runs

      // Only add to changes array if it's 4 or 6 (for confetti)
      if (t1RunsAdded > 0 && (t1RunsAdded === 4 || t1RunsAdded === 6)) {
        changes.push({
          matchId: currentMatch.id,
          team: 'team1',
          runsAdded: t1RunsAdded,
          previousRuns: prevT1Runs,
          currentRuns: currT1Runs
        })
      }

      // Check team2 score - only detect 4s and 6s for confetti
      const prevT2Runs = extractRuns(previousMatch.team2.score)
      const currT2Runs = extractRuns(currentMatch.team2.score)
      const t2RunsAdded = currT2Runs - prevT2Runs

      // Only add to changes array if it's 4 or 6 (for confetti)
      if (t2RunsAdded > 0 && (t2RunsAdded === 4 || t2RunsAdded === 6)) {
        changes.push({
          matchId: currentMatch.id,
          team: 'team2',
          runsAdded: t2RunsAdded,
          previousRuns: prevT2Runs,
          currentRuns: currT2Runs
        })
      }
    }
  })

  return changes
}

export default function MatchCarousel() {
  const pathname = usePathname()

  // Check if the path includes "matches" - if yes, show matches tab, otherwise live
  const pathIncludesMatches = pathname?.includes('matches')

  // Set initial tab based on URL path
  // If path includes "matches" -> matches tab, if "live" -> live tab, otherwise -> live tab (default)
  const pathIncludesLive = pathname?.includes('live')
  const initialTab = pathIncludesMatches ? "matches" : pathIncludesLive ? "live" : "live"
  const [activeTab, setActiveTab] = useState<"matches" | "upcoming" | "live">(initialTab)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Touch and pointer drag state
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<number | null>(null)

  // State for live matches from API
  const [liveMatchesFromAPI, setLiveMatchesFromAPI] = useState<Match[]>([])
  const [previousLiveMatches, setPreviousLiveMatches] = useState<Match[]>([])
  const [isLoadingLive, setIsLoadingLive] = useState(false)
  const [liveError, setLiveError] = useState<string | null>(null)
  const [hasLoadedLiveMatches, setHasLoadedLiveMatches] = useState(false) // Track if we've received first successful API response

  // Check if interval is enabled from environment variable
  const enableInterval = process.env.NEXT_PUBLIC_ENABLE_INTERVAL === 'true'

  // Update tab when URL path changes
  useEffect(() => {
    let newTab: "matches" | "upcoming" | "live" = "live" // Default to live
    if (pathname?.includes('matches')) {
      newTab = "matches"
    } else if (pathname?.includes('live')) {
      newTab = "live"
    }
    setActiveTab(newTab)
  }, [pathname])

  // Fetch live matches from API
  useEffect(() => {
    const fetchLiveMatches = async () => {
      // Only show loading on first load, not on subsequent interval updates
      if (!hasLoadedLiveMatches) {
        setIsLoadingLive(true)
      }
      setLiveError(null)
      try {
        // Use Sportbex API URL
        const apiUrl = 'https://trial-api.sportbex.com/api/live-score/match/live'
        // const apiUrl = 'http://localhost:3001/api/matches/live'
        const apiKey = process.env.NEXT_PUBLIC_SPORTBEX_API_KEY || ''

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'sportbex-api-key': apiKey,
          },
          cache: 'default', // Always fetch fresh data for live matches
          next: { revalidate: 10 }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch live matches: ${response.status} ${response.statusText}`)
        }
        const apiResponse = await response.json()

        // Extract data array from API response
        let apiMatches = []
        if (Array.isArray(apiResponse)) {
          apiMatches = apiResponse
        } else if (apiResponse.data && Array.isArray(apiResponse.data)) {
          apiMatches = apiResponse.data
        } else if (apiResponse.matches && Array.isArray(apiResponse.matches)) {
          apiMatches = apiResponse.matches
        }

        // Filter only Bangladesh Premier League 2026 matches
        const bplMatches = apiMatches.filter((match: any) =>
          match.seriesName === "Bangladesh Premier League 2025-26"
        )

        // If no BPL matches found, don't set matches and mark as loaded
        if (bplMatches.length === 0) {
          setLiveMatchesFromAPI([])
          setHasLoadedLiveMatches(true) // Mark as loaded even if no matches
          setIsLoadingLive(false)
          return
        }

        // Map API response to Match interface format
        const mappedMatches: Match[] = bplMatches.map((match: any, index: number) => {
          // Parse score and overs from score string (e.g., "72/1 (10.0)")
          const parseScore = (scoreStr: string) => {
            if (!scoreStr || scoreStr.trim() === "") return { score: "", overs: "" }
            const match = scoreStr.match(/(\d+\/\d+)\s*\(([\d.]+)\)/)
            if (match) {
              return { score: match[1], overs: match[2] }
            }
            // If no overs, just return the score
            return { score: scoreStr.trim(), overs: "" }
          }

          const t1Score = parseScore(match.teams?.t1?.score || "")
          const t2Score = parseScore(match.teams?.t2?.score || "")

          // Calculate target if team1 has score (team2 needs to chase)
          let target = ""
          if (t1Score.score) {
            // Extract runs from team1 score (e.g., "145/4" -> 145)
            const t1Runs = parseInt(t1Score.score.split('/')[0]) || 0
            if (t1Runs > 0) {
              target = String(t1Runs + 1) // Target is runs + 1
            }
          }

          // Format date to match existing format (e.g., "Nov 18")
          const startDate = match.startDate ? new Date(match.startDate) : new Date()
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          const dateStr = `${monthNames[startDate.getMonth()]} ${startDate.getDate()}`
          const timeStr = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

          return {
            id: match._id || index + 1000, // Use API ID or generate one
            matchId: match._id || undefined, // Store original _id for scorecard API
            matchNumber: match.name || `Match ${index + 1}`,
            date: dateStr,
            time: timeStr,
            venue: match.ground || "Kirtipur",
            status: match.status === "LIVE" ? "live" : match.status?.toLowerCase() || "live",
            matchType: match.name || "",
            team1: {
              name: match.teams?.t1?.name || "",
              logo: match.teams?.t1?.logo || "",
              score: t1Score.score,
              overs: t1Score.overs
            },
            team2: {
              name: match.teams?.t2?.name || "",
              logo: match.teams?.t2?.logo || "",
              score: t2Score.score,
              overs: t2Score.overs,
              target: target
            },
            result: match.result?.message || "",
            winner: match.result?.winnerTeamKey || "",
            keywords: [
              "BPL 2026 live match",
              `${match.teams?.t1?.name || ""} vs ${match.teams?.t2?.name || ""}`,
              "BPL live score",
              "Bangladesh Premier League 2026",
              "BPL live streaming",
              "Bangladesh T20 live",
              "BPL live match updates"
            ]
          }
        })

        // Compare with previous matches to detect score changes
        const scoreChanges = detectScoreChanges(previousLiveMatches, mappedMatches)


        // Trigger confetti for 4s and 6s
        if (scoreChanges.length > 0 && typeof window !== 'undefined') {
          import('canvas-confetti').then((confettiModule) => {
            const confetti = confettiModule.default
            scoreChanges.forEach(change => {
              if (change.runsAdded === 4) {
                // Small confetti for 4
                confetti({
                  particleCount: 30,
                  spread: 45,
                  origin: { y: 0.6 },
                  colors: ['#10b981', '#3b82f6'],
                  gravity: 0.8,
                  ticks: 100
                })
              } else if (change.runsAdded === 6) {
                // Full confetti for 6
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6'],
                  gravity: 0.5,
                  ticks: 200
                })
                // Additional burst
                setTimeout(() => {
                  confetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#fbbf24', '#f59e0b', '#ef4444']
                  })
                  confetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#10b981', '#3b82f6', '#8b5cf6']
                  })
                }, 100)
              }
            })
          })
        }

        // Update previous matches BEFORE setting new matches to ensure comparison works
        // Only update previous if we have current matches (not on first load)
        if (previousLiveMatches.length === 0) {
          // First load - set both previous and current
          setPreviousLiveMatches(mappedMatches)
        }
        setLiveMatchesFromAPI(mappedMatches)
        setHasLoadedLiveMatches(true) // Mark that we've successfully loaded matches

        // Update previous matches after a short delay to allow animations to trigger
        setTimeout(() => {
          setPreviousLiveMatches(mappedMatches)
        }, 100)
      } catch (error) {
        setLiveError('Failed to load live matches')
        setLiveMatchesFromAPI([])
        // Only set loading to false if we haven't loaded matches yet
        if (!hasLoadedLiveMatches) {
          setIsLoadingLive(false)
        }
      } finally {
        // Only set loading to false on first load
        if (!hasLoadedLiveMatches) {
          setIsLoadingLive(false)
        }
      }
    }

    // Fetch live matches when live tab is active (only if interval is enabled)
    if (activeTab === "live" && enableInterval) {
      fetchLiveMatches()
      // Set up polling to refresh live matches every 5 seconds
      const interval = setInterval(fetchLiveMatches, 5000)
      return () => clearInterval(interval)
    }
  }, [activeTab, enableInterval, hasLoadedLiveMatches])

  // Filter matches based on active tab
  const completedMatches = matches.filter(m => m.status === "completed").reverse() // Reverse order to show most recent first
  // Only use API data for live matches, no fallback to dummy data
  const liveMatches = liveMatchesFromAPI
  const upcomingMatches = matches.filter(m => !m.status || (m.status !== "completed" && m.status !== "live"))
  const displayedMatches = activeTab === "matches" ? completedMatches : activeTab === "live" ? liveMatches : upcomingMatches

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  // Handle tab change and update URL
  const handleTabChange = (tab: "matches" | "upcoming" | "live") => {
    setActiveTab(tab)
  }

  const nextSlide = useCallback(() => {
    if (isAnimating || displayedMatches.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= displayedMatches.length ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, displayedMatches.length])

  const prevSlide = useCallback(() => {
    if (isAnimating || displayedMatches.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? displayedMatches.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, displayedMatches.length])


  // Calculate translateX based on screen size
  const getTranslateX = () => {
    // On large screens: each card is 50% width, so move by 50% per card
    // On small screens: each card is 100% width, so move by 100% per card
    if (typeof window !== 'undefined') {
      // Use cached window width to avoid forced reflow
      const { width } = getWindowDimensions()
      const isLargeScreen = width >= 1024
      return isLargeScreen ? -currentIndex * 50 : -currentIndex * 100
    }
    return -currentIndex * 50 // fallback for SSR
  }

  // Handle wheel events with non-passive listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default if we're actually going to handle the scroll
      const delta = e.deltaY || e.deltaX
      if (Math.abs(delta) > 10 && displayedMatches.length > 0) {
        e.preventDefault()

        if (wheelTimeoutRef.current) {
          clearTimeout(wheelTimeoutRef.current)
        }

        wheelTimeoutRef.current = setTimeout(() => {
          if (delta > 0) {
            nextSlide()
          } else {
            prevSlide()
          }
        }, 50) // Debounce wheel events
      }
    }

    const container = containerRef.current
    if (container && activeTab === "upcoming") {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [nextSlide, prevSlide, displayedMatches.length, activeTab])

  // Touch event handlers
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    if (activeTab !== "upcoming" || displayedMatches.length === 0) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (activeTab !== "upcoming" || displayedMatches.length === 0) return
    // Prevent scrolling while swiping
    if (touchStart !== null) {
      e.preventDefault()
    }
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (activeTab !== "upcoming" || displayedMatches.length === 0 || !touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Pointer (mouse drag) event handlers
  const onPointerDown = (e: React.PointerEvent) => {
    if (activeTab !== "upcoming" || displayedMatches.length === 0) return
    setIsDragging(true)
    setDragStart(e.clientX)
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (activeTab !== "upcoming" || displayedMatches.length === 0 || !isDragging || dragStart === null) return
    // Visual feedback can be added here if needed
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (activeTab !== "upcoming" || displayedMatches.length === 0 || !isDragging || dragStart === null) return

    const distance = dragStart - e.clientX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setIsDragging(false)
    setDragStart(null)
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <div className="w-full bg-[#0a0e27] py-8 relative overflow-hidden">
      {/* SEO Keywords - Hidden but crawlable for search engines */}
      {activeTab === "live" && (
        <>
          <div className="sr-only" aria-hidden="true">
            <h2>BPL Today Match Live Score - Bangladesh Premier League 2026 Live Matches</h2>
            <p>Watch BPL today live match, BPL 2026 Live Today, Bangladesh Premier League 2026 live matches, BPL live score today, BPL today live match updates, BPL live streaming today, BPL 2026 live match today, Bangladesh T20 live match today</p>
          </div>
          {/* JSON-LD Structured Data for Live Matches */}
          {liveMatches.length > 0 && (() => {
            // Parse date function to convert to ISO 8601 format
            const parseDate = (dateStr: string, timeStr: string) => {
              const monthMap: { [key: string]: string } = {
                "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
                "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
              };
              const [month, day] = dateStr.split(" ");
              const monthNum = monthMap[month] || "12";
              const dayNum = day.padStart(2, "0");
              
              // Parse time (e.g., "01:00 PM" or "12:00 PM")
              let [time, period] = timeStr.split(" ");
              const [hours, minutes] = time.split(":");
              let hour24 = parseInt(hours);
              if (period === "PM" && hour24 !== 12) hour24 += 12;
              if (period === "AM" && hour24 === 12) hour24 = 0;
              
              // BPL 2026 runs from Dec 26, 2025 to Jan 23, 2026
              const year = month === "Dec" ? "2025" : "2026";
              return `${year}-${monthNum}-${dayNum}T${hour24.toString().padStart(2, "0")}:${minutes}:00+06:00`;
            };

            // Get earliest match date for parent event
            const earliestMatch = liveMatches.reduce((earliest, current) => {
              const earliestDate = parseDate(earliest.date, earliest.time);
              const currentDate = parseDate(current.date, current.time);
              return currentDate < earliestDate ? current : earliest;
            }, liveMatches[0]);

            const parentStartDate = parseDate(earliestMatch.date, earliestMatch.time);
            // Calculate endDate (approximately 3.5 hours after start for T20 match)
            const parentEndDate = new Date(new Date(parentStartDate).getTime() + 3.5 * 60 * 60 * 1000).toISOString().replace('Z', '+06:00');

            // Pre-compute JSON to avoid runtime stringification
            const jsonLdData = {
                    "@context": "https://schema.org",
                    "@type": "SportsEvent",
                    "name": "Bangladesh Premier League 2026 Live Matches",
                    "description": "BPL 2026 Live Today, BPL today live match, Bangladesh Premier League 2026 live matches, BPL live score today",
                    "sport": "Cricket",
                    "eventStatus": "https://schema.org/EventLive",
                    "startDate": parentStartDate,
                    "endDate": parentEndDate,
                    "location": {
                      "@type": "Place",
                      "name": "Bangladesh"
                    },
                    "organizer": {
                      "@type": "Organization",
                      "name": "Bangladesh Premier League",
                      "url": "https://bplt20league.com"
                    },
                    "keywords": [
                      "BPL 2026 Live Today",
                      "BPL today live match",
                      "Bangladesh Premier League 2026 live matches",
                      "BPL live score today",
                      "BPL today live match updates",
                      "BPL live streaming today",
                      "BPL 2026 live match today",
                      "Bangladesh T20 live match today"
                    ],
                    "subEvents": liveMatches.map((match) => {

                    // Get venue address based on venue name
                    const getVenueAddress = (venue: string) => {
                      const venueMap: { [key: string]: { name: string; address: string } } = {
                        "Sylhet": {
                          name: "Sylhet International Cricket Stadium, Sylhet, Bangladesh",
                          address: "Sylhet, Airport Rd, Sylhet 3100, Bangladesh"
                        },
                        "Chattogram": {
                          name: "Zahur Ahmed Chowdhury Stadium, Chattogram, Bangladesh",
                          address: "Stadium Rd, Chattogram 4000, Bangladesh"
                        },
                        "Mirpur": {
                          name: "Shere Bangla National Stadium, Dhaka, Bangladesh",
                          address: "Mirpur, Dhaka 1216, Bangladesh"
                        },
                        "Dhaka": {
                          name: "Shere Bangla National Stadium, Dhaka, Bangladesh",
                          address: "Mirpur, Dhaka 1216, Bangladesh"
                        }
                      };
                      return venueMap[venue] || { name: venue, address: `${venue}, Bangladesh` };
                    };

                    const venueInfo = getVenueAddress(match.venue);
                    const startDate = parseDate(match.date, match.time);

                    return {
                      "@type": "SportsEvent",
                      "name": `${match.team1.name} vs ${match.team2.name}`,
                      "description": `BPL 2026 Live Today: ${match.team1.name} vs ${match.team2.name} - ${match.matchNumber}`,
                      "eventStatus": "https://schema.org/EventLive",
                      "location": {
                        "@type": "Place",
                        "name": venueInfo.name,
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": match.venue,
                          "addressCountry": "BD",
                          "streetAddress": venueInfo.address
                        }
                      },
                      "startDate": startDate,
                      "competitor": [
                        {
                          "@type": "SportsTeam",
                          "name": match.team1.name
                        },
                        {
                          "@type": "SportsTeam",
                          "name": match.team2.name
                        }
                      ]
                    };
                  })
            };
            
            // Stringify once and cache
            const jsonLdString = JSON.stringify(jsonLdData);

            return (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: jsonLdString
                }}
              />
            );
          })()}
        </>
      )}

      {/* Header Section with MATCHES title and Tabs */}
      <div className="max-w-7xl mx-auto mb-6 px-4">
        <div className="flex items-center justify-between mb-4 text-[#d4a574]">
          
          <h2 className="text-3xl font-bold text-[#d4a574]">MATCHES</h2>
          
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <Image
                key={i}
                src={imgae}
                height={20}
                width={30}
                alt=""
                className="-mt-2 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
        <h2 className="text-lg font-bold text-[#d4a574]">BPL Live Score 2026 Today Time Table</h2>


        {/* Tabs */}
        <div className="flex gap-2 border-b text-[#d4a574]/30">
          <button
            onClick={() => handleTabChange("live")}
            className={`px-6 py-2 font-semibold transition-colors ${activeTab === "live"
              ? "text-[#d4a574] border-b-2 text-[#d4a574]"
              : "text-gray-400 hover:text-[#d4a574]"
              }`}
          >
            Live
          </button>
          <button
            onClick={() => handleTabChange("matches")}
            className={`px-6 py-2 font-semibold transition-colors ${activeTab === "matches"
              ? "text-[#d4a574] border-b-2 text-[#d4a574]"
              : "text-gray-400 hover:text-[#d4a574]"
              }`}
          >
            Matches ({completedMatches.length})
          </button>
          <button
            onClick={() => handleTabChange("upcoming")}
            className={`px-6 py-2 font-semibold transition-colors ${activeTab === "upcoming"
              ? "text-[#d4a574] border-b-2 text-[#d4a574]"
              : "text-gray-400 hover:text-[#d4a574]"
              }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Conditional Rendering: Grid for Matches, Carousel for Live and Upcoming */}
      {activeTab === "matches" ? (
        /* Matches Tab - Centered Single Column Layout with Larger Cards */
        <div className="max-w-4xl mx-auto px-4">
          {displayedMatches.length > 0 ? (
            <div className="flex flex-col items-center gap-2 ">
              {displayedMatches.map(match => (
                <div key={match.id} className="w-full max-w-2xl">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No completed matches available
            </div>
          )}
        </div>
      ) : activeTab === "live" ? (
        /* Live Tab - Centered Carousel without Navigation Buttons */
        <div className="max-w-6xl mx-auto px-4">
          {/* SEO Content for Live Matches - Hidden as it's now rendered server-side for LCP optimization */}
          <div className="mb-4 text-center ">
            <h3 className="text-lg font-semibold text-white mb-2">
            BPL Live Score 2026 | Bangladesh Premier League
            </h3>
            <p className="text-sm text-gray-300 hidden">
              Watch BPL today live match, BPL 2026 Live Today, Bangladesh Premier League 2026 live matches, BPL live score today, BPL today live match updates
            </p>
            <h1 className="text-sm text-gray-300 ">BPL 2026 Live Today</h1>
          </div>

          {!enableInterval ? (
            /* Show message when interval is disabled */
            <>
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 text-[#d4a574] border-t-transparent mx-auto"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#d4a574] mb-2">Data Will Be Soon</h3>
                  <p className="text-gray-400">Please check back soon on match time.</p>
                </div>
              </div>

              <div className="mt-5 "></div>
          
            </>
          ) : liveError ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center text-red-400">
                <p>{liveError}</p>
              </div>
            </div>

          ) : displayedMatches.length > 0 ? (
            <>
              {/* Additional SEO Keywords for Live Matches */}
              <div className="sr-only" aria-hidden="true">
                <h2>BPL Today Live Match - Live Cricket Score</h2>
                <p>BPL 2026 Live Today, BPL today live match, BPL 2026 live match today, Bangladesh Premier League live matches today, BPL live streaming today, BPL live score today, BPL today live match updates, Bangladesh T20 live match today</p>
              </div>
              <div className="flex items-left gap-6">
                {displayedMatches.map(match => {
                  const previousMatch = previousLiveMatches.find(p => p.id === match.id)
                  return (
                    <>
                    <div key={match.id} className="w-full max-w-3xl">
                      <MatchCard
                        match={match}
                        previousMatch={previousMatch}
                        isLoading={false}
                      />
                    </div>
                    </>
                  )
                })}
              </div>
            </>
          ) : isLoadingLive ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 text-[#d4a574] mx-auto mb-4"></div>
                <p>Loading live matches...</p>
              </div>
            </div>
          ) : (
            /* Show same loader when no NPL matches found */
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="mb-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 text-[#d4a574] border-t-transparent mx-auto"></div>
                </div>
                <h3 className="text-xl font-semibold text-[#d4a574] mb-2">Data Will Be Soon</h3>
                <p className="text-gray-400">Please check back soon on match time.</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Upcoming Tab - Carousel with Navigation */
        <>
          {/* Navigation Buttons - Only for Upcoming */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-[65%] -translate-y-1/2 z-30 bg-[#d4a574] hover:bg-[#c49563] border-none rounded-full shadow-lg text-white w-12 h-12 transition-colors duration-300 cursor-pointer"
            onClick={prevSlide}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-[65%] -translate-y-1/2 z-30 bg-[#d4a574] hover:bg-[#c49563] border-none rounded-full shadow-lg text-white w-12 h-12 transition-colors duration-300 cursor-pointer"
            onClick={nextSlide}
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel Container - Only for Upcoming */}
          <div className="flex justify-center w-full">
            <div
              className="overflow-hidden w-[95vw] max-w-[95vw] cursor-grab active:cursor-grabbing px-4 select-none"
              ref={containerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              <motion.div
                className="flex gap-4"
                animate={{
                  x: `${getTranslateX()}%`
                }}
                transition={{
                  duration: 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {displayedMatches.length > 0 ? (
                  displayedMatches.map(match => (
                    <div
                      key={match.id}
                      className="flex-shrink-0 w-full lg:w-[calc(50%-8px)]"
                    >
                      <MatchCard match={match} />
                    </div>
                  ))
                ) : (
                  <div className="flex-shrink-0 w-full lg:w-[calc(50%-8px)] text-center text-gray-400 py-8">
                    No upcoming matches available
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function MatchCard({
  match,
  previousMatch,
  isLoading = false
}: {
  match: Match
  previousMatch?: Match
  isLoading?: boolean
}) {
  const isCompleted = match.status === "completed"
  const isLive = match.status === "live"
  const isTeam1Winner = match.winner === match.team1.name
  const isTeam2Winner = match.winner === match.team2.name

  // State to control animation visibility
  const [animationKey, setAnimationKey] = useState(0)
  const [showTeam1Animation, setShowTeam1Animation] = useState(false)
  const [showTeam2Animation, setShowTeam2Animation] = useState(false)
  const [team1RunsAdded, setTeam1RunsAdded] = useState<number | null>(null)
  const [team2RunsAdded, setTeam2RunsAdded] = useState<number | null>(null)
  const [showBigSix, setShowBigSix] = useState(false)
  const [showBigFour, setShowBigFour] = useState(false)

  // Scorecard state
  const [scorecardData, setScorecardData] = useState<ScorecardData | null>(null)
  const [isLoadingScorecard, setIsLoadingScorecard] = useState(false)
  const [expandedInnings, setExpandedInnings] = useState<Set<number>>(new Set())

  // Use refs to track last scores to avoid dependency issues
  const lastTeam1ScoreRef = useRef<string | undefined>(undefined)
  const lastTeam2ScoreRef = useRef<string | undefined>(undefined)

  // Fetch scorecard data
  const fetchScorecard = async (matchId: string, isAutoRefresh = false) => {
    if (!matchId) return

    if (!isAutoRefresh) {
      setIsLoadingScorecard(true)
    }

    try {
      // Use local API for scorecard (matching live matches API)
      // const apiUrl = `http://localhost:3001/api/match/${matchId}/scorecard`
      const apiUrl = `https://trial-api.sportbex.com/api/live-score/match/${matchId}/scorecard`
      const apiKey = process.env.NEXT_PUBLIC_SPORTBEX_API_KEY || 'kOsM00FcIqSq8SwGeArjrGfa9oAheAa5dV5ezmTp'

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'sportbex-api-key': apiKey,
        },
        cache: 'default',
        next: { revalidate: 10 }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch scorecard: ${response.status}`)
      }

      const apiResponse = await response.json()

      if (apiResponse.data && apiResponse.data.length > 0) {
        setScorecardData(apiResponse.data[0])
        // Auto-expand all innings when data loads
        if (!isAutoRefresh && apiResponse.data[0].result?.innings) {
          const inningsCount = apiResponse.data[0].result.innings.length
          const allInningsIndices = new Set<number>()
          for (let i = 0; i < inningsCount; i++) {
            allInningsIndices.add(i)
          }
          setExpandedInnings(allInningsIndices)
        }
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      if (!isAutoRefresh) {
        setIsLoadingScorecard(false)
      }
    }
  }

  // Auto-fetch scorecard when match has matchId (for both live and completed)
  useEffect(() => {
    if (match.matchId && (isLive || isCompleted)) {
      // Initial fetch
      fetchScorecard(match.matchId, false)

      // Auto-refresh for live matches only
      if (isLive) {
        const interval = setInterval(() => {
          fetchScorecard(match.matchId!, true)
        }, 10000) // Refresh every 10 seconds for live matches

        return () => clearInterval(interval)
      }
    }
  }, [match.matchId, isLive, isCompleted])

  // Toggle innings expansion
  const toggleInnings = (index: number) => {
    setExpandedInnings(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Calculate score changes and trigger animations
  useEffect(() => {
    if (!isLive) {
      // Reset scores when not live
      lastTeam1ScoreRef.current = undefined
      lastTeam2ScoreRef.current = undefined
      return
    }

    // Get current scores
    const currT1Score = match.team1.score
    const currT2Score = match.team2.score
    const timers: NodeJS.Timeout[] = []

    // Check Team 1 score change
    if (lastTeam1ScoreRef.current !== undefined && currT1Score && lastTeam1ScoreRef.current !== currT1Score) {
      const prevRuns = extractRuns(lastTeam1ScoreRef.current)
      const currRuns = extractRuns(currT1Score)
      const runsAdded = currRuns - prevRuns

      if (runsAdded > 0) {
        setTeam1RunsAdded(runsAdded)
        setShowTeam1Animation(true)
        setAnimationKey(prev => prev + 1)
        const timer1 = setTimeout(() => {
          setShowTeam1Animation(false)
          setTeam1RunsAdded(null)
        }, 2000)
        timers.push(timer1)

        // Trigger confetti for 4s and 6s
        if (runsAdded === 4 || runsAdded === 6) {
          if (typeof window !== 'undefined') {
            import('canvas-confetti').then((confettiModule) => {
              const confetti = confettiModule.default
              if (runsAdded === 4) {
                // Increased confetti for 4
                // Show big "4" animation
                setShowBigFour(true)
                setTimeout(() => {
                  setShowBigFour(false)
                }, 2500)
                confetti({
                  particleCount: 60,
                  spread: 60,
                  origin: { y: 0.6 },
                  colors: ['#10b981', '#3b82f6', '#22d3ee', '#06b6d4'],
                  gravity: 0.7,
                  ticks: 150,
                  scalar: 1.1
                })
                // Additional small burst
                setTimeout(() => {
                  confetti({
                    particleCount: 30,
                    spread: 50,
                    origin: { y: 0.5 },
                    colors: ['#10b981', '#3b82f6'],
                    gravity: 0.8,
                    ticks: 120
                  })
                }, 150)
              } else if (runsAdded === 6) {
                // BIG and impressive confetti for 6
                // Show big "6" animation
                setShowBigSix(true)
                setTimeout(() => {
                  setShowBigSix(false)
                }, 3000)
                // Main massive burst
                confetti({
                  particleCount: 200,
                  spread: 90,
                  origin: { y: 0.6 },
                  colors: ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'],
                  gravity: 0.4,
                  ticks: 300,
                  scalar: 1.3,
                  startVelocity: 45
                })
                // Multiple bursts from different angles
                setTimeout(() => {
                  // Left burst
                  confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0 },
                    colors: ['#fbbf24', '#f59e0b', '#ef4444', '#f97316'],
                    gravity: 0.3,
                    ticks: 250,
                    scalar: 1.2
                  })
                  // Right burst
                  confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1 },
                    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#22d3ee'],
                    gravity: 0.3,
                    ticks: 250,
                    scalar: 1.2
                  })
                  // Center top burst
                  confetti({
                    particleCount: 80,
                    angle: 90,
                    spread: 60,
                    origin: { x: 0.5, y: 0 },
                    colors: ['#ec4899', '#f472b6', '#fbbf24', '#8b5cf6'],
                    gravity: 0.5,
                    ticks: 200,
                    scalar: 1.1
                  })
                }, 100)
                // Final massive burst after delay
                setTimeout(() => {
                  confetti({
                    particleCount: 150,
                    spread: 360,
                    origin: { x: 0.5, y: 0.5 },
                    colors: ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
                    gravity: 0.6,
                    ticks: 250,
                    scalar: 1.2,
                    startVelocity: 30
                  })
                }, 300)
              }
            }).catch(() => {
              // Silently handle confetti loading errors
            })
          }
        }

        // Update last score after animation triggers
        const timer2 = setTimeout(() => {
          lastTeam1ScoreRef.current = currT1Score
        }, 50)
        timers.push(timer2)
      } else {
        // Score changed but not increased - just update
        lastTeam1ScoreRef.current = currT1Score
      }
    } else if (currT1Score && lastTeam1ScoreRef.current === undefined) {
      // First time - just set the score
      lastTeam1ScoreRef.current = currT1Score
    }

    // Check Team 2 score change
    if (lastTeam2ScoreRef.current !== undefined && currT2Score && lastTeam2ScoreRef.current !== currT2Score) {
      const prevRuns = extractRuns(lastTeam2ScoreRef.current)
      const currRuns = extractRuns(currT2Score)
      const runsAdded = currRuns - prevRuns

      if (runsAdded > 0) {
        setTeam2RunsAdded(runsAdded)
        setShowTeam2Animation(true)
        setAnimationKey(prev => prev + 1)
        const timer1 = setTimeout(() => {
          setShowTeam2Animation(false)
          setTeam2RunsAdded(null)
        }, 2000)
        timers.push(timer1)

        // Trigger confetti for 4s and 6s
        if (runsAdded === 4 || runsAdded === 6) {
          if (typeof window !== 'undefined') {
            import('canvas-confetti').then((confettiModule) => {
              const confetti = confettiModule.default
              if (runsAdded === 4) {
                // Increased confetti for 4
                // Show big "4" animation
                setShowBigFour(true)
                setTimeout(() => {
                  setShowBigFour(false)
                }, 2500)
                confetti({
                  particleCount: 60,
                  spread: 60,
                  origin: { y: 0.6 },
                  colors: ['#10b981', '#3b82f6', '#22d3ee', '#06b6d4'],
                  gravity: 0.7,
                  ticks: 150,
                  scalar: 1.1
                })
                // Additional small burst
                setTimeout(() => {
                  confetti({
                    particleCount: 30,
                    spread: 50,
                    origin: { y: 0.5 },
                    colors: ['#10b981', '#3b82f6'],
                    gravity: 0.8,
                    ticks: 120
                  })
                }, 150)
              } else if (runsAdded === 6) {
                // BIG and impressive confetti for 6
                // Show big "6" animation
                setShowBigSix(true)
                setTimeout(() => {
                  setShowBigSix(false)
                }, 3000)
                // Main massive burst
                confetti({
                  particleCount: 200,
                  spread: 90,
                  origin: { y: 0.6 },
                  colors: ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'],
                  gravity: 0.4,
                  ticks: 300,
                  scalar: 1.3,
                  startVelocity: 45
                })
                // Multiple bursts from different angles
                setTimeout(() => {
                  // Left burst
                  confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0 },
                    colors: ['#fbbf24', '#f59e0b', '#ef4444', '#f97316'],
                    gravity: 0.3,
                    ticks: 250,
                    scalar: 1.2
                  })
                  // Right burst
                  confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1 },
                    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#22d3ee'],
                    gravity: 0.3,
                    ticks: 250,
                    scalar: 1.2
                  })
                  // Center top burst
                  confetti({
                    particleCount: 80,
                    angle: 90,
                    spread: 60,
                    origin: { x: 0.5, y: 0 },
                    colors: ['#ec4899', '#f472b6', '#fbbf24', '#8b5cf6'],
                    gravity: 0.5,
                    ticks: 200,
                    scalar: 1.1
                  })
                }, 100)
                // Final massive burst after delay
                setTimeout(() => {
                  confetti({
                    particleCount: 150,
                    spread: 360,
                    origin: { x: 0.5, y: 0.5 },
                    colors: ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
                    gravity: 0.6,
                    ticks: 250,
                    scalar: 1.2,
                    startVelocity: 30
                  })
                }, 300)
              }
            }).catch(() => {
              // Silently handle confetti loading errors
            })
          }
        }

        // Update last score after animation triggers
        const timer2 = setTimeout(() => {
          lastTeam2ScoreRef.current = currT2Score
        }, 50)
        timers.push(timer2)
      } else {
        // Score changed but not increased - just update
        lastTeam2ScoreRef.current = currT2Score
      }
    } else if (currT2Score && lastTeam2ScoreRef.current === undefined) {
      // First time - just set the score
      lastTeam2ScoreRef.current = currT2Score
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [match.team1.score, match.team2.score, isLive])

  // Calculate score changes for display
  const getScoreChange = (team: 'team1' | 'team2') => {
    if (!isLive) return null

    const lastScore = team === 'team1' ? lastTeam1ScoreRef.current : lastTeam2ScoreRef.current
    const currScore = match[team].score

    if (!lastScore || !currScore) return null

    const prevRuns = extractRuns(lastScore)
    const currRuns = extractRuns(currScore)
    const runsAdded = currRuns - prevRuns

    if (runsAdded > 0) {
      return {
        runsAdded,
        previousRuns: prevRuns,
        currentRuns: currRuns
      }
    }
    return null
  }

  const team1Change = getScoreChange('team1')
  const team2Change = getScoreChange('team2')

  return (
    <>
      {/* Big "4" Animation Overlay */}
      {showBigFour && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{
              opacity: 1,
              scale: [0.5, 1.1, 1],
              y: 0
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              times: [0, 0.7, 1]
            }}
            className="relative"
          >
            {/* Glow effect behind - Blue/Green theme */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 opacity-50 animate-pulse"
              style={{ transform: 'scale(1.3)' }} />

            {/* Main "4" text */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                textShadow: [
                  "0 0 15px rgba(59, 130, 246, 0.7)",
                  "0 0 30px rgba(59, 130, 246, 1)",
                  "0 0 15px rgba(59, 130, 246, 0.7)"
                ]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative text-[180px] md:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500"
              style={{
                WebkitTextStroke: "3px #3b82f6",
                filter: "drop-shadow(0 0 25px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 50px rgba(59, 130, 246, 0.5))"
              }}
            >
              4
            </motion.div>

            {/* "FOUR" text below */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-3xl md:text-5xl font-bold text-[#d4a574] tracking-wider"
              style={{
                textShadow: "0 0 15px rgba(34, 211, 238, 0.7), 0 0 30px rgba(34, 211, 238, 0.5)"
              }}
            >
              FOUR
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Big "6" Animation Overlay */}
      {showBigSix && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
            animate={{
              opacity: 1,
              scale: [0.3, 1.2, 1],
              rotate: [180, 0, 0]
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              times: [0, 0.6, 1]
            }}
            className="relative"
          >
            {/* Glow effect behind */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-60 animate-pulse"
              style={{ transform: 'scale(1.5)' }} />

            {/* Main "6" text */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.8)",
                  "0 0 40px rgba(251, 191, 36, 1)",
                  "0 0 20px rgba(251, 191, 36, 0.8)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative text-[200px] md:text-[300px] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
              style={{
                WebkitTextStroke: "4px #fbbf24",
                filter: "drop-shadow(0 0 30px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 60px rgba(251, 191, 36, 0.6))"
              }}
            >
              6
            </motion.div>

            {/* "SIX" text below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl font-bold text-[#d4a574] tracking-wider"
              style={{
                textShadow: "0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.6)"
              }}
            >
              SIX
            </motion.div>
          </motion.div>
        </div>
      )}

      <Card
        className="bg-[#0a0e27] text-[#d4a574]/30 border rounded-xl  text-white overflow-hidden shadow-xl relative transition-shadow duration-300 hover:shadow-2xl"
        itemScope
        itemType={isLive ? "https://schema.org/SportsEvent" : undefined}
      >
        {/* SEO Keywords for individual live matches */}
        {isLive && (() => {
          // Parse date function to convert to ISO 8601 format
          const parseDate = (dateStr: string, timeStr: string) => {
            const monthMap: { [key: string]: string } = {
              "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
              "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
            };
            const [month, day] = dateStr.split(" ");
            const monthNum = monthMap[month] || "12";
            const dayNum = day.padStart(2, "0");
            
            // Parse time (e.g., "01:00 PM" or "12:00 PM")
            let [time, period] = timeStr.split(" ");
            const [hours, minutes] = time.split(":");
            let hour24 = parseInt(hours);
            if (period === "PM" && hour24 !== 12) hour24 += 12;
            if (period === "AM" && hour24 === 12) hour24 = 0;
            
            // BPL 2026 runs from Dec 26, 2025 to Jan 23, 2026
            const year = month === "Dec" ? "2025" : "2026";
            return `${year}-${monthNum}-${dayNum}T${hour24.toString().padStart(2, "0")}:${minutes}:00+06:00`;
          };

          const startDateISO = parseDate(match.date, match.time);

          return (
            <div className="sr-only" aria-hidden="true">
              <span itemProp="name">{match.team1.name} vs {match.team2.name} - BPL 2026 Live Today</span>
              <span itemProp="description">BPL today live match: {match.team1.name} vs {match.team2.name}, BPL 2026 Live Today, BPL 2026 live match today, Bangladesh Premier League live matches today</span>
              <span itemProp="keywords">BPL 2026 Live Today, BPL today live match, BPL 2026 live match today, Bangladesh Premier League live matches today, BPL live streaming today</span>
              <time itemProp="startDate" dateTime={startDateISO}>{match.date} {match.time}</time>
              <div itemProp="location" itemScope itemType="https://schema.org/Place">
                <span itemProp="name">{match.venue}</span>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">{match.venue}</span>
                  <span itemProp="addressCountry">BD</span>
                </div>
              </div>
            </div>
          );
        })()}
        {/* Remove loader for live matches - card will show once data is loaded */}
        {isLoading && !isLive ? (
          /* Show only loader when loading (not for live matches) */
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 text-[#d4a574] border-t-transparent"></div>
          </div>
        ) : (

          <>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="text-xs text-white font-medium">
                  {match.matchNumber}
                  {match.matchType && <span className="ml-1 text-gray-400">• {match.matchType}</span>}
                </div>
                <div className={`text-xs text-white px-2 py-1 rounded-full font-medium shadow-lg ${isCompleted
                  ? "bg-gradient-to-r from-[#d4a574] to-[#c49563]"
                  : isLive
                    ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                    : "bg-gradient-to-r from-[#d4a574] to-[#c49563]"
                  }`}>
                  {isCompleted ? "RESULT" : isLive ? "LIVE" : "Upcoming"}
                </div>
              </div>

              {/* Result - Top Center (only for completed matches) */}
              {isCompleted && match.result && (
                <div className="mb-3 p-2 bg-cyan-500/10 border text-[#d4a574]/30 rounded-lg">
                  <div className="text-xs font-semibold text-[#d4a574] text-center">
                    {match.result}
                  </div>
                </div>
              )}

              {/* Live Status - Top Center (only for live matches) */}
              {isLive && (
                <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="text-xs font-semibold text-red-400 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                </div>
              )}

              {/* Teams Side by Side - Original Design */}
              <div className="flex items-center justify-between mb-3">
                {/* Team 1 */}
                <div className={`flex items-center space-x-2 flex-1 ${isCompleted && isTeam1Winner ? "opacity-100" : ""}`}>
                  <div className="w-10 h-10">
                    <Image
                      src={match.team1.logo || "/placeholder.svg"}
                      alt={match.team1.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                  <div className="relative">
                    <div className="text-xs font-medium text-white">{match.team1.name}</div>
                    {(isCompleted || isLive) && match.team1.score && (
                      <div className="text-xs text-gray-300 relative">
                        {match.team1.score} {match.team1.overs && `(${match.team1.overs} ov)`}
                        {showTeam1Animation && team1RunsAdded !== null && (
                          <motion.div
                            key={`team1-${animationKey}`}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.8 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute -top-8 left-0 text-[#d4a574] font-bold text-base flex items-center gap-1 z-50 whitespace-nowrap drop-shadow-lg"
                          >
                            <span className="text-xl animate-pulse">+{team1RunsAdded}</span>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* VS */}
                <div className="px-3">
                  <div className="text-sm font-bold text-[#d4a574]">VS</div>
                </div>

                {/* Team 2 */}
                <div className={`flex items-center space-x-2 flex-1 justify-end ${isCompleted && isTeam2Winner ? "opacity-100" : ""}`}>
                  <div className="relative">
                    <div className="text-xs font-medium text-white text-right">{match.team2.name}</div>
                    {(isCompleted || isLive) && match.team2.score && (
                      <div className="text-xs text-gray-300 text-right relative">
                        {match.team2.target && match.team2.overs ? `(${match.team2.overs}/20 ov, T:${match.team2.target}) ` : ''}
                        {match.team2.score}
                        {showTeam2Animation && team2RunsAdded !== null && (
                          <motion.div
                            key={`team2-${animationKey}`}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.8 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute -top-8 right-0 text-[#d4a574] font-bold text-base flex items-center gap-1 z-50 whitespace-nowrap drop-shadow-lg"
                          >
                            <span className="text-xl animate-pulse">+{team2RunsAdded}</span>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10">
                    <Image
                      src={match.team2.logo || "/placeholder.svg"}
                      alt={match.team2.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{match.time}</span>
                </div>
                <div className="text-center">
                  {isLive && (() => {
                    const parseDate = (dateStr: string, timeStr: string) => {
                      const monthMap: { [key: string]: string } = {
                        "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
                        "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
                      };
                      const [month, day] = dateStr.split(" ");
                      const monthNum = monthMap[month] || "12";
                      const dayNum = day.padStart(2, "0");
                      let [time, period] = timeStr.split(" ");
                      const [hours, minutes] = time.split(":");
                      let hour24 = parseInt(hours);
                      if (period === "PM" && hour24 !== 12) hour24 += 12;
                      if (period === "AM" && hour24 === 12) hour24 = 0;
                      const year = month === "Dec" ? "2025" : "2026";
                      return `${year}-${monthNum}-${dayNum}T${hour24.toString().padStart(2, "0")}:${minutes}:00+06:00`;
                    };
                    return <time itemProp="startDate" dateTime={parseDate(match.date, match.time)} className="text-[#d4a574] font-medium">{match.date}</time>;
                  })()}
                  {!isLive && <div className="text-[#d4a574] font-medium">{match.date}</div>}
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">Venue</span>
                </div>
              </div>

              {/* Venue - Bottom Center */}
              {isLive ? (
                <div itemProp="location" itemScope itemType="https://schema.org/Place" className="text-xs text-gray-400 text-center mb-3">
                  <span itemProp="name">{match.venue}</span>
                  <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="sr-only">
                    <span itemProp="addressLocality">{match.venue}</span>
                    <span itemProp="addressCountry">BD</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-400 text-center mb-3">
                  {match.venue}
                </div>
              )}


            </CardContent>



          </>

        )}
      </Card>
      
      {/* Scorecard Display - Always visible for matches with matchId */}
      {(isLive || isCompleted) && match.matchId && (
        <div className="mt-10 pt-4 border-t border-gray-700">
          {isLoadingScorecard ? (
            <div className="flex items-start py-8">
              <div className="text-left">
                <div className={`animate-spin rounded-full h-8 w-8 border-2 border-t-transparent mb-3 ${isLive ? "border-red-400" : "text-[#d4a574]"
                  }`}></div>
                <p className="text-sm text-gray-400">Loading scorecard...</p>
              </div>
            </div>
          ) : scorecardData ? (
            <div className="space-y-4">
              {/* Live Match Indicator */}
              {isLive && (
                <div className="text-xs text-left text-red-400 font-semibold animate-pulse mb-2">
                  🔴 LIVE - Auto-refreshing every 10 seconds
                </div>
              )}
              <h2 className="text-lg font-bold text-[#d4a574] mb-4">BPL Scorecard 2026</h2>

              {/* Result Summary */}
              {scorecardData.result.resultLine.message && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="text-sm font-semibold text-[#d4a574] text-left">
                    {scorecardData.result.resultLine.message}
                  </div>
                </div>
              )}

              {/* Innings List - All Expanded by Default */}
              {scorecardData.result.innings.map((innings, index) => (
                <div key={index} className="border border-gray-700 rounded-lg overflow-hidden mb-4">
                  {/* Innings Header - Professional Style */}
                  <div className="w-full p-4 bg-gradient-to-r from-gray-800/60 to-gray-800/40 border-b border-gray-700">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="text-base font-bold text-white">
                          {innings.teamInfo.teamName}
                        </div>
                        <div className="text-sm text-gray-300 font-semibold">
                          {innings.teamInfo.runs}/{innings.teamInfo.wickets}
                        </div>
                        <div className="text-xs text-gray-400">
                          ({innings.teamInfo.overs} ov)
                        </div>
                        {innings.teamInfo.extras > 0 && (
                          <div className="text-xs text-[#d4a574] font-medium">
                            Extras: {innings.teamInfo.extras}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggleInnings(index)}
                        className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg transition-colors"
                      >
                        <ChevronRight
                          className={`h-4 w-4 text-gray-400 transition-transform ${expandedInnings.has(index) ? 'rotate-90' : ''
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Innings Details */}
                  {expandedInnings.has(index) && (
                    <div className="p-5 bg-gray-900/40 space-y-5">
                      {/* Batting Stats - Professional Table */}
                      <div>
                        <div className="text-sm font-bold text-[#d4a574] mb-3 uppercase tracking-wide">Batting</div>
                        <div className="overflow-x-auto rounded-lg border border-gray-700">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-800/70 border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Batter</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">R</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">B</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">4s</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">6s</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">SR</th>
                              </tr>
                            </thead>
                            <tbody>
                              {innings.batting.map((batter, idx) => (
                                <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <span className="text-white font-medium">{batter.playerName}</span>
                                      {!batter.isOut && (
                                        <span className="text-[#d4a574] text-xs font-bold">●</span>
                                      )}
                                      {batter.isOut && (
                                        <span className="text-red-400 text-xs">✗</span>
                                      )}
                                    </div>
                                    {batter.isOut && batter.outSummary && (
                                      <div className="text-xs text-gray-500 mt-1 italic">
                                        {batter.outSummary}
                                      </div>
                                    )}
                                  </td>
                                  <td className="text-right py-3 px-4">
                                    <span className="text-white font-bold">{batter.runs}</span>
                                  </td>
                                  <td className="text-right py-3 px-4 text-gray-300">{batter.ballsFaced}</td>
                                  <td className="text-right py-3 px-4 text-gray-300">{batter.fours}</td>
                                  <td className="text-right py-3 px-4 text-gray-300">{batter.sixes}</td>
                                  <td className="text-right py-3 px-4 text-gray-300">{batter.strikeRate.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Bowling Stats - Professional Table */}
                      <div>
                        <div className="text-sm font-bold text-[#d4a574] mb-3 uppercase tracking-wide">Bowling</div>
                        <div className="overflow-x-auto rounded-lg border border-gray-700">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-800/70 border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Bowler</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">O</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">M</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">R</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">W</th>
                                <th className="text-right py-3 px-4 text-gray-300 font-semibold">Econ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {innings.bowling.map((bowler, idx) => (
                                <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                  <td className="py-3 px-4 text-white font-medium">{bowler.playerName}</td>
                                  <td className="text-right py-3 px-4 text-gray-300">{bowler.overs}</td>
                                  <td className="text-right py-3 px-4 text-gray-300">{bowler.maidens}</td>
                                  <td className="text-right py-3 px-4 text-gray-300">{bowler.runsConceded}</td>
                                  <td className="text-right py-3 px-4">
                                    <span className="text-white font-bold">{bowler.wickets}</span>
                                  </td>
                                  <td className="text-right py-3 px-4 text-gray-300">{bowler.economyRate.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Fall of Wickets - Professional Display */}
                      {innings.fallOfWickets.length > 0 && (
                        <div>
                          <div className="text-sm font-bold text-[#d4a574] mb-3 uppercase tracking-wide">Fall of Wickets</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {innings.fallOfWickets.map((wicket, idx) => (
                              <div
                                key={idx}
                                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-[#d4a574] font-bold text-sm">{wicket.score}</span>
                                  <span className="text-gray-400">-</span>
                                  <span className="text-white text-sm flex-1">{wicket.playerName}</span>
                                  <span className="text-gray-500 text-xs">({wicket.over})</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-left py-6 text-gray-500 text-sm">
              No scorecard data available
            </div>
          )}
        </div>
      )}
    </>
  )
}