import anyWhere from '@/public/images/anyWhere.webp'

export interface PlayerStat {
  name: string
  team: string
  image: string
  runs?: number
  wickets?: number
  innings: number
  average?: number
  strikeRate?: number
  economy?: number
}

export interface StatsData {
  topRunScorers: PlayerStat[]
  topWicketTakers: PlayerStat[]
  bestBattingStrikeRates: PlayerStat[]
  bestBowlingEconomy: PlayerStat[]
}

export const statsData: StatsData = {
  topRunScorers: [
    {
      name: "Najmul Hossain Shanto",
      team: "RJW",
      image: anyWhere.src,
      runs: 162,
      innings: 3,
      average: 81.00
    },
    {
      name: "Parvez Hossain Emon",
      team: "SYT",
      image: anyWhere.src,
      runs: 125,
      innings: 2,
      average: 125.00
    },
    {
      name: "Mushfiqur Rahim",
      team: "RJW",
      image: anyWhere.src,
      runs: 103,
      innings: 3,
      average: 103.00
    }
  ],
  topWicketTakers: [
    {
      name: "Faheem Ashraf",
      team: "RAR",
      image: anyWhere.src,
      wickets: 5,
      innings: 1,
      average: 3.40
    },
    {
      name: "Khaled Ahmed",
      team: "SYT",
      image: anyWhere.src,
      wickets: 5,
      innings: 2,
      average: 10.60
    },
    {
      name: "Hasan Mahmud",
      team: "NOE",
      image: anyWhere.src,
      wickets: 5,
      innings: 3,
      average: 12.60
    }
  ],
  bestBattingStrikeRates: [
    {
      name: "Parvez Hossain Emon",
      team: "SYT",
      image: anyWhere.src,
      strikeRate: 168.91,
      innings: 2,
      average: 125.00
    },
    {
      name: "Mohammad Naim",
      team: "CHR",
      image: anyWhere.src,
      strikeRate: 161.29,
      innings: 2,
      average: 25.00
    },
    {
      name: "Litton Das",
      team: "RAR",
      image: anyWhere.src,
      strikeRate: 151.61,
      innings: 1,
      average: 47.00
    }
  ],
  bestBowlingEconomy: [
    {
      name: "Sufiyan Muqeem",
      team: "RAR",
      image: anyWhere.src,
      economy: 3.00,
      innings: 1,
      average: 12.00
    },
    {
      name: "Ripon Mondol",
      team: "RJW",
      image: anyWhere.src,
      economy: 3.25,
      innings: 1,
      average: 3.25
    },
    {
      name: "Imad Wasim",
      team: "DKA",
      image: anyWhere.src,
      economy: 4.00,
      innings: 1,
      average: 5.33
    }
  ]
}

