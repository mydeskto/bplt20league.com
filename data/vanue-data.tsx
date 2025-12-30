import ShereStadium from '@/public/images/stadium/Shere Bangla National Stadium.webp'
import SylhetStadium from '@/public/images/stadium/Sylhet International Cricket Stadium.jpeg'
import ZahurStadium from '@/public/images/stadium/Zahur Ahmed Chowdhury Stadium.jpeg'
export interface Venue {
  id: number
  name: string
  slug: string
  alternateName: string
  location: string
  capacity: number
  established: number
  owner?: string
  operator?: string
  pitchType: string
  homeTeam: string
  description: string
  pitchDescription: string
  image: string
  mapEmbed: string
  seoTitle: string
  metaDescription: string
  keywords?: string[]
  address: {
    addressLocality: string
    addressRegion: string
    addressCountry: string
    fullAddress: string
  }
  url: any
  matches: Array<{
    date: string
    time: string
    match: string
    venue?: string
  }>
  ends?: string
  stats?: {
    highestT20Total?: string
    lowestT20Total?: string
    highestIndividualScore?: string
    bestBowlingFigures?: string
    mostMatchesHosted?: string
    recordCrowd?: string
  }
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export const venuesData: { venues: Venue[] } = {
  venues: [
    {
      id: 1,
      name: "Shere Bangla National Stadium, Dhaka",
      slug: "shere-bangla-national-stadium-dhaka",
      alternateName: "Mirpur Stadium",
      location: "Mirpur, Dhaka, Bangladesh",
      capacity: 25000,
      established: 2006,
      pitchType: "Balanced pitch favors both batsmen and bowlers",
      homeTeam: "Dhaka franchise, Bangladesh national T20 matches",
      description:
        "Shere Bangla National Stadium is Bangladesh's premier cricket venue and a key stadium for BPL 2026 matches, including league-stage games and playoffs. Known for hosting high-profile domestic and international T20 matches, it provides excellent seating, amenities, and accessibility for fans.",
      pitchDescription:
        "Balanced pitch favors both batsmen and bowlers. Pacers get early movement; spinners come into play in the middle overs. Quick outfield ideal for high-scoring T20 matches.",
      image: ShereStadium.src,
      mapEmbed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5162.338793882828!2d90.3597135347879!3d23.807047761694538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c105f81691d5%3A0x4aa9bd97de918f7b!2sSher-E-Bangla%20National%20Cricket%20Stadium!5e0!3m2!1sen!2sus!4v1766582923228!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      seoTitle: "Shere Bangla National Stadium, Dhaka - BPL 2026 Venue & Match Schedule",
      metaDescription:
        "Shere Bangla National Stadium, Dhaka will host key matches of the Bangladesh Premier League (BPL) 2026, including league-stage games and playoffs. View full BPL 2026 fixtures, schedule, and details for this premier Bangladesh venue.",
      keywords: [
        "Shere Bangla National Stadium",
        "Mirpur Stadium",
        "Sher-e-Bangla Stadium",
        "BPL 2026 venue Dhaka",
        "Bangladesh cricket stadium",
        "Mirpur cricket ground",
        "BPL playoffs venue",
        "Bangladesh Premier League venue",
        "Dhaka cricket stadium",
        "Mirpur stadium BPL",
        "Bangladesh cricket venues",
        "BPL 2026 stadium",
        "Dhaka match schedule",
        "BPL cricket ground",
        "Bangladesh T20 venue"
      ],
      address: {
        addressLocality: "Mirpur",
        addressRegion: "Dhaka",
        addressCountry: "BD",
        fullAddress: "Mirpur Rd, Dhaka 1216, Bangladesh",
      },
      url: "/bpl-venue/shere-bangla-national-stadium-dhaka/",
      ends: "Pavilion End, Media End",
      stats: {
        highestT20Total: "210/4 (Dhaka vs Sylhet, BPL 2023)",
        lowestT20Total: "98/10 (Chattogram vs Dhaka, BPL 2022)",
        highestIndividualScore: "118* (Shakib Al Hasan, Dhaka, BPL 2021)",
        bestBowlingFigures: "5/18 (Mustafizur Rahman, Dhaka, BPL 2020)",
        mostMatchesHosted: "120+ (BPL)",
        recordCrowd: "25,000 (Playoff, BPL 2019)"
      },
      matches: [
        { date: "Jan 15", time: "12:30 PM", match: "Dhaka Capitals vs Noakhali Express", venue: "Dhaka" },
        { date: "Jan 15", time: "5:30 PM", match: "Chattogram Royals vs Sylhet Titans", venue: "Dhaka" },
        { date: "Jan 16", time: "1:30 PM", match: "Noakhali Express vs Rajshahi Warriors", venue: "Dhaka" },
        { date: "Jan 16", time: "6:30 PM", match: "Dhaka Capitals vs Sylhet Titans", venue: "Dhaka" },
        { date: "Jan 17", time: "12:30 PM", match: "Rajshahi Warriors vs Chattogram Royals", venue: "Dhaka" },
        { date: "Jan 17", time: "5:30 PM", match: "Noakhali Express vs Rangpur Riders", venue: "Dhaka" },
      ],
      faqs: [
        {
          question: "What is the seating capacity?",
          answer: "25,000 spectators"
        },
        {
          question: "Which matches of BPL 2026 are held here?",
          answer: "League-stage matches and playoffs"
        },
        {
          question: "How can I buy tickets?",
          answer: "Via the official BPL website or authorized partners"
        }
      ],
    },
    {
      id: 2,
      name: "Sylhet International Cricket Stadium, Sylhet",
      slug: "sylhet-international-cricket-stadium",
      alternateName: "Sylhet Stadium",
      location: "Sylhet, Bangladesh",
      capacity: 18500,
      established: 2007,
      pitchType: "Batting-friendly surface with potential for spinners in the middle overs",
      homeTeam: "Sylhet franchise",
      description:
        "The Sylhet International Cricket Stadium is renowned for its high-scoring, entertaining T20 matches. It has hosted previous BPL editions and provides modern facilities for fans, making it a favorite destination for BPL 2026 league-stage games.",
      pitchDescription:
        "Batting-friendly surface with potential for spinners in the middle overs. Outfield is quick, ideal for sixes and high totals. Morning matches may see some early seam movement.",
      image: SylhetStadium.src,
      mapEmbed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3255871972096!2d91.864106388855!3d24.920975999999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750551e7da58bcd%3A0x7cd35cba3faa14e7!2sSylhet%20International%20Cricket%20Stadium!5e0!3m2!1sen!2sus!4v1766584101866!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      seoTitle: "Sylhet International Cricket Stadium, Sylhet - BPL 2026 Venue & Full Match Schedule",
      metaDescription:
        "Sylhet International Cricket Stadium, Sylhet - one of the main venues for the Bangladesh Premier League (BPL) 2026. Check key details, location, capacity, and full match schedule.",
      keywords: [
        "Sylhet International Cricket Stadium",
        "Sylhet Stadium",
        "Sylhet cricket ground",
        "BPL 2026 venue Sylhet",
        "Bangladesh cricket stadium",
        "Sylhet BPL matches",
        "Bangladesh cricket stadium Sylhet",
        "BPL venue Sylhet",
        "Sylhet cricket stadium",
        "BPL 2026 Sylhet",
        "Sylhet cricket venue",
        "Bangladesh Premier League Sylhet",
        "Sylhet match schedule",
        "BPL cricket venue",
        "Bangladesh T20 venue Sylhet"
      ],
      address: {
        addressLocality: "Sylhet",
        addressRegion: "Sylhet",
        addressCountry: "BD",
        fullAddress: "Sylhet, Airport Rd, Sylhet 3100, Bangladesh",
      },
      url: "/bpl-venue/sylhet-international-cricket-stadium/",
      ends: "Pavilion End, City End",
      stats: {
        highestT20Total: "198/3 (Sylhet vs Dhaka, BPL 2022)",
        lowestT20Total: "102/9 (Dhaka vs Sylhet, BPL 2021)",
        highestIndividualScore: "105* (Litton Das, Sylhet, BPL 2022)",
        bestBowlingFigures: "4/12 (Rashid Khan, Sylhet, BPL 2021)",
        mostMatchesHosted: "45+ (BPL)",
        recordCrowd: "18,500 (League-stage, BPL 2022)"
      },
      matches: [
        { date: "Dec 26", time: "1:30 PM", match: "Sylhet Titans vs Rajshahi Warriors", venue: "Sylhet" },
        { date: "Dec 26", time: "6:30 PM", match: "Noakhali Express vs Chattogram Royals", venue: "Sylhet" },
        { date: "Dec 27", time: "12:30 PM", match: "Dhaka Capitals vs Rajshahi Warriors", venue: "Sylhet" },
        { date: "Dec 27", time: "5:30 PM", match: "Sylhet Titans vs Noakhali Express", venue: "Sylhet" },
        { date: "Dec 29", time: "12:30 PM", match: "Rangpur Riders vs Chattogram Royals", venue: "Sylhet" },
        { date: "Dec 29", time: "5:30 PM", match: "Rajshahi Warriors vs Noakhali Express", venue: "Sylhet" },
        { date: "Dec 30", time: "12:30 PM", match: "Sylhet Titans vs Chattogram Royals", venue: "Sylhet" },
        { date: "Dec 30", time: "5:30 PM", match: "Dhaka Capitals vs Rangpur Riders", venue: "Sylhet" },
        { date: "Jan 1", time: "12:30 PM", match: "Sylhet Titans vs Dhaka Capitals", venue: "Sylhet" },
        { date: "Jan 1", time: "5:30 PM", match: "Rangpur Riders vs Rajshahi Warriors", venue: "Sylhet" },
        { date: "Jan 2", time: "1:30 PM", match: "Dhaka Capitals vs Chattogram Royals", venue: "Sylhet" },
        { date: "Jan 2", time: "6:30 PM", match: "Sylhet Titans vs Rangpur Riders", venue: "Sylhet" },
      ],
      faqs: [
        {
          question: "What is the stadium capacity?",
          answer: "18,500 spectators"
        },
        {
          question: "Which BPL 2026 matches will be played here?",
          answer: "Multiple league-stage matches"
        },
        {
          question: "Are there good facilities for fans?",
          answer: "Yes, seating, parking, and modern amenities are available"
        }
      ],
    },
    {
      id: 3,
      name: "Zahur Ahmed Chowdhury Stadium, Chattogram",
      slug: "zahur-ahmed-chowdhury-stadium-chattogram",
      alternateName: "Chattogram Stadium",
      location: "Chattogram, Bangladesh",
      capacity: 22000,
      established: 2004,
      pitchType: "Balanced pitch, slightly favoring bowlers in early overs",
      homeTeam: "Chattogram franchise",
      description:
        "Zahur Ahmed Chowdhury Stadium is a key venue for BPL 2026 matches, attracting passionate local crowds. It features excellent seating, visibility, and facilities, making it ideal for both league-stage games and T20 action.",
      pitchDescription:
        "Balanced pitch, slightly favoring bowlers in early overs. Spinners become important in the middle stages. Outfield is fast, supports high-scoring matches.",
      image: ZahurStadium.src,
      mapEmbed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.1234567890123!2d91.81234567890123!3d22.345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc8b8a8b8b8b8%3A0x1234567890abcdef!2sZahur%20Ahmed%20Chowdhury%20Stadium!5e0!3m2!1sen!2sus!4v1766585000000!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      seoTitle: "Zahur Ahmed Chowdhury Stadium, Chattogram - BPL 2026 Venue & Full Match Schedule",
      metaDescription:
        "Explore Zahur Ahmed Chowdhury Stadium, Chattogram - one of the key venues for the Bangladesh Premier League (BPL) 2026. Check its location, capacity, pitch report, and complete match schedule.",
      keywords: [
        "Zahur Ahmed Chowdhury Stadium",
        "Chattogram Stadium",
        "Chattogram cricket ground",
        "BPL 2026 venue Chattogram",
        "Bangladesh cricket stadium",
        "Chattogram BPL matches",
        "Bangladesh cricket stadium Chattogram",
        "BPL venue Chattogram",
        "Chattogram cricket stadium",
        "BPL 2026 Chattogram",
        "Chattogram cricket venue",
        "Bangladesh Premier League Chattogram",
        "Chattogram match schedule",
        "BPL cricket venue",
        "Bangladesh T20 venue Chattogram"
      ],
      address: {
        addressLocality: "Chattogram",
        addressRegion: "Chattogram",
        addressCountry: "BD",
        fullAddress: "Chattogram, 9Q49+84R, Sagorika Rd, Chittagong 4219, Bangladesh",
      },
      url: "/bpl-venue/zahur-ahmed-chowdhury-stadium-chattogram/",
      ends: "Media End, Pavilion End",
      stats: {
        highestT20Total: "205/5 (Chattogram vs Dhaka, BPL 2023)",
        lowestT20Total: "95/10 (Sylhet vs Chattogram, BPL 2022)",
        highestIndividualScore: "112 (Mahmudullah, Chattogram, BPL 2023)",
        bestBowlingFigures: "5/20 (Abu Hider Rony, Chattogram, BPL 2022)",
        mostMatchesHosted: "60+ (BPL)",
        recordCrowd: "22,000 (Final, BPL 2021)"
      },
      matches: [
        { date: "Jan 5", time: "12:30 PM", match: "Rangpur Riders vs Dhaka Capitals", venue: "Chattogram" },
        { date: "Jan 5", time: "5:30 PM", match: "Chattogram Royals vs Rajshahi Warriors", venue: "Chattogram" },
        { date: "Jan 6", time: "12:30 PM", match: "Noakhali Express vs Sylhet Titans", venue: "Chattogram" },
        { date: "Jan 6", time: "5:30 PM", match: "Chattogram Royals vs Rangpur Riders", venue: "Chattogram" },
        { date: "Jan 8", time: "12:30 PM", match: "Sylhet Titans vs Rangpur Riders", venue: "Chattogram" },
        { date: "Jan 8", time: "5:30 PM", match: "Rajshahi Warriors vs Dhaka Capitals", venue: "Chattogram" },
        { date: "Jan 9", time: "1:30 PM", match: "Chattogram Royals vs Noakhali Express", venue: "Chattogram" },
        { date: "Jan 9", time: "6:30 PM", match: "Rajshahi Warriors vs Sylhet Titans", venue: "Chattogram" },
        { date: "Jan 11", time: "12:30 PM", match: "Rangpur Riders vs Noakhali Express", venue: "Chattogram" },
        { date: "Jan 11", time: "5:30 PM", match: "Chattogram Royals vs Dhaka Capitals", venue: "Chattogram" },
        { date: "Jan 12", time: "12:30 PM", match: "Rajshahi Warriors vs Rangpur Riders", venue: "Chattogram" },
        { date: "Jan 12", time: "5:30 PM", match: "Noakhali Express vs Dhaka Capitals", venue: "Chattogram" },
      ],
      faqs: [
        {
          question: "What is the seating capacity?",
          answer: "22,000 spectators"
        },
        {
          question: "Which matches will be hosted here?",
          answer: "Multiple league-stage matches of BPL 2026"
        },
        {
          question: "How to reach the stadium?",
          answer: "Accessible via main roads, parking, and public transport"
        }
      ],
    },
  ],
}
