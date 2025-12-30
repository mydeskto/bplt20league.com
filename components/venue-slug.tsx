
import type { Metadata } from "next"
import { VenueCard } from "@/components/venue-card"
import { venuesData } from "@/data/vanue-data"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "BPL 2026 Venues - Bangladesh Premier League Cricket Grounds",
  description:
    "Explore all BPL 2026 Cricket Grounds and view capacity, location, and match schedules for Bangladesh Premier League 2026 venues.",
  keywords: [
    "BPL venues",
    "Bangladesh Premier League",
    "cricket grounds",
    "Shere Bangla National Stadium",
    "Sylhet International Cricket Stadium",
    "Zahur Ahmed Chowdhury Stadium",
    "BPL 2026 venues",
    "BPL stadiums",
    "Bangladesh cricket venues",
  ],
  openGraph: {
    title: "BPL 2026 Venues - Bangladesh Premier League Cricket Grounds",
    description:
      "Explore all BPL 2026 venues including Shere Bangla National Stadium, Sylhet International Cricket Stadium, and Zahur Ahmed Chowdhury Stadium.",
    type: "website",
  },
  alternates:{
    canonical: "https://bplt20league.com/bpl-venue",
  }
}

export default function VenuesPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "BPL 2026 Venues",
            description: "All venues for the Bangladesh Premier League 2026 cricket tournament",
            url: "https://bplt20league.com/bpl-venue/",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: venuesData.venues.map((venue, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: venue.name,
                url: `https://bplt20league.com/bpl-venue/${venue.slug}/`,
              })),
            },
          }),
        }}
      />

            <main className="min-h-screen bg-[#0a0e27] text-white pt-25">
        {/* Breadcrumb */}
        <div className="w-full px-4 md:px-6 pt-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'BPL Venues', href: '/bpl-venue' }
            ]}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">BPL 2026 Venues</h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Explore the premier cricket grounds hosting the Bangladesh Premier League 2026. Each venue offers unique
              playing conditions and exciting match experiences.
            </p>
          </div>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venuesData.venues.map((venue) => (
              <VenueCard
                key={venue.id}
                name={venue.name}
                slug={venue.slug}
                capacity={venue.capacity}
                image={venue.image}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
