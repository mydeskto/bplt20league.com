// Team logo imports
import SylhetTitansLogo from '@/public/images/teams/Sylhet Titans.jpg';
import ChattogramRoyalsLogo from '@/public/images/teams/Chattogram Royals.jpg';
import DhakaCapitalsLogo from '@/public/images/teams/Dhaka Capitals.jpg';
import NoakhaliExpressLogo from '@/public/images/teams/Noakhali Express.jpg';
import RajshahiWarriorsLogo from '@/public/images/teams/Rajshahi Warriors.jpg';
import RangpurRidersLogo from '@/public/images/teams/Rangpur Riders.png';

// Helper function to get team logo
const getTeamLogo = (teamName: string): string => {
  const logoMap: { [key: string]: string } = {
    'Sylhet Titans': typeof SylhetTitansLogo === 'string' ? SylhetTitansLogo : SylhetTitansLogo.src,
    'Chattogram Royals': typeof ChattogramRoyalsLogo === 'string' ? ChattogramRoyalsLogo : ChattogramRoyalsLogo.src,
    'Dhaka Capitals': typeof DhakaCapitalsLogo === 'string' ? DhakaCapitalsLogo : DhakaCapitalsLogo.src,
    'Noakhali Express': typeof NoakhaliExpressLogo === 'string' ? NoakhaliExpressLogo : NoakhaliExpressLogo.src,
    'Rajshahi Warriors': typeof RajshahiWarriorsLogo === 'string' ? RajshahiWarriorsLogo : RajshahiWarriorsLogo.src,
    'Rangpur Riders': typeof RangpurRidersLogo === 'string' ? RangpurRidersLogo : RangpurRidersLogo.src,
    'TBA': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/391989-cqkiosfycHQHEu4PJ2g6C6yhvlVjoB.png',
  };
  return logoMap[teamName] || '';
};

interface Team {
  name: string;
  logo: string;
  score?: string;
}

interface Match {
  id: number;
  matchNumber: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'live';
  matchType: string;
  team1: Team;
  team2: Team;
  winner?: string;
  result?: string;
  keywords: string[];
}

export const matchesData = {
  matches: [
    {
      id: 1,
      matchNumber: "Match 1",
      date: "Dec 26",
      time: "01:00 PM",
      venue: "Sylhet",
      status: "completed" as const,
      matchType: "1st Match",
      team1: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans"),
        score: "190/5"
      },
      team2: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors"),
        score: "192/2 (19.4/20 ov, T:191)"
      },
      winner: "Rajshahi Warriors",
      result: "Rajshahi won by 8 wickets (with 2 balls remaining)",
      keywords: [
        "BPL 2026 Match 1",
        "Sylhet Titans vs Rajshahi Warriors",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rajshahi Warriors vs Sylhet Titans",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 2,
      matchNumber: "Match 2",
      date: "Dec 26",
      time: "06:00 PM",
      venue: "Sylhet",
      status: "completed" as const,
      matchType: "2nd Match (N)",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals"),
        score: "174/6"
      },
      team2: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express"),
        score: "109 (16.5/20 ov, T:175)"
      },
      winner: "Chattogram Royals",
      result: "Chattogram won by 65 runs",
      keywords: [
        "BPL 2026 Match 2",
        "Chattogram Royals vs Noakhali Express",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Noakhali Express vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 3,
      matchNumber: "Match 3",
      date: "Dec 27",
      time: "12:00 PM",
      venue: "Sylhet",
      status: "completed" as const,
      matchType: "3rd Match",
      team1: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors"),
        score: "132/8"
      },
      team2: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals"),
        score: "134/5 (18.5/20 ov, T:133)"
      },
      winner: "Dhaka Capitals",
      result: "Dhaka won by 5 wickets (with 7 balls remaining)",
      keywords: [
        "BPL 2026 Match 3",
        "Dhaka Capitals vs Rajshahi Warriors",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rajshahi Warriors vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 4,
      matchNumber: "Match 4",
      date: "Dec 27",
      time: "05:00 PM",
      venue: "Sylhet",
      status: "completed" as const,
      matchType: "4th Match (N)",
      team1: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express"),
        score: "143/7"
      },
      team2: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans"),
        score: "144/9 (20/20 ov, T:144)"
      },
      winner: "Sylhet Titans",
      result: "Sylhet won by 1 wicket (with 0 balls remaining)",
      keywords: [
        "BPL 2026 Match 4",
        "Sylhet Titans vs Noakhali Express",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Noakhali Express vs Sylhet Titans",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 5,
      matchNumber: "Match 5",
      date: "Dec 29",
      time: "12:00 PM",
      venue: "Sylhet",
      status: "completed" as const,
      matchType: "5th Match",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals"),
        score: "102"
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders"),
        score: "107/3 (15/20 ov, T:103)"
      },
      winner: "Rangpur Riders",
      result: "Rangpur won by 7 wickets (with 30 balls remaining)",
      keywords: [
        "BPL 2026 Match 5",
        "Chattogram Royals vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 6,
      matchNumber: "Match 6",
      date: "Dec 29",
      time: "05:00 PM",
      venue: "Sylhet",
      status: "completed" as const,
      matchType: "6th Match (N)",
      team1: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express"),
        score: "124/8"
      },
      team2: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors"),
        score: "125/4 (17.5/20 ov, T:125)"
      },
      winner: "Rajshahi Warriors",
      result: "Rajshahi won by 6 wickets (with 13 balls remaining)",
      keywords: [
        "BPL 2026 Match 6",
        "Noakhali Express vs Rajshahi Warriors",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rajshahi Warriors vs Noakhali Express",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 7,
      matchNumber: "Match 7",
      date: "Dec 30",
      time: "12:00 PM",
      venue: "Sylhet",
      status: "upcoming" as const,
      matchType: "7th Match",
      team1: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      team2: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      keywords: [
        "BPL 2026 Match 7",
        "Sylhet Titans vs Chattogram Royals",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Chattogram Royals vs Sylhet Titans",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 8,
      matchNumber: "Match 8",
      date: "Dec 30",
      time: "05:00 PM",
      venue: "Sylhet",
      status: "upcoming" as const,
      matchType: "8th Match (N)",
      team1: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 8",
        "Dhaka Capitals vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 9,
      matchNumber: "Match 9",
      date: "Jan 01",
      time: "12:00 PM",
      venue: "Sylhet",
      status: "upcoming" as const,
      matchType: "9th Match",
      team1: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      team2: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      keywords: [
        "BPL 2026 Match 9",
        "Sylhet Titans vs Dhaka Capitals",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Dhaka Capitals vs Sylhet Titans",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 10,
      matchNumber: "Match 10",
      date: "Jan 01",
      time: "05:00 PM",
      venue: "Sylhet",
      status: "upcoming" as const,
      matchType: "10th Match (N)",
      team1: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 10",
        "Rajshahi Warriors vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Rajshahi Warriors",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 11,
      matchNumber: "Match 11",
      date: "Jan 02",
      time: "01:00 PM",
      venue: "Sylhet",
      status: "upcoming" as const,
      matchType: "11th Match",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      team2: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      keywords: [
        "BPL 2026 Match 11",
        "Chattogram Royals vs Dhaka Capitals",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Dhaka Capitals vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 12,
      matchNumber: "Match 12",
      date: "Jan 02",
      time: "06:00 PM",
      venue: "Sylhet",
      status: "upcoming" as const,
      matchType: "12th Match (N)",
      team1: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 12",
        "Sylhet Titans vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Sylhet cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Sylhet Titans",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 13,
      matchNumber: "Match 13",
      date: "Jan 05",
      time: "12:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "13th Match",
      team1: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 13",
        "Dhaka Capitals vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 14,
      matchNumber: "Match 14",
      date: "Jan 05",
      time: "05:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "14th Match (N)",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      team2: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      keywords: [
        "BPL 2026 Match 14",
        "Chattogram Royals vs Rajshahi Warriors",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rajshahi Warriors vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 15,
      matchNumber: "Match 15",
      date: "Jan 06",
      time: "12:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "15th Match",
      team1: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      team2: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      keywords: [
        "BPL 2026 Match 15",
        "Noakhali Express vs Sylhet Titans",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Sylhet Titans vs Noakhali Express",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 16,
      matchNumber: "Match 16",
      date: "Jan 06",
      time: "05:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "16th Match (N)",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 16",
        "Chattogram Royals vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 17,
      matchNumber: "Match 17",
      date: "Jan 08",
      time: "12:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "17th Match",
      team1: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      team2: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      keywords: [
        "BPL 2026 Match 17",
        "Rangpur Riders vs Sylhet Titans",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Sylhet Titans vs Rangpur Riders",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 18,
      matchNumber: "Match 18",
      date: "Jan 08",
      time: "05:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "18th Match (N)",
      team1: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      team2: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      keywords: [
        "BPL 2026 Match 18",
        "Dhaka Capitals vs Rajshahi Warriors",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rajshahi Warriors vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 19,
      matchNumber: "Match 19",
      date: "Jan 09",
      time: "01:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "19th Match",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      team2: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      keywords: [
        "BPL 2026 Match 19",
        "Chattogram Royals vs Noakhali Express",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Noakhali Express vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 20,
      matchNumber: "Match 20",
      date: "Jan 09",
      time: "06:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "20th Match (N)",
      team1: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      team2: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      keywords: [
        "BPL 2026 Match 20",
        "Rajshahi Warriors vs Sylhet Titans",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Sylhet Titans vs Rajshahi Warriors",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 21,
      matchNumber: "Match 21",
      date: "Jan 11",
      time: "12:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "21st Match",
      team1: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 21",
        "Noakhali Express vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Noakhali Express",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 22,
      matchNumber: "Match 22",
      date: "Jan 11",
      time: "05:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "22nd Match (N)",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      team2: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      keywords: [
        "BPL 2026 Match 22",
        "Chattogram Royals vs Dhaka Capitals",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Dhaka Capitals vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 23,
      matchNumber: "Match 23",
      date: "Jan 12",
      time: "12:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "23rd Match",
      team1: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 23",
        "Rajshahi Warriors vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Rajshahi Warriors",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 24,
      matchNumber: "Match 24",
      date: "Jan 12",
      time: "05:00 PM",
      venue: "Chattogram",
      status: "upcoming" as const,
      matchType: "24th Match (N)",
      team1: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      team2: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      keywords: [
        "BPL 2026 Match 24",
        "Dhaka Capitals vs Noakhali Express",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Chattogram cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Noakhali Express vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 25,
      matchNumber: "Match 25",
      date: "Jan 15",
      time: "12:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "25th Match",
      team1: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      team2: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      keywords: [
        "BPL 2026 Match 25",
        "Dhaka Capitals vs Noakhali Express",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Noakhali Express vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 26,
      matchNumber: "Match 26",
      date: "Jan 15",
      time: "05:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "26th Match (N)",
      team1: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      team2: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      keywords: [
        "BPL 2026 Match 26",
        "Chattogram Royals vs Sylhet Titans",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Sylhet Titans vs Chattogram Royals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 27,
      matchNumber: "Match 27",
      date: "Jan 16",
      time: "01:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "27th Match",
      team1: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      team2: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      keywords: [
        "BPL 2026 Match 27",
        "Noakhali Express vs Rajshahi Warriors",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rajshahi Warriors vs Noakhali Express",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 28,
      matchNumber: "Match 28",
      date: "Jan 16",
      time: "06:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "28th Match (N)",
      team1: {
        name: "Dhaka Capitals",
        logo: getTeamLogo("Dhaka Capitals")
      },
      team2: {
        name: "Sylhet Titans",
        logo: getTeamLogo("Sylhet Titans")
      },
      keywords: [
        "BPL 2026 Match 28",
        "Dhaka Capitals vs Sylhet Titans",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Sylhet Titans vs Dhaka Capitals",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 29,
      matchNumber: "Match 29",
      date: "Jan 17",
      time: "12:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "29th Match",
      team1: {
        name: "Rajshahi Warriors",
        logo: getTeamLogo("Rajshahi Warriors")
      },
      team2: {
        name: "Chattogram Royals",
        logo: getTeamLogo("Chattogram Royals")
      },
      keywords: [
        "BPL 2026 Match 29",
        "Rajshahi Warriors vs Chattogram Royals",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Chattogram Royals vs Rajshahi Warriors",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 30,
      matchNumber: "Match 30",
      date: "Jan 17",
      time: "05:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "30th Match (N)",
      team1: {
        name: "Noakhali Express",
        logo: getTeamLogo("Noakhali Express")
      },
      team2: {
        name: "Rangpur Riders",
        logo: getTeamLogo("Rangpur Riders")
      },
      keywords: [
        "BPL 2026 Match 30",
        "Noakhali Express vs Rangpur Riders",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "Rangpur Riders vs Noakhali Express",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 31,
      matchNumber: "Eliminator",
      date: "Jan 19",
      time: "12:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "Eliminator",
      team1: {
        name: "TBA",
        logo: getTeamLogo("TBA")
      },
      team2: {
        name: "TBA",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/392046-hXfFTHzoq2lnHjeLNwUI7QlTqtocvg.png"
      },
      keywords: [
        "BPL 2026 Eliminator",
        "BPL Eliminator",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 32,
      matchNumber: "Qualifier 1",
      date: "Jan 19",
      time: "05:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "Qualifier 1 (N)",
      team1: {
        name: "TBA",
        logo: getTeamLogo("TBA")
      },
      team2: {
        name: "TBA",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/392046-hXfFTHzoq2lnHjeLNwUI7QlTqtocvg.png"
      },
      keywords: [
        "BPL 2026 Qualifier 1",
        "BPL Qualifier 1",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 33,
      matchNumber: "Qualifier 2",
      date: "Jan 21",
      time: "05:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "Qualifier 2 (N)",
      team1: {
        name: "TBA",
        logo: getTeamLogo("TBA")
      },
      team2: {
        name: "TBA",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/392046-hXfFTHzoq2lnHjeLNwUI7QlTqtocvg.png"
      },
      keywords: [
        "BPL 2026 Qualifier 2",
        "BPL Qualifier 2",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    },
    {
      id: 34,
      matchNumber: "Final",
      date: "Jan 23",
      time: "05:00 PM",
      venue: "Mirpur",
      status: "upcoming" as const,
      matchType: "Final (N)",
      team1: {
        name: "TBA",
        logo: getTeamLogo("TBA")
      },
      team2: {
        name: "TBA",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/392046-hXfFTHzoq2lnHjeLNwUI7QlTqtocvg.png"
      },
      keywords: [
        "BPL 2026 Final",
        "BPL Final",
        "BPL match",
        "Bangladesh Premier League 2026",
        "BPL live score",
        "Mirpur cricket match",
        "BPL 2026 results",
        "Bangladesh T20 match",
        "BPL match summary",
        "BPL 2026 scorecard",
        "Bangladesh Premier League results",
        "BPL match highlights",
        "BPL 2026 match report",
        "Bangladesh cricket match"
      ]
    }
  ]
};

