import { Metadata } from 'next'
import PointsTable from './components/points-table'
import { Breadcrumb } from '@/components/breadcrumb'
import { teamsData } from '@/data/teamData'

export const metadata: Metadata = {
     title: "BPL Points Table 2025-26 | Bangladesh Premier League Standings",
     description: "BPL 2025-26 Points Table: Live Team Rankings, Standings & Updates for Bangladesh Premier League",
     keywords: [
          "BPL 2026 Points Table",
          "Bangladesh Premier League standings",
          "BPL team rankings",
          "BPL T20 standings",
          "BPL points table"
     ],
     robots: {
          index: true,
          follow: true,
     },
     alternates: {
          canonical: "https://bplt20league.com/points-table",
     },
}

export default function PointsTablePage() {

     const breadcrumbSchema = {
          "@type": "ItemList",
          "itemListOrder": "https://schema.org/ItemListOrderAscending",
          "itemListElement": teamsData.map((team: any, index: number  ) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "SportsTeam",
              "name": team.name,
              "url": `https://bplt20league.com/team/${team.slug}`,
              "memberOf": {
                "@type": "SportsLeague",
                "name": "Bangladesh Premier League"
              },
              "numberOfWins": team.wins,
              "numberOfLosses": team.losses,
              "ranking": index + 1,
              "points": team.points,
              "netRunRate": team.nrr
            }
          }))
        }
        

     return (
          <>
               {/* JSON-LD Schema */}
               <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://bplt20league.com/points-table#webpage",
      "name": "BPL Points Table 2026 - Bangladesh Premier League Team Standings & Rankings",
      "description": "BPL Points Table 2026 with live team standings, rankings, match results, wins, losses, and NRR from the Bangladesh Premier League.",
      "url": "https://bplt20league.com/points-table",
      "inLanguage": "en-US",
      "isPartOf": {
        "@id": "https://bplt20league.com/#website"
      },
      "about": {
        "@type": "SportsLeague",
        "@id": "https://bplt20league.com/#sportsleague",
        "name": "Bangladesh Premier League",
        "sport": "Cricket"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "@id": "https://bplt20league.com/points-table#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bplt20league.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Points Table",
            "item": "https://bplt20league.com/points-table"
          }
        ]
      }
    })
  }}
/>

               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
               />
               <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden pt-25">
                    {/* Breadcrumb */}
                    <div className="w-full px-4 md:px-6 pt-4 relative z-10">
                         <Breadcrumb
                              items={[
                                   { label: 'Home', href: '/' },
                                   { label: 'Points Table', href: '/points-table' }
                              ]}
                         />
                    </div>

                    {/* Points Table Component */}
                    <PointsTable />
               </div>
          </>
     )
}