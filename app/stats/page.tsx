import { Card } from "@/components/ui/card"
import { Metadata } from 'next'
import { JsonLd } from "@/components/json-ld"
import { Breadcrumb } from "@/components/breadcrumb"
import { statsData } from "@/data/stats-data"
import Image from "next/image"

export const metadata: Metadata = {
    title: 'Bangladesh Premier League 2026 Statistics | BPLT20League.com',
    description: 'Take a look at all the Bangladesh Premier League 2026 Statistics. Discover BPL Statistics on player records, team performances, and more on BPLT20League.com',
    keywords: ['BPL 2026 stats', 'BPL statistics', 'Bangladesh Premier League 2026 statistics', 'BPL player records', 'BPL team performances'],
    openGraph: {
        title: 'Bangladesh Premier League 2026 Statistics | BPLT20League.com',
        description: 'Take a look at all the Bangladesh Premier League 2026 Statistics. Discover BPL Statistics on player records, team performances, and more on BPLT20League.com',
        type: 'website',
        url: 'https://bplt20league.com/stats',
        siteName: 'BPLT20League.com',
        images: [
            {
                url: 'https://bplt20league.com/images/stats-og.png',
                width: 1200,
                height: 630,
                alt: 'Bangladesh Premier League 2026 Statistics',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bangladesh Premier League 2026 Statistics | BPLT20League.com',
        description: 'Take a look at all the Bangladesh Premier League 2026 Statistics. Discover BPL Statistics on player records, team performances, and more on BPLT20League.com',
        images: ['https://bplt20league.com/images/stats-og.png'],
    },
    alternates: {
        canonical: 'https://bplt20league.com/stats',
    },
    authors: [{ name: 'BPLT20League.com' }],
    creator: 'BPLT20League.com',
    publisher: 'BPLT20League.com',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    category: 'Sports',
    classification: 'Cricket Statistics',
}

export default function StatsPage() {
    return (
        <div className="min-h-screen bg-[#0a0e27] p-4 pt-30 font-manrope">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SportsTeamStats",
                "name": "Bangladesh Premier League 2026 Statistics",
                "description": "Take a look at all the Bangladesh Premier League 2026 Statistics. Discover BPL Statistics on player records, team performances, and more on BPLT20League.com",
                "sport": "Cricket",
                "url": "https://bplt20league.com/stats",
                "competition": {
                    "@type": "SportsLeague",
                    "name": "Bangladesh Premier League",
                    "season": "2026"
                },
                "provider": {
                    "@type": "Organization",
                    "name": "BPLT20League.com",
                    "url": "https://bplt20league.com"
                }
            }} />



            <div className="w-full px-4 md:px-6 pt-4 mb-10 relative z-10">
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Stats', href: '/stats' }
                    ]}
                />
            </div>
            {/* Main Heading */}


            <h1 className="text-3xl md:text-4xl font-bold text-left text-[#d4a574] mb-8">
            Most Runs in BPL 2026 | Bangladesh Premier League Top Run Scorers
            </h1>

            {/* Top Performance Section */}
            <section className="mb-12 max-w-full mx-auto">
                <h2 className="text-2xl md:text-3xl text-white font-semibold  mb-6 border-b border-emerald-400/30 pb-2">
                    Top Performance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {/* Top Run Scorers */}
                    <Card className="border-emerald-400/30 border p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: "#0f172a" }}>
                        <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Most Runs in BPL 2026</h3>
                        <div className="space-y-4">
                            {statsData.topRunScorers.map((player, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={player.image}
                                            alt={player.name}
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm md:text-base truncate">{player.name}</p>
                                        <p className="text-gray-400 text-xs">{player.team}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#d4a574] font-bold text-lg">{player.runs}</p>
                                        <p className="text-gray-400 text-xs">Innings: {player.innings}</p>
                                        {player.average && (
                                            <p className="text-gray-400 text-xs">Avg: {player.average.toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Top Wicket Takers */}
                    <Card className="border-emerald-400/30 border p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: "#0f172a" }}>
                        <h3 className="text-xl font-semibold text-[#d4a574] mb-4">BPL Most Wickets 2026</h3>
                        <div className="space-y-4">
                            {statsData.topWicketTakers.map((player, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={player.image}
                                            alt={player.name}
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm md:text-base truncate">{player.name}</p>
                                        <p className="text-gray-400 text-xs">{player.team}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#d4a574] font-bold text-lg">{player.wickets}</p>
                                        <p className="text-gray-400 text-xs">Innings: {player.innings}</p>
                                        {player.average && (
                                            <p className="text-gray-400 text-xs">Avg: {player.average.toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Best Batting Strike Rates */}
                    <Card className="border-emerald-400/30 border p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: "#0f172a" }}>
                        <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Best Batting Strike Rates</h3>
                        <div className="space-y-4">
                            {statsData.bestBattingStrikeRates.map((player, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={player.image}
                                            alt={player.name}
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm md:text-base truncate">{player.name}</p>
                                        <p className="text-gray-400 text-xs">{player.team}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#d4a574] font-bold text-lg">{player.strikeRate?.toFixed(2)}</p>
                                        <p className="text-gray-400 text-xs">Innings: {player.innings}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Best Bowling Economy */}
                    <Card className="border-emerald-400/30 border p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: "#0f172a" }}>
                        <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Best Bowling Economy</h3>
                        <div className="space-y-4">
                            {statsData.bestBowlingEconomy.map((player, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={player.image}
                                            alt={player.name}
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm md:text-base truncate">{player.name}</p>
                                        <p className="text-gray-400 text-xs">{player.team}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#d4a574] font-bold text-lg">{player.economy?.toFixed(2)}</p>
                                        <p className="text-gray-400 text-xs">Innings: {player.innings}</p>
                                        {player.average && (
                                            <p className="text-gray-400 text-xs">Avg: {player.average.toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

        </div>
    )
}