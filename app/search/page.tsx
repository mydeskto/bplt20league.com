"use client"

import Link from "next/link"
import { performSearch } from "@/lib/search"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-white">Loading search…</div>}>
      <SearchClient />
    </Suspense>
  )
}

function SearchClient() {
  const sp = useSearchParams()
  const q = (sp.get("q") ?? "").toString()
  const { players, news, matches } = performSearch(q)

  // JSON-LD Schema for SEO
  useEffect(() => {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Search - BPL T20 | Bangladesh Premier League",
      "description": "Search for players, news, and matches in the Bangladesh Premier League 2026",
      "url": "https://bplt20league.com/search",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "name": "BPL T20 League",
        "url": "https://bplt20league.com"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
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
            "name": "Search",
            "item": "https://bplt20league.com/search"
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(webPageSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-white">
      <h1 className="text-2xl font-semibold mb-6">Search results for: {q || ""}</h1>

      {!q && <p className="text-white/70">Type a query in the search bar to see results.</p>}

      {q && (
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold mb-3">Players</h2>
            {players.length === 0 ? (
              <p className="text-white/70">No players found.</p>
            ) : (
              <ul className="space-y-2">
                {players.map((p, idx) => (
                  <li key={`${p.teamKey}-${idx}`} className="flex items-center justify-between border-b border-white/10 py-2">
                    <span>{p.name}</span>
                    <Link href={`/players`} className="text-[#d4a574] hover:text-[#d4a574]">View players</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">News</h2>
            {news.length === 0 ? (
              <p className="text-white/70">No news found.</p>
            ) : (
              <ul className="space-y-2">
                {news.map((n) => (
                  <li key={n.id} className="border-b border-white/10 py-2">
                    <Link href={`/news/${n.slug}`} className="text-[#d4a574] hover:text-[#d4a574]">
                      {n.title}
                    </Link>
                    <p className="text-white/70 text-sm">{n.summary}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Matches</h2>
            {matches.length === 0 ? (
              <p className="text-white/70">No matches found.</p>
            ) : (
              <ul className="space-y-2">
                {matches.map((m) => (
                  <li key={m.id} className="flex items-center justify-between border-b border-white/10 py-2">
                    <span>{m.matchNumber}: {m.team1} vs {m.team2} — {m.date}</span>
                    <Link href={`/matches`} className="text-[#d4a574] hover:text-[#d4a574]">View schedule</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  )
}


