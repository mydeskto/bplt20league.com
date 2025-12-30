"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TeamData {
  position: number
  team: string
  logo: string
  matches: number
  won: number
  loss: number
  noResult: number
  netRunRate: string
  points: number
}

interface PointsTableProps {
  data: TeamData[]
}

export function PointsTableCard({ data }: PointsTableProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 320
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
    setScrollPosition(newPosition)
  }

  const getRecentFormColor = (result: string) => {
    if (result === "W") return "bg-green-100 text-green-700 border-green-300"
    if (result === "L") return "bg-red-100 text-red-700 border-red-300"
    return "bg-gray-100 text-gray-700 border-gray-300"
  }

  return (
    <div className="w-full  px-4 md:px-8 font-inter tracking-wider" style={{ backgroundColor: "#0a0e27" }}>
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 ">
          <div>
            <h2 className="text-xl md:text-4xl font-bold text-[#d4a574] mb-2">BPL 2026 Team Standing & Statistics</h2>
            {/* <p className=" text text-white pl-4">NPL Team standing & Statistics</p> */}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full cursor-pointer hover:bg-opacity-80"
              style={{ borderColor: "white", backgroundColor: "transparent" }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#d4a574]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full cursor-pointer hover:bg-opacity-80"
              style={{ borderColor: "white", backgroundColor: "transparent" }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#d4a574]" />
            </Button>
            
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
          style={{ scrollBehavior: "smooth" }}
        >
          {data.map((team) => (
            <div
              key={team.position}
              className="flex-shrink-0 w-70 rounded-md border-2 !border-[#0a0e27] shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
              style={{ backgroundColor: "#0a0e27", borderColor: "white" }}
            >
              {/* Card Header with Rank */}
              <div className="p-6 " style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl font-black text-[#0a0e27] leading-none">{team.position}</div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold  text-gray-300 leading-tight">{team.team}</h3>
                  </div>
                </div>

                {/* Team Logo */}
                <div className="flex justify-center py-4">
                  <div
                    className="w-24 h-24 rounded-full border-4 flex items-center justify-center overflow-hidden"
                    style={{ borderColor: "white", backgroundColor: "#0a0e27" }}
                  >
                    <img src={team.logo || "/placeholder.svg"} alt={team.team} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="w-[90%] h-[1px] justify-self-center bg-white"/>

              {/* Stats Section */}
              <div className="px-6 py-4 " style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">{team.points}</div>
                    <div className="text-xs text-gray-300 font-medium">Points</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{team.matches}</div>
                    <div className="text-xs text-gray-300 font-medium">Played</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{team.won}</div>
                    <div className="text-xs text-gray-300 font-medium">Won</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#d4a574]">{team.netRunRate}</div>
                    <div className="text-xs text-gray-300 font-medium">NRR</div>
                  </div>
                </div>
              </div>

              {/* Recent Form Section */}
              <div className="px-6 py-4">
                <h4 className="text-sm font-bold tracking-wider text-white mb-3">Recent form</h4>
                <div className="flex gap-2">
                  {["W", "L", "W", "W", "W"].map((result, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${getRecentFormColor(result)}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        

        <Link href='/points-table' className="relative mt-6 px-6 py-3 w-60 h-8 cursor-pointer font-bold transform -skew-x-12 bg-[#0a0e27] hover:scale-105 justify-self-center z-90 text-white transition-all duration-300 flex items-center gap-2  active:scale-95">
            <span className="font-manrope">FULL POINT TABLE</span>
            <span>↗</span>
        </Link>
        <div className=" relative -top-10 left-2  px-6 border-t-2 border-r-2  w-60 border-white   transform -skew-x-12  z-20 justify-self-center"></div>

        
      </div>
    </div>
  )
}
