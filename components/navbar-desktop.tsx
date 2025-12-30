"use client"

import { useState } from "react"
import { Search } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "@/lib/motion"
import whiteLogo from "@/public/images/bpl-logo.avif"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { performSearch } from "@/lib/search"

export function NavbarDesktop({ isScrolled }: { isScrolled: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const [desktopQuery, setDesktopQuery] = useState("")
  const desktopResults = desktopQuery ? performSearch(desktopQuery) : null

  const isActivePath = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname === path || pathname.startsWith(path + "/")
  }

  const submitSearch = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <motion.div
      className={`flex items-center justify-between py-4 px-4 md:px-6 w-full ${isScrolled
          ? 'bg-gradient-to-b from-[#0a0e27] via-[#0a0e27]/70 to-[#0a0e27]/1'
          : 'nav-color'
        }`}
    >
      {/* Desktop Logo */}
      <div className="hidden lg:flex items-center space-x-3 ml-3">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            <Image
              src={whiteLogo}
              alt="BPL Logo"
              width={220}
              height={80}
              className="h-20 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-4 font-[16px]">
        <Link
          href="/"
          className={cn(
            "text-white/80 hover:text-[#d4a574] font-medium relative group py-2",
            isActivePath("/") && "text-[#d4a574]",
          )}
        >
          HOME
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full",
              isActivePath("/") && "w-full",
            )}
          />
        </Link>

        <Link
          href="/matches"
          className={cn(
            "text-white/80 hover:text-[#d4a574] font-medium relative group py-2",
            isActivePath("/matches") && "text-[#d4a574]",
          )}
        >
          MATCHES
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full",
              isActivePath("/matches") && "w-full",
            )}
          />
        </Link>

        <Link
          href="/points-table"
          className={cn(
            "text-white/80 hover:text-[#d4a574] font-medium relative group py-2",
            isActivePath("/points-table") && "text-[#d4a574]",
          )}
        >
          POINTS TABLE
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full",
              isActivePath("/points-table") && "w-full",
            )}
          />
        </Link>
        <Link
          href="/schedule"
          className={cn(
            "text-white/80 hover:text-[#d4a574] font-medium relative group py-2",
            isActivePath("/schedule") && "text-[#d4a574]",
          )}
        >
          SCHEDULE
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full",
              isActivePath("/schedule") && "w-full",
            )}
          />
        </Link>
        <Link
          href="/teams"
          className={cn(
            "text-white/80 hover:text-[#d4a574] font-medium relative group py-2",
            isActivePath("/teams") && "text-[#d4a574]",
          )}
        >
          TEAMS
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full",
              isActivePath("/teams") && "w-full",
            )}
          />
        </Link>
        <Link
          href="/news"
          className={cn(
            "text-white/80 hover:text-[#d4a574] font-medium relative group py-2",
            isActivePath("/news") && "text-[#d4a574]",
          )}
        >
          NEWS
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full",
              isActivePath("/news") && "w-full",
            )}
          />
        </Link>

        {/* More Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-white/80 hover:text-[#d4a574] font-medium py-2 group">
            MORE
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
            <div className="border border-white/10 rounded-lg shadow-xl p-2">
              <Link
                href="/bpl-venue"
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Venues
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Blog
              </Link>

              <Link
                href="/stats"
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                STATS
              </Link>

              <Link
                href="/contact-us"
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact-Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and CTA */}
      <div className="hidden lg:flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <Input
            placeholder="Search"
            className="pl-10 w-45 bg-transparent border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 min-h-[2.5rem]"
            value={desktopQuery}
            onChange={(e) => setDesktopQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch(desktopQuery)
              }
            }}
          />
          <AnimatePresence>
            {desktopQuery && desktopResults && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute mt-2 left-0 right-0 bg-[#0a0e27] border border-white/10 rounded-lg shadow-xl z-50"
              >
                <div className="max-h-96 overflow-auto py-2 modern-scrollbar">
                  {/* News */}
                  <div className="px-3 py-2">
                    <div className="text-xs uppercase hover:text-[#d4a574] mb-1">News</div>
                    {desktopResults.news.length === 0 ? (
                      <div className="hover:text-[#d4a574] text-sm">No news</div>
                    ) : (
                      <ul className="space-y-1">
                        {desktopResults.news.slice(0, 5).map((n) => (
                          <li key={n.id}>
                            <Link href={`/news/${n.slug}`} className="block px-2 py-1 rounded hover:bg-white/10">
                              <span className="text-[#d4a574]">{n.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-1">
                      <Link href="/news" className="text-[#d4a574] text-xs hover:text-[#d4a574]">View all news</Link>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 my-1" />

                  {/* Teams */}
                  <div className="px-3 py-2">
                    <div className="text-xs uppercase hover:text-[#d4a574] mb-1">Teams</div>
                    {desktopResults.teams.length === 0 ? (
                      <div className="hover:text-[#d4a574] text-sm">No teams</div>
                    ) : (
                      <ul className="space-y-1">
                        {desktopResults.teams.slice(0, 5).map((t) => (
                          <li key={t.slug}>
                            <Link href={`/teams/${t.slug}`} className="block px-2 py-1 rounded hover:bg-white/10">
                              <span className="text-white">{t.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-1">
                      <Link href="/teams" className="text-[#d4a574] text-xs hover:text-[#d4a574]">View all teams</Link>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 my-1" />

                  {/* Matches */}
                  <div className="px-3 py-2">
                    <div className="text-xs uppercase hover:text-[#d4a574] mb-1">Matches</div>
                    {desktopResults.matches.length === 0 ? (
                      <div className="hover:text-[#d4a574] text-sm">No matches</div>
                    ) : (
                      <ul className="space-y-1">
                        {desktopResults.matches.slice(0, 5).map((m) => (
                          <li key={m.id}>
                            <Link href={`/matches`} className="block px-2 py-1 rounded hover:bg-white/10">
                              <span className="text-white">{m.matchNumber}: {m.team1} vs {m.team2} — {m.date}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-1">
                      <Link href="/matches" className="text-[#d4a574] text-xs hover:text-[#d4a574]">View full schedule</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link href="/blog/bpl-tickets/">
          <Button className="bg-[#d4a574] text-center pt-3 hover:bg-[#d4a574] cursor-pointer text-white min-w-[140px] whitespace-nowrap">
            BPL 2025 TICKETS
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

