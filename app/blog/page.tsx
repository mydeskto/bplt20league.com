import { HeroSection } from "@/components/hero-section"
import { BlogCard } from "@/components/blog-card"
import { Metadata } from "next"
import { Breadcrumb } from "@/components/breadcrumb"
import { blogArticles } from "@/data/blog-data"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "BPL 2026 Blog - Latest News, Matches, and Updates from Bangladesh Premier League",
    description: "Read the latest BPL 2026 blogs featuring match, team updates, Bangladesh Premier League news and insights.",
    keywords: ["BPL Blogs", "BPL 2026 Blog", "Bangladesh Premier League Blog", "BPL Updates", "BPL 2026"],
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
      canonical: "https://bplt20league.com/blog/"
    },
    openGraph: {
      title: "BPL 2026 Blog | Latest Updates & Headlines",
      description: "Stay updated with the latest BPL 2026 blogs, match reports, team updates, and player stories.",
      url: "/blog",
      siteName: "bplt20league",
      locale: "en_US",
      type: "website",
    }
  }
}

const blogPostSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://bplt20league.com/blog/dhaka-vs-comilla-match-report#blogposting",
  "headline": "Dhaka Dominators vs Comilla Victorians Match Report – BPL 2026",
  "description": "Full match report, scorecard, key moments, and player performances from the BPL 2026 clash between Dhaka Dominators and Comilla Victorians.",
  "image": {
    "@type": "ImageObject",
    "url": "https://bplt20league.com/images/dhaka-vs-comilla.webp",
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Organization",
    "name": "BPL T20 Team",
    "url": "https://bplt20league.com"
  },
  "publisher": {
    "@id": "https://bplt20league.com/#organization"
  },
  "datePublished": "2026-01-10T10:00:00+06:00",
  "dateModified": "2026-01-10T12:00:00+06:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://bplt20league.com/blog/dhaka-vs-comilla-match-report"
  },
  "isPartOf": {
    "@type": "Blog",
    "@id": "https://bplt20league.com/#blog",
    "name": "BPL T20 League Blog"
  },
  "about": {
    "@id": "https://bplt20league.com/#sportsleague"
  },
  "keywords": [
    "BPL 2026",
    "BPL Match Report",
    "Dhaka Dominators",
    "Comilla Victorians",
    "Bangladesh Premier League"
  ]
};





export default function NewsPage() {
    // Define breadcrumb items for the news page
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '', isCurrent: true }
    ];

    return (
        <div className="min-h-screen bg-[#122754]">
          <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />
            <HeroSection title="Blog" />
            <div className="container mx-auto px-4 py-8 lg:px-8">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />
                {/* Latest Blog Posts Heading */}
                <div className="mb-8 pt-5">
                    <h2 className="text-3xl font-bold text-emerald-400 mb-2">Latest Blog Posts</h2>
                    <div className="w-20 h-1 bg-emerald-400 rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...blogArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((article) => (
                        <BlogCard key={article.id} {...article} image={typeof article.image === "string" ? article.image : article.image.src} />
                    ))}


                </div>
            </div>
        </div>
    )
}
