"use client"
import Link from "next/link"
import dynamic from "next/dynamic"
import { memo } from "react"
import { Calendar, BarChart3, TrendingUp, Users } from "lucide-react"
import { pointsData } from "@/data/points-data"

// Lazy load heavy components for better code splitting with loading states
const HeroComponent = dynamic(() => import("../Hero/home").then(mod => ({ default: mod.HeroComponent })), {
  ssr: true, // Keep SSR for SEO on hero
  loading: () => <div className="h-[30vh] md:h-[65vh] bg-slate-900 animate-pulse" />,
})

const MatchCarousel = dynamic(() => import("../matches/components/match_carosule"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
})

const PointsTableCard = dynamic(() => import("../matches/components/points-Card").then(mod => ({ default: mod.PointsTableCard })), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />,
})

const NewsPageForHome = dynamic(() => import("@/components/news"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
})

const PointsTable = dynamic(() => import("../points-table/components/points-table"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
})

export const HomeContent = () => {
  return (
    <div className="bg-[#0a0e27]">
      <HeroComponent />
      <MatchCarousel />

      {/* What Are You Looking For Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0a0e27' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            What Are You Looking For?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fixtures & Results */}
            <div className="h-20 min-h-[80px]">
              <Link
                href="/schedule"
                className="w-full rounded-lg h-12 flex items-center bg-[#d4a574] text-white justify-center transform -skew-x-12 hover:skew-x-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-6 h-6">
                    <Calendar className="w-6 h-6 text-white group-hover:text-[#0a0e27] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-white group-hover:text-[#0a0e27] transition-colors">
                      Fixtures & Results
                    </h3>
                  </div>
                </div>
              </Link>
            </div>

            {/* Points Table */}
            <div className="h-20 min-h-[80px]">
              <Link
                href="/points-table"
                className="w-full rounded-lg h-12 flex items-center bg-[#d4a574] text-white justify-center transform -skew-x-12 hover:skew-x-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8">
                    <BarChart3 className="w-8 h-8 text-white group-hover:text-[#0a0e27] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-[#0a0e27] transition-colors">
                      Points Table
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Venues */}
            <div className="h-20 min-h-[80px]">
              <Link
                href="/bpl-venue"
                className="w-full rounded-lg h-12 flex items-center bg-[#d4a574] text-white justify-center transform -skew-x-12 hover:skew-x-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8">
                    <TrendingUp className="w-8 h-8 text-white group-hover:text-[#0a0e27] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-[#0a0e27] transition-colors">
                      Venues
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* All Teams */}
            <div className="h-20 min-h-[80px]">
              <Link
                href="/teams"
                className="w-full rounded-lg h-12 flex items-center bg-[#d4a574] text-white justify-center transform -skew-x-12 hover:skew-x-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-6 h-6">
                    <Users className="w-6 h-6 text-white group-hover:text-[#0a0e27] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-[#0a0e27] transition-colors">
                      All Teams
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PointsTableCard data={pointsData} />
      <PointsTable />
      <NewsPageForHome />
    </div>
  )
}

HomeContent.displayName = 'HomeContent'

