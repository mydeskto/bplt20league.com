import { HoverEffect } from "@/components/card-hover-effect-demo"
import { HeroSection } from "@/components/hero-section"
import { pointsData } from "@/data/points-data"
import { Metadata } from "next"
import { Breadcrumb } from "@/components/breadcrumb"
import Link from "next/link"



export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "BPL 2026 Squads: Full Player Lists for All Six Teams After Auction",
    description: "Get the full BPL 2026 squads for all six teams after the Bangladesh Premier League auction. View complete player lists, roles, country details, and overseas stars.",
    keywords: ["BPL 2026 all team list", "BPL 2026 all team Squad, players list", "BPL 2026 all team players list", "BPL 2026 squads", "BPL 2026 team players list"],
    robots: {
      index: true, // This will override the root layout robots for this route only
      follow: true
    }
    , alternates: {
      canonical: 'https://bplt20league.com/teams',
    }
  }
}

export default function TeamsPage() {
  const hoverItems = pointsData.map((team) => ({
    title: team.team,
    logo: team.logo,
    link: `/teams/${encodeURIComponent(team.team.toLowerCase().replace(/\s+/g, "-"))}`,
  }))


  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bplt20league.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Teams",
        item: "https://bplt20league.com/teams"
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://bplt20league.com/teams#teamlist",
            "name": "BPL 2026 Teams - Full Squad List, Captains & Players",
            "description": "Explore all BPL 2026 teams with full squad lists, captains, key players, and stats. Get the latest updates on every Bangladesh Premier League T20 team.",
            "url": "https://bplt20league.com/teams",
            "itemListOrder": "https://schema.org/ItemListOrderAscending",
            "itemListElement": pointsData.map((team, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SportsTeam",
                "@id": `https://bplt20league.com/teams/${encodeURIComponent(team.team.toLowerCase().replace(/\s+/g, "-"))}#team`,
                "name": team.team,
                "description": `${team.team} - Bangladesh Premier League 2026 Squad`,
                "url": `https://bplt20league.com/teams/${encodeURIComponent(team.team.toLowerCase().replace(/\s+/g, "-"))}`,
                "memberOf": {
                  "@type": "SportsLeague",
                  "@id": "https://bplt20league.com/#sportsleague",
                  "name": "Bangladesh Premier League"
                }
              }
            }))
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <HeroSection title="Teams" />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-4 relative z-10">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Teams', href: '/teams' }
            ]}
          />
        </div>

        {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%)] animate-shimmer"></div>
      </div> */}

        <div className="container mx-auto px-4 py-8 relative z-10">
          <p className="text-gray-400 text-sm">The Bangladesh Premier League 2026 squads are now finalized after the official BPL auction. This page provides the complete and updated player lists for all six teams, including local stars, overseas players, and squad roles. Each team’s squad is verified and presented in a clean format, making it easy to check confirmed players, team combinations, and final selections for the <Link href="/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL 2026</Link> season.</p>
          <div className="max-w-7xl mx-auto">
            <HoverEffect items={hoverItems} />
          </div>
        </div>
      </div>
    </>
  );
}
