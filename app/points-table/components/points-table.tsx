import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { pointsData } from "@/data/points-data"

const getShortName = (teamName: string) => {
  const shortNames: { [key: string]: string } = {
    "Pokhara Avengers": "POK",
    "Kathmandu Gurkhas": "KTM",
    "Sudurpaschim Royals": "SUD",
    "Janakpur Bolts": "JAN",
    "Lumbini Lions": "LUM",
    "Chitwan Rhinos": "CHI",
    "Biratnagar Kings": "BIR",
    "Karnali Yaks": "KAR",
  }
  return shortNames[teamName] || teamName.substring(0, 3).toUpperCase()
}

export default function PointsTable() {
  return (
    <div className="w-full py-8 px-4 font-inter tracking-wider" style={{ backgroundColor: "#0a0e27" }}>
      <div className="max-w-[100vw] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-left text-[#d4a574]">BPL 2026 POINTS TABLE</h2>
        <h3 className="text-md md:text-lg font-bold mb-8 text-left text-[#d4a574]">Bangladesh Premier League 2026 Standings</h3>

        <Card
          className="border-2 border-[#d4a574] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          style={{  backgroundColor: "#0f172a" }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-600 hover:bg-transparent">
                  <TableHead className="text-white font-semibold text-left py-4 px-2 md:px-6 text-xs md:text-sm">
                    <span className="hidden md:inline">Team</span>
                    <span className="md:hidden">Team</span>
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center py-4 px-1 md:px-4 text-xs md:text-sm">
                    <span className="hidden md:inline">Matches</span>
                    <span className="md:hidden">M</span>
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center py-4 px-1 md:px-4 text-xs md:text-sm">
                    <span className="hidden md:inline">Won</span>
                    <span className="md:hidden">W</span>
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center py-4 px-1 md:px-4 text-xs md:text-sm">
                    <span className="hidden md:inline">Loss</span>
                    <span className="md:hidden">L</span>
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center py-4 px-1 md:px-4 text-xs md:text-sm">
                    <span className="hidden md:inline">No Result</span>
                    <span className="md:hidden">NR</span>
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center py-4 px-1 md:px-4 text-xs md:text-sm">
                    <span className="hidden md:inline">Net Run Rate</span>
                    <span className="md:hidden">NRR</span>
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center py-4 px-1 md:px-4 text-xs md:text-sm">
                    <span className="hidden md:inline">Points</span>
                    <span className="md:hidden">Pts</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pointsData.map((team, index) => (
                  <TableRow
                    key={team.position}
                    className={`border-b border-gray-700 hover:bg-cyan-900/10 transition-all duration-200 cursor-pointer group ${
                      index < 4 ? "hover:bg-green-900/10" : "hover:bg-red-900/10"
                    }`}
                  >
                    <TableCell className="py-3 px-2 md:px-6">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span
                          className={`font-bold text-xs md:text-base min-w-[15px] md:min-w-[20px] hidden md:inline ${
                            team.position <= 4 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {team.position}
                        </span>
                        <div className="w-6 h-6 md:w-10 md:h-10 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-200 hidden md:block">
                          <Image
                            src={team.logo || "/placeholder.svg"}
                            alt={`${team.team} logo`}
                            fill
                            className="object-contain"
                            loading="lazy"
                          />
                        </div>
                        <Link 
                          href={team.link || "#"} 
                          className="text-white font-medium text-xs md:text-base group-hover:text-[#d4a574] transition-colors hover:underline"
                        >
                          <span className="md:hidden">{getShortName(team.team)}</span>
                          <span className="hidden md:inline">{team.team}</span>
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-white text-center py-3 px-1 md:px-4 text-xs md:text-base group-hover:text-[#d4a574] transition-colors">
                      {team.matches}
                    </TableCell>
                    <TableCell className="text-green-400 text-center py-3 px-1 md:px-4 text-xs md:text-base font-semibold">
                      {team.won}
                    </TableCell>
                    <TableCell className="text-red-400 text-center py-3 px-1 md:px-4 text-xs md:text-base font-semibold">
                      {team.loss}
                    </TableCell>
                    <TableCell className="text-[#d4a574] text-center py-3 px-1 md:px-4 text-xs md:text-base">
                      {team.noResult}
                    </TableCell>
                    <TableCell
                      className={`text-center py-3 px-1 md:px-4 text-xs md:text-base font-semibold ${
                        team.netRunRate.startsWith("+") ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {team.netRunRate}
                    </TableCell>
                    <TableCell className="text-[#d4a574] text-center py-3 px-1 md:px-4 text-xs md:text-base font-bold">
                      {team.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}
