import MatchCarousel from "./components/match_carosule"
import PointsTable from "../points-table/components/points-table"
import hero from '@/public/images/schedule.webp'
import pattern from '@/public/images/schedule-patern.webp'
import { Metadata } from "next"
import Image from 'next/image'
import { matchesData } from "@/data/matches-data"
import { Breadcrumb } from "@/components/breadcrumb"
import { Suspense } from "react"


export async function generateMetadata(): Promise<Metadata> {
    const title = "BPL 2026 – Live Scores, Schedule & Points Table"
    const description = "BPL live scores for today’s matches. Follow every run, wicket, and result from the Bangladesh Premier League 2026, all in one place."
    const keywords = [
        "BPL live scores",
        "BPL 2026 matches",
        "BPL match schedule",
        "BPL match results",
        "BPL fixtures 2026",
        "BPL 2026"
    ]

    return {
        title: title,
        description: description,
        keywords: keywords,
        authors: [{ name: "bPLT20League.com" }],
        creator: "bPLT20League.com",
        publisher: "bPLT20League.com",
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
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://bplt20league.com/matches',
            siteName: 'BPLT20League.com',
            title: title,
            description: description,
            images: [
                {
                    url: 'https://bplt20league.com/images/schedule.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Bangladesh Premier League 2026 Match Schedule',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: ['https://bplt20league.com/images/schedule.webp'],
            creator: '@bplt20league',
            site: '@bplt20league',
        },
        alternates: {
            canonical: 'https://bplt20league.com/matches',
        },
        category: 'Sports',
        classification: 'Cricket',
    }
}

const MatchesHome = () => {
    // JSON-LD Structured Data for SEO
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://bplt20league.com/matches#breadcrumb",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
            "item": "https://bplt20league.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Matches",
            "item": "https://bplt20league.com/matches"
            }
        ]
      };


      const matchesListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": "https://bplt20league.com/matches#matchlist",
        "name": "BPL 2026 Match Schedule",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "itemListElement": matchesData.matches.map((match: any, index: number) => {
          // Convert date and time to ISO format
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

          const startDate = parseDate(match.date, match.time);
          // End date is approximately 3.5 hours after start (T20 match duration)
          const endDate = new Date(new Date(startDate).getTime() + 3.5 * 60 * 60 * 1000).toISOString().replace('Z', '+06:00');
          
          const team1Name = match.team1?.name || match.team1 || "Team 1";
          const team2Name = match.team2?.name || match.team2 || "Team 2";
          const team1Logo = match.team1?.logo || "";
          const team2Logo = match.team2?.logo || "";

          // Determine city from venue
          const getCity = (venue: string) => {
            if (venue?.toLowerCase().includes("dhaka") || venue?.toLowerCase().includes("mirpur")) return "Dhaka";
            if (venue?.toLowerCase().includes("sylhet")) return "Sylhet";
            if (venue?.toLowerCase().includes("chattogram") || venue?.toLowerCase().includes("chittagong")) return "Chattogram";
            return venue || "Bangladesh";
          };

          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
        "@type": "SportsEvent",
              "@id": `https://bplt20league.com/matches/${match.slug || `match-${match.id}`}#event`,
              "name": `${team1Name} vs ${team2Name} – BPL 2026`,
              "description": `BPL 2026 ${match.matchNumber || `Match ${match.id}`}: ${team1Name} vs ${team2Name} at ${match.venue || "Bangladesh"}. ${match.matchType || ""}`,
        "sport": "Cricket",
              "startDate": startDate,
              "endDate": endDate,
              "eventStatus": match.status === "completed" 
                ? "https://schema.org/EventScheduled" 
                : match.status === "live"
                ? "https://schema.org/EventLive"
                : "https://schema.org/EventScheduled",
              "image": team1Logo || team2Logo || "https://bplt20league.com/images/schedule.webp",
              "organizer": {
                "@type": "Organization",
                "@id": "https://bplt20league.com/#sportsleague",
                "name": "Bangladesh Cricket Board"
              },
        "location": {
            "@type": "Place",
                "name": match.venue || "Bangladesh",
            "address": {
                "@type": "PostalAddress",
                  "addressLocality": match.city || getCity(match.venue),
                  "addressCountry": "BD"
            }
        },
              "competitor": [
                {
                  "@type": "SportsTeam",
                  "name": team1Name,
                  "logo": team1Logo || undefined
                },
                {
                  "@type": "SportsTeam",
                  "name": team2Name,
                  "logo": team2Logo || undefined
                }
              ],
              "performer": [
                {
                  "@type": "SportsTeam",
                  "name": team1Name
                },
                {
                  "@type": "SportsTeam",
                  "name": team2Name
    }
              ]
            }
          };
        })
      };
      

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://bplt20league.com/matches#webpage",
        "name": "Bangladesh Premier League 2026 – Match Schedule, Fixtures & Results",
        "description": "Get the complete Bangladesh Premier League 2026 match schedule, fixtures, live scores, results, and points table.",
        "url": "https://bplt20league.com/matches",
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": "https://bplt20league.com/#website"
        },
        "about": {
          "@id": "https://bplt20league.com/#sportsleague"
        },
        "breadcrumb": {
          "@id": "https://bplt20league.com/matches#breadcrumb"
                }
      };
      

    return (

        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(matchesListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />

            <div className="schedule-carousel-container h-[76vh] md:h-[90vh] lora">

                {/* Background Image with Overlay */}
                <div
                    className="schedule-background relative h-[76vh] w-full overflow-hidden"
                    style={{
                        backgroundImage: `url(${hero.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    role="img"
                    aria-label="Background image"
                >
                    {/* Original dark overlay */}
                    <div className="absolute inset-0 bg-black/75" />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                    {/* Pattern overlay - FIXED VERSION */}
                    <div
                        className="hidden lg:block absolute right-0 top-0 w-[860px] h-full"
                        style={{
                            backgroundImage: `url(${pattern.src})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right top',
                            opacity: 0.15,
                            mixBlendMode: 'overlay',
                        }}
                    />

                    {/* Text Content */}
                    <div className="absolute left-0 top-2/3 transform -translate-y-1/2 ml-4 px-6 md:px-12 lg:px-16 w-full">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold text-[#d4a574] mb-4 font-sans">
                                Matches
                            </h1>
                            <p className="text-white/80 text-lg md:text-xl max-w-md">
                                Stay updated with all upcoming matches and events in the Bangladesh Premier League.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-[#0a0e27]">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 pt-4">
                    <Breadcrumb
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Matches', href: '' }
                        ]}
                    />
                </div>
                {/* Critical LCP Element - Rendered Server-Side for Immediate Display */}
                {/* This renders immediately without waiting for JavaScript, reducing LCP delay from 7.7s to <1s */}
                <div className="max-w-6xl mx-auto px-4 pt-6" style={{ minHeight: '80px' }}>
                    <div className="mb-4 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2" style={{ 
                            fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                            lineHeight: '1.5',
                            marginBottom: '0.5rem'
                        }}>
                            BPL Live Score 2026 | Bangladesh Premier League
                        </h3>
                        <h1 className="text-sm text-gray-300" style={{ 
                            fontFamily: 'var(--font-inter), system-ui, sans-serif',
                            lineHeight: '1.5'
                        }}>BPL 2026 Live Today</h1>
                    </div>
                </div>
                <Suspense fallback={
                    <div className="min-h-[400px] bg-[#0a0e27] flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d4a574] border-t-transparent mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading matches...</p>
                        </div>
                    </div>
                }>
                    <MatchCarousel />
                </Suspense>
                <PointsTable />
            </div>
        </>

    )
}

export default MatchesHome