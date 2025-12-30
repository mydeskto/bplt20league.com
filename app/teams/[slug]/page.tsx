import { Metadata } from "next"
import { pointsData } from "@/data/points-data"
import { playersData } from "@/data/players-data"
import Link from "next/link";
import PlayerCard from './components/PlayerCard';
import { Breadcrumb } from "@/components/breadcrumb"
import { HoverEffectForTeam } from "@/components/cardsForTeam"
import { teamsData } from "@/data/teamData"


export async function generateStaticParams() {
     return pointsData.map((team) => ({
          slug: team.team.toLowerCase().replace(/\s+/g, "-"),
     }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
     const { slug } = await params
     const normalizedSlug = slug?.toLowerCase()
     const team = pointsData.find((t) => t.team.toLowerCase().replace(/\s+/g, "-") === normalizedSlug)

     return {
          title: team ? `${team.team} - BPL Team Profile` : "Team - Bangladesh Premier League",
          description: team
               ? `${team.team} team profile, squad, statistics and latest updates from Bangladesh Premier League. Matches played: ${team.matches}, Points: ${team.points}`
               : "Bangladesh Premier League team information and statistics",
          keywords: [team?.team || "BPL Team", "Bangladesh Premier League", "Cricket Team", "BPL Squad"],
          robots: {
               index: true, // This will override the root layout robots for this route only
               follow: true
          }
          , alternates: {
               canonical: `https://bplt20league.com/teams/${slug}`,
          }
     }
}

interface Player {
     name: string
     image: string
     role: string
}

function getPlayersForTeam(teamSlug: string): Player[] {
     // Normalize the slug to match the format in playersData
     const normalizedSlug = teamSlug.toLowerCase().replace(/\s+/g, "-")
     const teamData = playersData[normalizedSlug as keyof typeof playersData]
     console.log('Team Slug:', normalizedSlug, 'Team Data:', teamData) // Debug log
     if (!teamData) return []

     return teamData.players.map((player: any) => ({
          name: player.name,
          image: typeof player.image === "string" ? player.image : player.image?.src ?? "/placeholder.svg",
          role: player.role,
          country: player.country,

     }))
}

interface TeamPageProps {
     params: Promise<{
          slug: string
     }>
}

export default async function TeamPage({ params }: TeamPageProps) {
     const { slug } = await params
     const normalizedSlug = slug?.toLowerCase()
     const team = pointsData.find((t) => t.team.toLowerCase().replace(/\s+/g, "-") === normalizedSlug)


     const players = getPlayersForTeam(slug || '')

     const teamData = {
          position: team?.position ?? 0,
          points: team?.points ?? 0,
          matches: team?.matches ?? 0,
          won: team?.won ?? 0,
          lost: team?.loss ?? 0,
     }

     if (!team) {
          return (
               <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <div className="text-white text-xl">Team not found.</div>
               </div>
          )
     }
     const hoverItems = pointsData.map((team) => ({
          title: team.team,
          logo: team.logo,
          link: `/teams/${encodeURIComponent(team.team.toLowerCase().replace(/\s+/g, "-"))}`,
     }))

     // Find team info from teamsData
     const teamInfo = teamsData.find((t) => t.id === slug) || teamsData[0];

     // JSON-LD Schema for SEO
     const teamSchema = {
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          name: team?.team || teamInfo?.teamName,
          sport: "Cricket",
          memberOf: {
               "@type": "SportsOrganization",
               name: "Bangladesh Premier League"
          },
          coach: teamInfo?.coach ? {
               "@type": "Person",
               name: teamInfo.coach
          } : undefined,
          athlete: teamInfo?.captain ? {
               "@type": "Person",
               name: teamInfo.captain
          } : undefined,
          logo: teamInfo?.logo || team?.logo,
          description: `${team?.team || teamInfo?.teamName} - Bangladesh Premier League 2026 team profile, squad, and statistics`,
          url: `https://bplt20league.com/teams/${slug}`
     };

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
               },
               {
                    "@type": "ListItem",
                    position: 3,
                    name: team?.team || "Team",
                    item: `https://bplt20league.com/teams/${slug}`
               }
          ]
     };

     return (
          <>
               {/* JSON-LD Schema */}
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
               />
               <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-25 font-inter ">
               {/* <HeroSection title={team?.team || "Team Detail"} teamData={teamData} /> */}

               {/* Breadcrumb */}
               <div className="w-full px-4 md:px-6 pt-4 relative z-10">
                    <Breadcrumb
                         items={[
                              { label: 'Home', href: '/' },
                              { label: 'Teams', href: '/teams' },
                              { label: team?.team || "Team Detail", href: `` }
                         ]}
                    />
               </div>

               <HoverEffectForTeam items={hoverItems} />

               <div className="w-full px-4 md:px-6 py-8">
                    {teamsData.map((teamInfo , index) => {
                         const teamSlug = teamInfo.id
                         if (teamSlug === slug) {
                              return (
                                   <div className="w-full rounded-3xl overflow-hidden reveal-animation " key={index}>
                                        {/* Main Grid: Left Panel (Logo/Name) + Right Panel (Details) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 font-inter ">
                                             {/* LEFT PANEL - Logo and Team Name Section */}
                                             <div className="lg:col-span-1 p-12 flex items-center justify-center gap-5">
                                                  {/* Team Logo Container */}
                                                  <div className="w-30 h-30 mb-6 relative reveal-animation reveal-delay-1">
                                                       <img
                                                            src={teamInfo.logo || "/placeholder.svg"}
                                                            alt={`${teamInfo.teamName} logo`}
                                                            className="w-30 h-30 object-contain drop-shadow-2xl"
                                                       />
                                                  </div>

                                                  <div className="h-45 w-[2px] bg-gray-500 reveal-animation reveal-delay-2"></div>

                                                  <div className="flex flex-col reveal-animation reveal-delay-2">
                                                       {/* Team Name */}
                                                       <h1 className="text-3xl work-san text-white mb-4 text-center leading-tight">
                                                            {teamInfo.teamName}
                                                       </h1>

                                                       {/* Championship Wins Badge */}
                                                       <div className="px-4 py-2 flex items-center gap-2">
                                                            <span className="text-[#d4a574] -ml-8 text-5xl font-semibold absolute">🏆</span>
                                                            <span className="text-[#d4a574] text-sm font-semibold border-2 pl-8 px-2 py-2 rounded-r-3xl border-white">
                                                                 {teamInfo?.nplWin || 0} Championship{teamInfo?.nplWin !== 1 ? "s" : ""}
                                                            </span>
                                                       </div>

                                                       {/* Official Team Site Button */}
                                                       <button className="mt-6 px-6 py-3 w-60 h-8 font-bold transform -skew-x-12 bg-red-500 hover:bg-red-600 text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95">
                                                            <span className="work-san">Official Team Site</span>
                                                            <span>↗</span>
                                                       </button>
                                                  </div>
                                             </div>

                                             {/* RIGHT PANEL - Team Details Section */}
                                             <div className="p-8 flex flex-col justify-center reveal-animation reveal-delay-3">
                                                  {/* Team Details Grid */}
                                                  <div className="p-4 w-[80%] h-fit rounded-md bg-[#0a0e27] reveal-animation reveal-delay-4">
                                                       {/* Captain */}
                                                       <div className="pb-4 flex gap-5 reveal-animation reveal-delay-4">
                                                            <p className="text-[#d4a574] font-normal tracking-widest text-[14px] leading-[21px]">
                                                                 Captain - <span className="text-[#d4a574] underline"><Link href={teamInfo.captainProfileLink}>{teamInfo.captain}</Link></span>
                                                            </p>
                                                       </div>
                                                       <div className="bg-black h-[2px] w-[calc(100%+32px)] relative -left-4 mb-2"/>

                                                       {/* Coach */}
                                                       <div className="flex gap-5 reveal-animation reveal-delay-4">
                                                            <p className="text-[#d4a574] font-normal tracking-widest text-[14px] leading-[21px] mb-2">
                                                                 Coach - <span className="text-white">{teamInfo.coach}</span>
                                                            </p>
                                                       </div>
                                                       <div className="bg-black h-[2px] w-[calc(100%+32px)] relative -left-4 mb-2"/>

                                                       {/* Owner */}
                                                       <div className="pb-4 flex gap-5 reveal-animation reveal-delay-5">
                                                            <p className="text-[#d4a574] font-normal tracking-widest text-[14px] leading-[21px]">
                                                                 Owner - <span className="text-white">{teamInfo.owner}</span>
                                                            </p>
                                                       </div>
                                                       <div className="bg-black h-[2px] w-[calc(100%+32px)] relative -left-4 "/>

                                                       {/* Venue */}
                                                       <div className="pb-4 flex gap-5 reveal-animation reveal-delay-5">
                                                            <p className="text-[#d4a574] font-normal tracking-widest pt-2 text-[14px] leading-[21px] mb-2">
                                                                 Venue - <span className="text-white">{teamInfo.venue}</span>
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )
                         }
                         return null
                    })}
               </div>
               
               <div className="w-full px-4 md:px-6 py-8 relative z-10">
                    {/* Teams player section */}
                    <div className="space-y-12">
                         {/* Batsmen Section */}
                         {players.some(player => 
                              player.role?.toLowerCase().includes('batsman') || 
                              player.role?.toLowerCase().includes('captain')
                         ) && (
                              <div className="reveal-animation">
                                   <h2 className="text-2xl font-bold text-white mb-6 text-left border-b border-[#d4a574]/20 pb-2">
                                        Batsmen & Captain
                                   </h2>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full">
                                        {players
                                             .filter(player => 
                                                  player.role?.toLowerCase().includes('batsman') || 
                                                  player.role?.toLowerCase().includes('captain')
                                             )
                                             .map((player, index) => (
                                                  <PlayerCard key={index} player={player} />
                                             ))}
                                   </div>
                              </div>
                         )}

                         {/* All-rounders Section */}
                         {players.some(player => 
                              player.role?.toLowerCase().includes('all') || 
                              player.role?.toLowerCase().includes('rounder')
                         ) && (
                              <div className="reveal-animation reveal-delay-1">
                                   <h2 className="text-2xl font-bold text-white mb-6 text-left border-b border-[#d4a574]/20 pb-2">
                                        All-rounders
                                   </h2>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full">
                                        {players
                                             .filter(player => 
                                                  player.role?.toLowerCase().includes('all') || 
                                                  player.role?.toLowerCase().includes('rounder')
                                             )
                                             .map((player, index) => (
                                                  <PlayerCard key={index} player={player} />
                                             ))}
                                   </div>
                              </div>
                         )}

                         {/* Bowlers Section */}
                         {players.some(player => player.role?.toLowerCase().includes('bowler')) && (
                              <div className="reveal-animation reveal-delay-2">
                                   <h2 className="text-2xl font-bold text-white mb-6 text-left border-b border-[#d4a574]/20 pb-2">
                                        Bowlers
                                   </h2>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full">
                                        {players
                                             .filter(player => player.role?.toLowerCase().includes('bowler'))
                                             .map((player, index) => (
                                                  <PlayerCard key={index} player={player} />
                                             ))}
                                   </div>
                              </div>
                         )}

                         {/* Other Squad Members Section */}
                         {players.some(player => 
                              !player.role ||
                              !(
                                   player.role.toLowerCase().includes('batsman') ||
                                   player.role.toLowerCase().includes('bowler') ||
                                   player.role.toLowerCase().includes('all') ||
                                   player.role.toLowerCase().includes('rounder') ||
                                   player.role.toLowerCase().includes('captain')
                              )
                         ) && (
                              <div className="reveal-animation reveal-delay-3">
                                   <h2 className="text-2xl font-bold text-white mb-6 text-left border-b border-[#d4a574]/20 pb-2">
                                        Other Squad Members
                                   </h2>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full">
                                        {players
                                             .filter(player => 
                                                  !player.role ||
                                                  !(
                                                       player.role.toLowerCase().includes('batsman') ||
                                                       player.role.toLowerCase().includes('bowler') ||
                                                       player.role.toLowerCase().includes('all') ||
                                                       player.role.toLowerCase().includes('rounder') ||
                                                       player.role.toLowerCase().includes('captain')
                                                  )
                                             )
                                             .map((player, index) => (
                                                  <PlayerCard key={index} player={player} />
                                             ))}
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
               </div>
          </>
     )
}
