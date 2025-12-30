"use client"

import { useState, useMemo } from "react"
import { Search, Menu, X, SquareChevronLeft } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "@/lib/motion"
import whiteLogo from "@/public/images/bpl-logo.avif"
import Image from "next/image"
import { FaYoutube, FaFacebook, FaXTwitter, FaInstagram } from "@/lib/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { performSearch } from "@/lib/search"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

export function NavbarMobile({ isScrolled, isMobileMenuOpen, toggleMobileMenu }: { 
  isScrolled: boolean
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
}) {
  const router = useRouter()
  const [mobileQuickQuery, setMobileQuickQuery] = useState("")
  const mobileQuickResults = mobileQuickQuery ? performSearch(mobileQuickQuery) : null

  const submitSearch = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <>
      {/* Mobile Navigation Bar */}
      <motion.div
        className={`flex items-center justify-between py-4 px-4 md:px-6 w-full ${isScrolled
            ? 'bg-gradient-to-b from-[#0a0e27] via-[#0a0e27]/70 to-[#0a0e27]/1'
            : 'nav-color'
          }`}
      >
        {/* Mobile Left Side - Menu Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-[#d4a574] transition-all hover:scale-105 active:scale-95"
          >
            <div
              className={`transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>

        {/* Mobile Right Side - Quick Search + Buy Ticket Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-white hover:text-[#d4a574] transition-colors hover:scale-110 active:scale-90"
              >
                <Search className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-0 w-[88vw] max-w-sm bg-[#0a0e27] border-white/10 text-white">
              <div className="p-2 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    autoFocus
                    placeholder="Search"
                    className="pl-10 bg-transparent border-white/20 text-white placeholder:text-white/60 focus:bg-white/10 text-sm"
                    value={mobileQuickQuery}
                    onChange={(e) => setMobileQuickQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitSearch(mobileQuickQuery)
                      }
                    }}
                  />
                </div>
              </div>
              <div className="max-h-80 overflow-auto modern-scrollbar py-2">
                <div className="px-3 py-2">
                  <div className="text-xs uppercase hover:text-[#d4a574] mb-1">News</div>
                  {mobileQuickResults?.news?.length ? (
                    <ul className="space-y-1">
                      {mobileQuickResults.news.slice(0, 5).map((n) => (
                        <li key={n.id}>
                          <Link href={`/news/${n.slug}`} className="block px-2 py-1 rounded hover:bg-white/10">
                            <span className="text-[#d4a574]">{n.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="hover:text-[#d4a574] text-sm">No news</div>
                  )}
                  <div className="mt-1">
                    <Link href="/news" className="text-[#d4a574] text-xs hover:text-[#d4a574]">View all news</Link>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-1" />

                <div className="px-3 py-2">
                  <div className="text-xs uppercase hover:text-[#d4a574] mb-1">Teams</div>
                  {mobileQuickResults?.teams?.length ? (
                    <ul className="space-y-1">
                      {mobileQuickResults.teams.slice(0, 5).map((t) => (
                        <li key={t.slug}>
                          <Link href={`/teams/${t.slug}`} className="block px-2 py-1 rounded hover:bg-white/10">
                            <span className="text-white">{t.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="hover:text-[#d4a574] text-sm">No teams</div>
                  )}
                  <div className="mt-1">
                    <Link href="/teams" className="text-[#d4a574] text-xs hover:text-[#d4a574]">View all teams</Link>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-1" />

                <div className="px-3 py-2">
                  <div className="text-xs uppercase hover:text-[#d4a574] mb-1">Matches</div>
                  {mobileQuickResults?.matches?.length ? (
                    <ul className="space-y-1">
                      {mobileQuickResults.matches.slice(0, 5).map((m) => (
                        <li key={m.id}>
                          <Link href={`/matches`} className="block px-2 py-1 rounded hover:bg-white/10">
                            <span className="text-white">{m.matchNumber}: {m.team1} vs {m.team2} — {m.date}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="hover:text-[#d4a574] text-sm">No matches</div>
                  )}
                  <div className="mt-1">
                    <Link href="/matches" className="text-[#d4a574] text-xs hover:text-[#d4a574]">View full schedule</Link>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Link href="/blog/bpl-tickets/">
            <Button className="bg-[#d4a574] pt-3 hover:bg-[#d4a574] cursor-pointer text-white py-2 px-3 text-xs min-w-[120px] whitespace-nowrap">
              BPL 2025 TICKETS
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
              }}
              className="fixed top-0 left-0 w-[70vw] h-screen bg-[#0a0e27] shadow-2xl border-r border-white/15 backdrop-blur-xl ring-1 ring-white/10"
            >
              <div className="flex flex-col h-full text-[14px]">
                {/* Mobile Menu Header */}
                <motion.div
                  className="flex items-center justify-between p-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Link href="/" onClick={toggleMobileMenu}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer"
                    >
                      <Image
                        src={whiteLogo}
                        alt="BPL Logo"
                        width={96}
                        height={32}
                        className="h-8 w-auto"
                        priority
                      />
                    </motion.div>
                  </Link>
                  <motion.button
                    onClick={toggleMobileMenu}
                    className="text-white hover:text-[#d4a574]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SquareChevronLeft className="h-6 w-6" />
                  </motion.button>
                </motion.div>

                {/* Mobile Navigation Links */}
                <motion.div
                  className="flex-1 px-4 py-6 space-y-2 overflow-y-auto thin-scrollbar pr-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {[
                    { to: "/", label: "HOME" },
                    { to: "/matches", label: "MATCHES" },
                    { to: "/teams", label: "TEAMS" },
                    { to: "/news", label: "NEWS" },
                    { to: "/stats", label: "STATS" },
                    { to: "/blog/bpl-tickets/", label: "BPL TICKETS" },
                    { to: "/blog", label: "BLOG" },
                    { to: "/schedule", label: "SCHEDULE" },
                    { to: "/bpl-venue", label: "VENUES" },
                    { to: "/points-table", label: "POINTS TABLE" },
                    { to: "/contact-us", label: "CONTACT" },
                  ].map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.to}
                        className="block text-white hover:text-[#d4a574] font-medium py-3 px-2 text-sm rounded-md hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                        onClick={toggleMobileMenu}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile Social Icons */}
                <motion.div
                  className="p-4 border-t border-white/10"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                >
                  <div className="flex items-center justify-center space-x-4">
                    {[
                      { Icon: FaYoutube, url: "https://www.youtube.com/channel/UCsin34Ns_3LDsvyQnBv73mw" },
                      { Icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61582279622646" },
                      { Icon: FaXTwitter, url: "https://x.com/bplt20league" },
                      { Icon: FaInstagram, url: "https://www.instagram.com/bplt20league/" },
                    ].map(({ Icon, url }, index) => (
                      <motion.a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon
                          className={`${index === 0 ? "w-5 h-5" : "w-4 h-4"} text-white hover:text-[#d4a574] cursor-pointer`}
                        />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

