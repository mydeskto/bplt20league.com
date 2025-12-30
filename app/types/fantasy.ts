export interface Dream11Data {
  wicketkeeper: string;
  batters: string[];
  allRounders: string[];
  bowlers: string[];
  captain: string;
  viceCaptain: string;
  notes?: string;
}

export interface FantasyTipSection {
  recommendation: string;
  players: string[];
  reason?: string;
}

export interface FantasyTipsData {
  batters?: FantasyTipSection;
  allRounders?: FantasyTipSection;
  bowlers?: FantasyTipSection;
  captaincy?: {
    recommendation: string;
    advice: string;
  };
  tossImpact?: {
    recommendation: string;
    advice: string;
  };
}

export interface KeyPlayersData {
  team1: {
    name: string;
    keypoints: string[];
  };
  team2: {
    name: string;
    keypoints: string[];
  };
}

export interface AvailabilityData {
  status: string;
  note: string;
}

export interface MatchData {
  header: any;
  matchInfo: any;
  playingXI: any;
  weather: any;
  teamForm: any;
  playerPicks: any;
  avoidPlayers: any;
  conclusion?: string;
  faq?: Array<{ question: string; answer: string }>;
  dream11?: Dream11Data;
  fantasyTips?: FantasyTipsData;
  keyPlayers?: KeyPlayersData;
  availability?: AvailabilityData;
}

export interface FantasyCricketClientProps {
  slug: string;
}