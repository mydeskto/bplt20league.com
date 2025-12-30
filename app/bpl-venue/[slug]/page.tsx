
import type { Metadata } from "next"
import Link from "next/link"
import { venuesData } from "@/data/vanue-data"
import { Breadcrumb } from "@/components/breadcrumb"
import VenueContent from "./VenueContent"

interface VenueDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: VenueDetailPageProps): Promise<Metadata> {
  const params = await props.params
  const venue = venuesData.venues.find((v) => v.slug === params.slug)

  if (!venue) {
    return {
      title: "Venue Not Found",
      description: "The requested venue could not be found.",
    }
  }

  // Use venue keywords if available, otherwise fallback to default keywords
  const keywords = venue.keywords && venue.keywords.length > 0 
    ? venue.keywords 
    : [venue.name, "BPL 2026", "cricket venue", "Bangladesh Premier League", venue.location];

  return {
    title: venue.seoTitle,
    description: venue.metaDescription,
    keywords: keywords,
    openGraph: {
      title: venue.seoTitle,
      description: venue.metaDescription,
      type: "website",
      images: [
        {
          url: venue.image,
          width: 600,
          height: 400,
          alt: venue.name,
        },
      ],
    },
    alternates: {
      canonical: `https://bplt20league.com/bpl-venue/${venue.slug}/`,
    }
  }
}

export async function generateStaticParams() {
  return venuesData.venues.map((venue) => ({
    slug: venue.slug,
  }))

}

export default async function VenueDetailPage(props: VenueDetailPageProps) {
  const params = await props.params
  const venue = venuesData.venues.find((v) => v.slug === params.slug)

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0e27' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Venue Not Found</h1>
          <Link href="/bpl-venue" className="text-white hover:underline">
            Back to Venues
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bplt20league.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Venues",
        item: "https://bplt20league.com/bpl-venue/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: venue.name,
        item: `https://bplt20league.com/bpl-venue/${venue.slug}/`,
      },
    ],
  }

  const sportsVenueSchema = {
    "@context": "https://schema.org",
    "@type": "SportsVenue",
    name: venue.name,
    alternateName: venue.alternateName,
    address: {
      "@type": "PostalAddress",
      addressLocality: venue.address.addressLocality,
      addressRegion: venue.address.addressRegion,
      addressCountry: venue.address.addressCountry,
      streetAddress: venue.address.fullAddress,
    },
    capacity: venue.capacity,
    sport: "Cricket",
    description: venue.description || venue.metaDescription,
    url: `https://bplt20league.com/bpl-venue/${venue.slug}/`,
    image: venue.image,
    keywords: venue.keywords && venue.keywords.length > 0 
      ? venue.keywords.join(', ') 
      : `${venue.name}, BPL 2026, cricket venue, Bangladesh Premier League, ${venue.location}`,
    containedIn: {
      "@type": "CivicStructure",
      name: "Bangladesh"
    }
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sportsVenueSchema),
        }}
      />

      <main className="min-h-screen text-white font-inter  tracking-wider" style={{ backgroundColor: '#0a0e27' }}>
        {/* Breadcrumb */}
        <div className="w-full px-2 sm:px-4 md:px-6 pt-20 sm:pt-24 md:pt-30 pb-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Venues', href: '/bpl-venue' },
              // { label: venue.name, href: `/bpl-venue/${venue.slug}` }
            ]}
          />
        </div>

        <VenueContent venue={venue} />
      </main>
    </>
  )
}