import { HeroSection } from "@/components/hero-section"
import { NewsCard } from "@/components/news-card"
import { newsArticles } from "@/data/news-data"
import { Metadata } from "next"
import { Breadcrumb } from "@/components/breadcrumb"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "BPL 2026 News | Latest Updates, Match Reports & Headlines from Bangladesh Premier League",
    description: "Stay updated with the latest BPL 2026 news, match reports, team updates, and player stories. Get real-time coverage from the Bangladesh Premier League T20 only on BPLT20.",
    keywords: ["BPL News", "BPL 2026 News", "Bangladesh Premier League News", "BPL Updates", "BPL 2026"],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      }
    },
    alternates: {
      canonical: "https://bplt20league.com/news"
    },
    openGraph: {
      title: "BPL 2026 News | Latest Updates & Headlines",
      description: "Stay updated with the latest BPL 2026 news, match reports, team updates, and player stories.",
      url: "/news",
      siteName: "bplt20league",
      locale: "en_US",
      type: "website",
    }
  }
}




export default function NewsPage() {
  // Define breadcrumb items for the news page
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'News', href: '', isCurrent: true }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://bplt20league.com/#blog",
            "name": "BPL T20 League Blog",
            "description": "Latest BPL T20 news, match reports, fixtures updates, team analysis, player stats, and fantasy cricket tips.",
            "publisher": {
              "@id": "https://bplt20league.com/#organization"
            },
            "inLanguage": "en"
          })
        }}
      />

      <HeroSection title="News" />
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Latest News Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#d4a574] mb-2">Latest News</h2>
          <div className="w-20 h-1 bg-emerald-400 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...newsArticles]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((article) => (
              <NewsCard key={article.id} {...article} image={typeof article.image === "string" ? article.image : article.image.src} />
            ))}
        </div>
      </div>
    </div>
  )
}
