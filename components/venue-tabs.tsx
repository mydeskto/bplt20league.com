'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import type { Venue } from '@/data/vanue-data'
import { venuesData } from '@/data/vanue-data'

interface VenueTabsProps {
  venue: Venue
  currentTime: string
}

export default function VenueTabs({ venue, currentTime }: VenueTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stats', label: 'Stats & Records' },
    { id: 'fixtures', label: 'Fixtures' }
  ]

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="border-b border-white/20 mb-6 sm:mb-8">
        <nav className="flex flex-wrap gap-4 sm:gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 cursor-pointer font-medium whitespace-nowrap text-sm sm:text-base transition-colors ${
                activeTab === tab.id
                  ? 'text-[#d4a574] text-white'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden mb-6 sm:mb-8">
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <tbody>
                 
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Also known as</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.alternateName}</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Established</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{venue.established}</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Capacity</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{venue.capacity.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">End Names</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">
                      {venue.slug === 'mulpani-cricket-ground-kathmandu' ? 'Gokarna Forest End, Mulpani End' : 
                       venue.slug === 'tribhuvan-university-cricket-ground-kirtipur' ? 'University End, Kirtipur End' :
                       'North End, South End'}
                    </td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Home Teams</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.homeTeam}</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Current Local Time</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{currentTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">{venue.description}</p>
          </div>

          {/* Pitch Description */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Pitch & Playing Conditions</h3>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">{venue.pitchDescription}</p>
          </div>

          {/* Stadium Details */}
          {/* <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Stadium Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <span className="text-xs sm:text-sm font-medium text-gray-300">Owner</span>
                <p className="text-base sm:text-lg font-semibold text-white break-words">{venue.owner}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <span className="text-xs sm:text-sm font-medium text-gray-300">Pitch Type</span>
                <p className="text-base sm:text-lg font-semibold text-white break-words">{venue.pitchType}</p>
              </div>
            </div>
          </div> */}

          {/* Map Section */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Stadium Location</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-white/20">
              <p className="text-gray-200 text-sm sm:text-base">
                <span className="font-semibold text-white">Address:</span> {venue.address.fullAddress}
              </p>
            </div>
            <div className="h-64 sm:h-80 lg:h-96 bg-white/5 rounded-lg overflow-hidden border border-white/20">
              <iframe
                src={venue.mapEmbed.match(/src="([^"]+)"/)?.[1] || ''}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title={`Map location of ${venue.name}`}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Stats & Records</h2>
          
          {/* About Information */}
          {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 border-b border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">About {venue.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <tbody>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base w-1/3">About</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base"></td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Also known as</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.alternateName}</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Established</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{venue.established}</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Capacity</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{venue.capacity.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">End Names</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">
                      {venue.slug === 'mulpani-cricket-ground-kathmandu' ? 'Gokarna Forest End, Mulpani End' : 
                       venue.slug === 'tribhuvan-university-cricket-ground-kirtipur' ? 'University End, Kirtipur End' :
                       'North End, South End'}
                    </td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Home Teams</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.homeTeam}</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Current Local Time</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{currentTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Stadium Details */}
          {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Stadium Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <span className="text-xs sm:text-sm font-medium text-gray-300">Owner</span>
                <p className="text-base sm:text-lg font-semibold text-white break-words">{venue.owner}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <span className="text-xs sm:text-sm font-medium text-gray-300">Pitch Type</span>
                <p className="text-base sm:text-lg font-semibold text-white break-words">{venue.pitchType}</p>
              </div>
            </div> */}
          {/* </div> */}

          {venue.stats ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden mb-6 sm:mb-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <tbody>
                    {venue.stats.highestT20Total && (
                      <tr className="border-b border-white/20">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Highest T20 Total</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.stats.highestT20Total}</td>
                      </tr>
                    )}
                    {venue.stats.lowestT20Total && (
                      <tr className="border-b border-white/20">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Lowest T20 Total</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.stats.lowestT20Total}</td>
                      </tr>
                    )}
                    {venue.stats.highestIndividualScore && (
                      <tr className="border-b border-white/20">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Highest Individual Score</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.stats.highestIndividualScore}</td>
                      </tr>
                    )}
                    {venue.stats.bestBowlingFigures && (
                      <tr className="border-b border-white/20">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Best Bowling Figures</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.stats.bestBowlingFigures}</td>
                      </tr>
                    )}
                    {venue.stats.mostMatchesHosted && (
                      <tr className="border-b border-white/20">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Most Matches Hosted (BPL)</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.stats.mostMatchesHosted}</td>
                      </tr>
                    )}
                    {venue.stats.recordCrowd && (
                      <tr>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">Record Crowd</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base break-words">{venue.stats.recordCrowd}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 mt-6">
              <p className="text-gray-300 text-center text-sm">Additional stats and records will be available soon...</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'fixtures' && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#d4a574]" />
            BPL 2026 Fixtures
          </h2>
          
          {/* Matches Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Matches at {venue.name}</h3>
              <p className="text-gray-300 text-sm">All scheduled matches for this venue</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Date</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Time</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Match</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {venue.matches
                    .sort((a, b) => {
                      // Handle date formats like "Jan 15" or "2025-12-15"
                      const dateA = a.date.includes('-') ? new Date(a.date).getTime() : new Date(`${a.date} 2026`).getTime()
                      const dateB = b.date.includes('-') ? new Date(b.date).getTime() : new Date(`${b.date} 2026`).getTime()
                      return dateA - dateB
                    })
                    .map((match, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-200">
                          {match.date.includes('-') 
                            ? new Date(match.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : match.date
                          }
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-200">{match.time}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-white break-words">{match.match}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-300">{match.venue || venue.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* All Venues Table */}
          {/* <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#d4a574]" />
              All Grounds Schedule
            </h3>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Date</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Time</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Match</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-white">Venue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {venuesData.venues
                      .flatMap((venueData) =>
                        venueData.matches.map((match, index) => ({
                          ...match,
                          venueName: venueData.name,
                          venueSlug: venueData.slug,
                          key: `${venueData.slug}-${index}`
                        }))
                      )
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((match) => (
                        <tr key={match.key} className="hover:bg-white/5 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-200">
                            {new Date(match.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-200">{match.time}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-white break-words">{match.match}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-300">{match.venueName}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  )
}
