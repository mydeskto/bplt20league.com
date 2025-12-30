"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const matches = [
  {
    date: "Dec 26",
    match: "Sylhet Titans vs Rajshahi Warriors",
    time: "01:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 26",
    match: "Chattogram Royals vs Noakhali Express",
    time: "06:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 27",
    match: "Dhaka Capitals vs Rajshahi Warriors",
    time: "01:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 27",
    match: "Sylhet Titans vs Noakhali Express",
    time: "06:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 29",
    match: "Chattogram Royals vs Rangpur Riders",
    time: "01:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 29",
    match: "Noakhali Express vs Rajshahi Warriors",
    time: "06:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 30",
    match: "Sylhet Titans vs Chattogram Royals",
    time: "01:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Dec 30",
    match: "Dhaka Capitals vs Rangpur Riders",
    time: "06:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Jan 01",
    match: "Sylhet Titans vs Dhaka Capitals",
    time: "01:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Jan 01",
    match: "Rajshahi Warriors vs Rangpur Riders",
    time: "06:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Jan 02",
    match: "Chattogram Royals vs Dhaka Capitals",
    time: "01:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Jan 02",
    match: "Sylhet Titans vs Rangpur Riders",
    time: "06:00 PM",
    venue: "Sylhet",
  },
  {
    date: "Jan 05",
    match: "Dhaka Capitals vs Rangpur Riders",
    time: "01:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 05",
    match: "Chattogram Royals vs Rajshahi Warriors",
    time: "06:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 06",
    match: "Noakhali Express vs Sylhet Titans",
    time: "01:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 06",
    match: "Chattogram Royals vs Rangpur Riders",
    time: "06:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 08",
    match: "Rangpur Riders vs Sylhet Titans",
    time: "01:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 08",
    match: "Dhaka Capitals vs Rajshahi Warriors",
    time: "06:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 09",
    match: "Chattogram Royals vs Noakhali Express",
    time: "01:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 09",
    match: "Rajshahi Warriors vs Sylhet Titans",
    time: "06:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 11",
    match: "Noakhali Express vs Rangpur Riders",
    time: "01:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 11",
    match: "Chattogram Royals vs Dhaka Capitals",
    time: "06:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 12",
    match: "Rajshahi Warriors vs Rangpur Riders",
    time: "01:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 12",
    match: "Dhaka Capitals vs Noakhali Express",
    time: "06:00 PM",
    venue: "Chattogram",
  },
  {
    date: "Jan 15",
    match: "Dhaka Capitals vs Noakhali Express",
    time: "01:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 15",
    match: "Chattogram Royals vs Sylhet Titans",
    time: "06:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 16",
    match: "Noakhali Express vs Rajshahi Warriors",
    time: "01:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 16",
    match: "Dhaka Capitals vs Sylhet Titans",
    time: "06:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 17",
    match: "Rajshahi Warriors vs Chattogram Royals",
    time: "01:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 17",
    match: "Noakhali Express vs Rangpur Riders",
    time: "06:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 19",
    match: "Eliminator (3rd vs 4th)",
    time: "01:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 19",
    match: "Qualifier 1 (1st vs 2nd)",
    time: "06:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 21",
    match: "Qualifier 2",
    time: "06:00 PM",
    venue: "Mirpur",
  },
  {
    date: "Jan 23",
    match: "Final",
    time: "07:00 PM",
    venue: "Mirpur",
  },
]

export default function NPLSchedule() {


  return (
    <div className="min-h-screen  p-4 md:p-8" style={{ backgroundColor: "#0a0e27" }}>
      <div className="max-w-screen mt-10 mx-auto space-y-8">
        {/* Main Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 ">
            BPL 2026 Schedule, Fixtures, Dates & Match List | Bangladesh Premier League
          </h1>
          <p className="text-slate-300 text-sm md:text-base mb-4">
            Get the complete <strong>BPL 2026 schedule</strong> with match dates, fixtures, venues, timings, playoffs, and final details. Updated officially by BCB.
          </p>
        </div>

        {/* Description Text */}
        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The Bangladesh Premier League (BPL) is one of the most popular T20 cricket leagues globally. Due to Bangladesh's general elections and the ICC T20 World Cup 2026, the tournament has been rescheduled to a December–January window.
          </p>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The <Link href="/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL 2026</Link> will take place from 26 December 2025 to 23 January 2026, featuring 34 matches across Sylhet, Chattogram, and Dhaka. This 12th edition includes league-stage matches, playoffs, and the final, officially scheduled by the Bangladesh Cricket Board (BCB).
          </p>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          This page provides the complete BPL 2026 schedule, including match fixtures, dates, venues, timings, playoff details, points table, and team-wise match schedules. If you are looking for the BPL 2026 schedule, you are in the right place.
          </p>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The tournament will feature league matches followed by Qualifier 1, Eliminator, Qualifier 2, and the Final, giving fans a full lineup of exciting T20 cricket action.
          </p>
        </div>

        {/* BPL 2026 Tournament Overview */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">BPL 2026 Tournament Overview</h2>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-200">
            <div>
              <span className="font-semibold text-[#d4a574]">Tournament:</span> Bangladesh Premier League
            </div>
            <div>
              <span className="font-semibold text-[#d4a574]">Edition:</span> 12th
            </div>
            <div>
              <span className="font-semibold text-[#d4a574]">Schedule Dates:</span> 26 December 2025 – 23 January 2026
            </div>
            <div>
              <span className="font-semibold text-[#d4a574]">Schedule Announcement Time:</span> 1:00 PM (BST)
            </div>
            <div>
              <span className="font-semibold text-[#d4a574]">Final Match:</span> January 2026
            </div>
            <div>
              <span className="font-semibold text-[#d4a574]">Prize Money:</span> BDT 40 Crore
            </div>
          </div>
        </div>

        {/* BPL Fixtures Heading */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">BPL 2026 Full Match Schedule & Fixtures</h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The official BPL 2026 Schedule has been released, confirming the tournament will start on 26 December 2025 and conclude with the grand final on 23 January 2026.
          </p>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          Matches will be played across three major venues:
          </p>
          <ul className="text-slate-200 text-base md:text-lg leading-relaxed ml-6 space-y-2 list-disc">
            <li>
              <Link href="/bpl-venue/sylhet-international-cricket-stadium" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                Sylhet
              </Link>
            </li>
            <li>
              <Link href="/bpl-venue/zahur-ahmed-chowdhury-stadium-chattogram" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                Chattogram
              </Link>
            </li>
            <li>
              <Link href="/bpl-venue/shere-bangla-national-stadium-dhaka" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                Dhaka
              </Link>
            </li>
          </ul>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The league phase is divided into venue-based phases, followed by the knockout rounds in Dhaka. Below is the complete match-by-match fixture list, including dates, venues, and match timings.
          </p>
        </div>
       

        {/* Fixtures Table */}
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600 hover:bg-slate-700/50">
                    <TableHead className="text-white font-semibold text-center py-4">Date</TableHead>
                    <TableHead className="text-white font-semibold text-center py-4">Time</TableHead>
                    <TableHead className="text-white font-semibold text-center py-4">Match</TableHead>
                    <TableHead className="text-white font-semibold text-center py-4 hidden md:table-cell">
                      Venue
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match, index) => (
                    <TableRow key={index} className="border-slate-600 hover:bg-slate-700/30">
                      <TableCell className="text-slate-200 text-center py-3 font-medium">{match.date}</TableCell>
                      <TableCell className="text-slate-200 text-center py-3">{match.time}</TableCell>
                      <TableCell className="text-slate-200 text-center py-3">{match.match}</TableCell>
                      <TableCell className="text-slate-200 text-center py-3 hidden md:table-cell">
                            {match.venue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* BPL 2026 Playoffs Structure */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">BPL 2026 Playoffs Structure</h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The playoff format follows the standard BPL system:
          </p>
          <div className="space-y-3 ml-6">
            <div className="text-slate-200">
              <span className="font-semibold text-[#d4a574]">Qualifier 1:</span> 1st vs 2nd place
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li>• Winner advances directly to the Final</li>
                <li>• Loser gets another chance in Qualifier 2</li>
              </ul>
            </div>
            <div className="text-slate-200">
              <span className="font-semibold text-[#d4a574]">Eliminator:</span> 3rd vs 4th place
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li>• Loser is eliminated</li>
                <li>• Winner moves to Qualifier 2</li>
              </ul>
            </div>
            <div className="text-slate-200">
              <span className="font-semibold text-[#d4a574]">Qualifier 2:</span> Loser of Qualifier 1 vs Winner of Eliminator
            </div>
            <div className="text-slate-200">
              <span className="font-semibold text-[#d4a574]">Final:</span> Winner of Qualifier 1 vs Winner of Qualifier 2
            </div>
          </div>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          Exact playoff dates and timings are confirmed in the official fixture list released by the Bangladesh Cricket Board.
          </p>
        </div>

        {/* BPL 2026 Final Date & Venue */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">BPL 2026 Final Date & Venue</h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          The BPL 2026 Final will be played on 23 January 2026. As with recent editions, the final and all playoff matches will be hosted in Dhaka, most likely at the Sher-e-Bangla National Cricket Stadium.
          </p>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          This venue has hosted multiple BPL finals, including the 2025 final, and is known for its excellent facilities and crowd atmosphere.
          </p>
        </div>

        {/* BPL Match Timings */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">BPL Match Timings and Daily Schedule</h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          BPL 2026 matches are divided into day and night games:
          </p>
          <ul className="text-slate-200 text-base md:text-lg leading-relaxed ml-6 space-y-2 list-disc">
            <li>Day matches usually start early afternoon</li>
            <li>Night matches are played under lights</li>
          </ul>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          For international viewers, match times are converted from Bangladesh Standard Time (UTC+6) to GMT, IST, and BST to make following the tournament easier worldwide.
          </p>
        </div>

        {/* Team-Wise Match Schedules */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">Team-Wise Match Schedules</h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          Detailed schedules are available for all teams, including:
          </p>
          <ul className="text-slate-200 text-base md:text-lg leading-relaxed ml-6 space-y-2 list-disc">
            <li><Link href="/teams/sylhet-titans" className="text-[#d4a574] hover:text-[#d4a574] underline">Sylhet Titans</Link></li>
            <li><Link href="/teams/chattogram-royals" className="text-[#d4a574] hover:text-[#d4a574] underline">Chattogram Royals</Link></li>
            <li><Link href="/teams/dhaka-capitals" className="text-[#d4a574] hover:text-[#d4a574] underline">Dhaka Capitals</Link></li>
            <li><Link href="/teams/noakhali-express" className="text-[#d4a574] hover:text-[#d4a574] underline">Noakhali Express</Link></li>
            <li><Link href="/teams/rangpur-riders" className="text-[#d4a574] hover:text-[#d4a574] underline">Rangpur Riders</Link></li>
            <li><Link href="/teams/rajshahi-warriors" className="text-[#d4a574] hover:text-[#d4a574] underline">Rajshahi Warriors</Link></li>
          </ul>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          Each team's fixture list includes opponents and match dates, helping fans track their favorite teams throughout the season.
          </p>
        </div>

        {/* How to watch BPL 2026 Live online */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">How to watch BPL 2026 Live online</h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          You can watch BPL 2026 online, whether you're in Bangladesh or abroad:
          </p>
          
          <div className="overflow-x-auto">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-600 hover:bg-slate-700/50">
                        <TableHead className="text-white font-semibold py-4">Region</TableHead>
                        <TableHead className="text-white font-semibold py-4">TV Broadcast</TableHead>
                        <TableHead className="text-white font-semibold py-4">Online Streaming Platforms</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-slate-600 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200 py-3 font-medium">Bangladesh</TableCell>
                        <TableCell className="text-slate-200 py-3">T Sports, Gazi TV</TableCell>
                        <TableCell className="text-slate-200 py-3">
                          <Link href="https://www.tsports.com/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                            T Sports App
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-600 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200 py-3 font-medium">India</TableCell>
                        <TableCell className="text-slate-200 py-3">N/A</TableCell>
                        <TableCell className="text-slate-200 py-3">
                          <Link href="https://www.fancode.com/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                            FanCode
                          </Link> (subscription-based)
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-600 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200 py-3 font-medium">Pakistan</TableCell>
                        <TableCell className="text-slate-200 py-3">Ten Sports, Geo Super</TableCell>
                        <TableCell className="text-slate-200 py-3">
                          <Link href="https://www.tapmad.com/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                            Tapmad
                          </Link> (OTT platform)
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-600 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200 py-3 font-medium">Rest of World</TableCell>
                        <TableCell className="text-slate-200 py-3">Various local broadcasters</TableCell>
                        <TableCell className="text-slate-200 py-3">
                          <Link href="https://www.youtube.com/c/rabbitholebdsports" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">
                            RabbitholeBD YouTube channel
                          </Link>, Smartcric (OTT/digital)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-slate-200 text-base md:text-lg leading-relaxed text-pretty">
          Live streaming is not hosted directly, but official viewing options are regularly updated.
          </p>
        </div>


        {/* FAQs Section */}
        <div className="text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        </div>

        <FAQsAccordion />
      </div>
    </div>
  )
}

// FAQ Accordion Component
function FAQsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Which teams are playing in BPL 2026?",
      answer: "The BPL 2026 will feature six teams: Sylhet Titans, Chattogram Royals, Dhaka Capitals, Noakhali Express, Rangpur Riders, and Rajshahi Warriors. Each team will compete in league matches followed by playoffs."
    },
    {
      question: "Who won the BPL final in 2025?",
      answer: "The BPL 2025 final was won by Fortune Barishal, who defeated Chattogram Kings to claim the championship."
    },
    {
      question: "Which country hosts the BPL T20?",
      answer: "The Bangladesh Premier League (BPL) is hosted in Bangladesh. Matches are played across major cities including Dhaka, Sylhet, and Chattogram."
    },
    {
      question: "How many teams play in BPL 2026?",
      answer: "Six teams will compete in the 12th edition of the BPL, with all teams playing league matches before qualifying for the playoffs."
    },
    {
      question: "Where can I find the BPL 2026 schedule?",
      answer: "The full BPL 2026 schedule is available online with complete match fixtures, venues, timings, and playoff dates. Fans can also download a PDF version for easy reference."
    },
    {
      question: "Can I view BPL 2026 matches live online?",
      answer: "Yes, matches are broadcast on official channels. In Bangladesh, you can watch via T Sports and Gazi TV, and internationally through digital platforms like FanCode (India) and Tapmad (Pakistan)."
    }
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-slate-700 bg-slate-800/50 h-fit overflow-hidden transition-all rounded-lg p-2"
        >
          <button
            onClick={() => toggleQuestion(index)}
            className="w-full text-left p-2 flex items-center justify-between rounded-lg hover:bg-slate-700/30 transition-colors group"
          >
            <span className="text-white font-semibold text-base md:text-lg pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

