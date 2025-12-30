"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Link as LinkIcon, MapPin } from "lucide-react";
import { toast } from "sonner";
import VenueTabs from "@/components/venue-tabs";
import { venuesData } from "@/data/vanue-data";

function VenueContent({ venue }: { venue: any }) {

  const handleCopyLink = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const currentTime = new Date().toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short'
  })


  return (
    <>
      {/* Content Overlay */}
      <div className="flex flex-col justify-self-start sm:px-6 pt-6 font-inter ">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl pl-2 md:pl-0 font-bold text-white mb-2">{venue.name}</h1>
          <div className="flex flex-wrap gap-4">
            <div style={{ backgroundColor: "#0a0e27" }} className="bg-opacity-90 px-4 py-1 rounded-lg">
              <p className="text-white text-sm font-semibold tracking-widest">Capacity: {venue.capacity.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div className="relative h-126 w-screen left-1/2 right-1/2 -mx-[51vw] overflow-hidden">
        <Image 
          src={venue.image || "/placeholder.svg"} 
          alt={venue.name} 
          fill 
          className="object-center" 
          loading="lazy"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>


      {/* Two Column Layout */}
      <div className="flex flex-col xl:flex-row ">
        {/* Left Sidebar - Navigation */}
        <div className="w-full xl:w-1/3  backdrop-blur-sm h-160 overflow-y-auto scrollbar-none pt-4 lg:pt-6 ">
          {/* Current Venue Header */}
          <div className="bg-white text-white p-4 sm:p-6 border border-white/30 rounded-lg m-2" style={{ backgroundColor: '#0a0e27' }}>
            <h1 className="text-lg sm:text-xl font-bold mb-2 break-words">{venue.name}</h1>
            <p className="text-white mb-1 text-sm sm:text-base opacity-80">{venue.address.addressLocality}</p>
            <p className="text-white text-xs sm:text-sm break-words opacity-70">{venue.address.fullAddress}</p>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
              <button 
                
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all border border-white/30"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0a0e27]" />
              </button>
              <button  className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all border border-white/30">
                <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0a0e27]" />
              </button>
            </div>
          </div>

          {/* BPL 2026 Venues Navigation */}
          <div className="p-4 sm:p-6 border border-white/20 rounded-lg mx-2 mb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">BPL 2026 Venues</h2>
              <Link
                href="/bpl-venue"
                className="px-3 py-2 text-sm font-medium border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-200 self-start sm:self-auto text-white"

              >
                SEE ALL
              </Link>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {/* All venues in original order */}
              {venuesData.venues.map((venueItem) => {
                const isSelected = venueItem.slug === venue.slug
                const countryCode = venueItem.address.addressCountry === "BD" ? "BAN" : venueItem.address.addressCountry

                if (isSelected) {
                  return (
                    <div
                      key={venueItem.slug}
                      className="relative flex items-center space-x-3 p-3 bg-white/20 rounded-lg border border-white/40"
                    >
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-sm sm:text-base break-words">{venueItem.name}</p>
                        <p className="text-xs sm:text-sm text-white opacity-80">{venueItem.address.addressLocality}, {countryCode}</p>
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={venueItem.slug}
                    href={`/bpl-venue/${venueItem.slug}`}
                    className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors group"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm sm:text-base break-words group-hover:text-white transition-colors">{venueItem.name}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{venueItem.address.addressLocality}, {countryCode}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-full xl:w-2/3 p-3 sm:p-4 lg:p-6 xl:p-8 h-full scrollbar-none ">
          <VenueTabs venue={venue} currentTime={currentTime} />
        </div>
      </div>
    </>
  )
}

export default VenueContent

