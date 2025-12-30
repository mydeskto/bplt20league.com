import type { Metadata } from "next"
import MatchCarousel from "./match_carosule"
import PointsTable from "../../points-table/components/points-table"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "BPL 2026 Live Scores & Results | Bangladesh Premier League",
  description: "View all Bangladesh Premier League matches, schedules, results, and current points table standings.",
  keywords: ["BPL live score", "Bpl Match",  "Bpl Match Today", "Bpl Today Match", "Bpl Live Match Toady" ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      }
  },
  
  alternates: {
      canonical: "https://bplt20league.com/matches"
    },

}

export default function MatchesPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Matches', href: '' }
          ]}
        />
      </div>
      <MatchCarousel />
      <PointsTable />
    </div>
  )
}