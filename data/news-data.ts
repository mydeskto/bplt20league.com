interface FAQItem {
  question: string;
  answer: string;
}

interface ForeignPlayer {
  team: string;
  teamLink?: string;
  players: string;
}

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image: string | { src: string };
  faq?: FAQItem[];
  foreignPlayers?: ForeignPlayer[];
  keywords?: string[];
}

import news1 from '@/public/images/news/news1.webp';
import news2 from '@/public/images/news/news2.webp';
import news3 from '@/public/images/news/news3.webp';
import news4 from '@/public/images/news/news4.webp';
import news5 from '@/public/images/news/news5.webp';
import news6 from '@/public/images/news/news6.jpeg';
import news7 from '@/public/images/news/news7.jpeg';
import news8 from '@/public/images/news/news8.jpeg';

export const newsArticles: NewsArticle[] = [
  {
    id: "8",
    slug: "bpl-2025-26-matches-cancelled-december-30-31-national-mourning-khaleda-zia",
    title: "BPL 2025-26 Matches Cancelled on December 30 and 31 After National Mourning Announcement",
    date: "December 30, 2025",
    summary: "Bangladesh Premier League 2025-26 matches scheduled for December 30 and 31 have been cancelled by the BCB as a mark of respect following the death of former Prime Minister Khaleda Zia. Revised dates to be announced soon.",
    image: news8.src,
    keywords: [
      "BPL 2025-26 matches cancelled",
      "BPL December 30 cancelled",
      "BPL December 31 cancelled",
      "Khaleda Zia BPL cancellation",
      "BCB matches cancelled",
      "BPL 2025-26 schedule changes",
      "Sylhet Titans vs Chattogram Royals cancelled",
      "Dhaka Capitals vs Rangpur Riders cancelled",
      "Bangladesh Premier League cancelled matches",
      "BPL 2025-26 national mourning",
      "BCB official statement",
      "BPL rescheduled matches",
      "Bangladesh cricket news",
      "BPL 2025-26 updates"
    ],
    content: `<p>December 30, 2025:</p>

<p>The Bangladesh Cricket Board has cancelled the <a href="/schedule/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Bangladesh Premier League 2025-26</a> matches scheduled for Tuesday, December 30, and Wednesday, December 31, as a mark of respect following the passing of former Bangladesh Prime Minister Begum Khaleda Zia. The decision was announced early Tuesday morning after news of her death at around 6:00 AM local time, triggering a period of national mourning across the country.</p>

<p>Two matches were originally set to be played on December 30 at the Sylhet International Cricket Stadium. The day game was scheduled between <a href="/teams/sylhet-titans/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Sylhet Titans</a> and <a href="/teams/chattogram-royals/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Chattogram Royals</a>, while the evening fixture was to feature <a href="/teams/dhaka-capitals/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Dhaka Capitals</a> against <a href="/teams/rangpur-riders/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Rangpur Riders</a>. Both games have now been officially cancelled, with the BCB confirming that these fixtures will be rescheduled and updated dates will be shared in due course.</p>

<p>In an official statement, the Bangladesh Cricket Board said the decision was taken in honour of Begum Khaleda Zia's legacy and her contributions to the development of cricket in Bangladesh. The board acknowledged her continued support for the sport during her tenures as Prime Minister from 1991 to 1996 and again from 2001 to 2006, a period that saw major improvements in cricket infrastructure and nationwide growth of the game.</p>

<p>The BCB added that cancelling the matches was a sign of respect during the national mourning period, emphasizing the former Prime Minister's role in shaping Bangladesh cricket's progress. The board reiterated that further information regarding the revised schedule would be communicated once finalized.</p>

<p>The Bangladesh Premier League 2025-26 season began on December 26 and is scheduled to run until January 23. While matches were initially expected to continue from December 31, no official confirmation has been made yet. With a seven-day national mourning announced by Khaleda Zia's party, the BNP, it remains to be seen whether any further changes to the <a href="/schedule/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL schedule</a> will be required.</p>

<p>Fans are advised to keep an eye on official BCB announcements for updates on when the postponed matches will be played and when the tournament action will fully resume.</p>`
  },
  {
    id: "7",
    slug: "noakhali-express-vs-rajshahi-warriors-6th-match-bpl-2025-26-full-match-report-scorecard-highlights",
    title: "Noakhali Express vs Rajshahi Warriors 6th Match BPL 2025-26 Full Match Report, Scorecard & Highlights",
    date: "December 29, 2025",
    summary: "Rajshahi Warriors defeat Noakhali Express in the 6th match of BPL 2025-26 with a controlled chase after a disciplined bowling display. Read the full match report, key performances, scorecard summary and analysis.",
    image: news7.src,
    keywords: [
      "Noakhali Express vs Rajshahi Warriors",
      "BPL 2025-26 match report",
      "Rajshahi Warriors BPL 2025-26",
      "BPL 2025-26 scorecard",
      "Ripon Mondol player of the match",
      "BPL 2025-26 highlights",
      "Noakhali Express BPL 2025-26",
      "BPL 6th match report",
      "Mushfiqur Rahim BPL 2025-26",
      "Bangladesh Premier League 2025-26"
    ],
    content: `<p>Sylhet, December 29, 2025:</p>

<p><a href="/teams/rajshahi-warriors/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Rajshahi Warriors</a> claimed a solid six-wicket win over <a href="/teams/noakhali-express/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Noakhali Express</a> in the 6th match of the Bangladesh Premier League 2025-26 at the Sylhet International Cricket Stadium on Monday, December 29, 2025. The Warriors chased down a modest target with more than two overs to spare, showing good discipline with both ball and bat to stay unbeaten in the early part of the tournament.</p>

<p><a href="/teams/noakhali-express/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Noakhali Express</a> were put in to bat first after losing the toss, and they managed to put together a competitive total thanks to a few useful contributions. The Express reached 124 for 8 in their 20 overs, with <a href="https://en.wikipedia.org/wiki/Haider_Ali_(cricketer)" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Haider Ali</a> top-scoring with 33 off 28 balls and Maaz Sadaqat contributing 25 off 19. Their innings was built on starts rather than big scores, punctuated by regular dismissals that prevented any batter from really taking charge.</p>

<p>The Express struggled to accelerate consistently, and while they kept the scoreboard moving with singles and doubles, they lacked the firepower in the middle overs to push past 150. Lower-order efforts from Mehedi Hasan Rana (11 not out) and Bilal Sami (1 not out) added a few runs, but it wasn't enough to build a match-winning total.</p>

<p>In response, Rajshahi Warriors got off to a cautious start but steadily took control of the chase. They lost an early wicket, but Tanzid Hasan and <a href="https://en.wikipedia.org/wiki/Najmul_Hossain_Shanto" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Najmul Hossain Shanto</a> steadied the chase with a useful partnership, putting pressure back on the Express bowlers.</p>

<p>Once they were set, the Warriors' experienced middle-order ensured the target was reached with comfort. <a href="https://en.wikipedia.org/wiki/Mushfiqur_Rahim" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Mushfiqur Rahim</a> played a key role, scoring 28 off 30 balls, while Yasir Ali made 23 off 26 deliveries to guide Rajshahi home. Their unbeaten partnership after the mid-innings hiccup added 52 runs off 54 balls, easing the pressure and securing victory with 17.5 overs played.</p>

<p>One of the standout performers of the match was Ripon Mondol, who was named Player of the Match for his bowling efforts that helped restrict Noakhali's scoring during crucial phases. His disciplined spells ensured regular breakthroughs and kept the run rate in check.</p>

<p>The Warriors' bowlers did a good job of controlling the flow of runs and taking wickets at key stages. This kept Noakhali under constant pressure, preventing partnerships from forming and ensuring the total remained within reach of the Rajshahi batting lineup.</p>

<p>This victory gives Rajshahi Warriors early momentum in the league standings as they look to build consistency through the <a href="/schedule/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL 2025-26</a> season. Their all-round performance displayed a good balance between batting depth and bowling control. For Noakhali Express, the result was another tough outing, and they'll need to find more runs and sharper bowling performances if they want to challenge the stronger teams in the competition.</p>

<p>Overall, it was a solid display by the Warriors, combining sensible game management with key individual contributions. The match reinforced how valuable experienced finishers are in a T20 chase and highlighted the importance of building partnerships under pressure.</p>

<p>If you want, I can break down the key bowling figures or show how this result affects the <a href="/points-table/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL points table</a> after this round.</p>`
  },
  {
    id: "6",
    slug: "chattogram-royals-vs-rangpur-riders-5th-match-bpl-2025-26-full-match-report-scorecard-highlights",
    title: "Chattogram Royals vs Rangpur Riders 5th Match BPL 2025-26 Full Match Report, Scorecard & Highlights",
    date: "December 29, 2025",
    summary: "Rangpur Riders outclass Chattogram Royals in the 5th match of BPL 2025-26 as Faheem Ashraf's five-wicket haul and a solid Malan-Liton partnership seal a dominant seven-wicket win. Full match report, key moments and analysis.",
    image: news6.src,
    keywords: [
      "Chattogram Royals vs Rangpur Riders",
      "BPL 2025-26 match report",
      "Faheem Ashraf five wickets",
      "Rangpur Riders BPL 2025-26",
      "BPL 2025-26 scorecard",
      "Dawid Malan Liton Das partnership",
      "BPL 2025-26 highlights",
      "Chattogram Royals BPL 2025-26",
      "BPL 5th match report",
      "Bangladesh Premier League 2025-26"
    ],
    content: `<p>Sylhet, December 27, 2025:</p>

<p>Rangpur Riders continued their strong start to the Bangladesh Premier League 2025-26 with a commanding seven-wicket victory over <a href="/teams/chattogram-royals/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Chattogram Royals</a> in the fifth match of the tournament at the Sylhet International Cricket Stadium. It was a one-sided contest where Rangpur's disciplined bowling and composed batting left the Royals with plenty to reflect on as the league phase begins to take shape.</p>

<p><a href="/teams/chattogram-royals/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Chattogram Royals</a> were asked to bat first after losing the toss, and their innings never really settled. From the opening overs, <a href="/teams/rangpur-riders/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Rangpur Riders</a>' bowlers found movement and rhythm, making scoring difficult. Mohammad Naim tried to counter the pressure with an aggressive approach, playing a lively knock that briefly lifted the Royals' tempo. His 39 off just 20 balls included clean strokes and confident intent, but the lack of support from the other end meant the momentum was short-lived.</p>

<p>As wickets kept falling at regular intervals, Chattogram struggled to build any meaningful partnerships. Mirza Baig chipped in with a small contribution, but the middle order failed to readjust once the initial aggression faded. The Royals' batting line-up looked under pressure against accurate bowling and smart field placements. Eventually, they were bowled out for 102 in 17.5 overs, a total that always seemed below par on a surface that offered value for shots once batters settled in.</p>

<p>The standout performer with the ball was Faheem Ashraf, who delivered a spell that completely changed the tone of the match. Mixing pace with control, he picked up five wickets for just 17 runs, striking at crucial moments to dismantle the Royals' batting order. His ability to break partnerships and keep the scoring in check ensured Chattogram never found a way back. He was well supported by Mustafizur Rahman, whose variations added pressure and resulted in key breakthroughs, further tightening Rangpur's grip on the game.</p>

<p>With a modest target to chase, Rangpur Riders approached their innings with calm assurance. Openers <a href="https://en.wikipedia.org/wiki/Dawid_Malan" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Dawid Malan</a> and <a href="https://en.wikipedia.org/wiki/Liton_Das" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Liton Das</a> wasted no time in asserting control, rotating the strike early before finding boundaries with ease. Their partnership of 91 runs all but sealed the contest, allowing Rangpur to chase without risk. Malan played the role of anchor, showing patience and experience as he compiled a steady half-century, while Liton brought flair and aggression, striking the ball cleanly and keeping the required run rate comfortably in check.</p>

<p>The Royals' bowlers tried to fight back, but the total on the board offered little room for error. Once Liton departed after an entertaining innings, Rangpur were already in complete control. Malan stayed composed until the job was nearly done, and the remaining batters finished the chase without fuss. Rangpur reached the target in just 15 overs, winning with five overs to spare and underlining their dominance on the night.</p>

<p>This result gives Rangpur Riders valuable early momentum in the <a href="/schedule/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL 2025-26</a> season. Their balance as a side was evident, with bowlers setting the foundation and batters finishing clinically. Faheem Ashraf's all-round presence, especially his match-winning spell, will be a major boost as the tournament progresses. The opening partnership also sent a clear message to other teams that Rangpur's top order is capable of making light work of pressure situations.</p>

<p>For Chattogram Royals, the defeat exposed clear areas that need attention. Their batting lacked depth and adaptability, particularly after losing early wickets. While individual flashes of brilliance were visible, the absence of partnerships proved costly. Going forward, they will need more stability and better shot selection to post competitive totals. The bowlers, too, were left with little margin for error and will hope for stronger backing from the batting unit in upcoming matches.</p>

<p>Overall, the fifth match of the <a href="https://www.tigercricket.com.bd/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Bangladesh Premier League</a> 2025-26 highlighted Rangpur Riders' early intent to challenge for the top spots, while Chattogram Royals were reminded of the standards required to compete consistently in this fast-paced tournament. With many matches still to come, both teams will take lessons from this encounter as the race for playoff positions begins to intensify.</p>`
  },
  {
    id: "5",
    slug: "rajshahi-warriors-dominate-sylhet-titans-high-scoring-bpl-2026-opener",
    title: "Rajshahi Warriors Dominate Sylhet Titans in High-Scoring BPL 2026 Opener",
    date: "December 26, 2025",
    summary: "Rajshahi Warriors opened BPL 2026 with a commanding win over Sylhet Titans as big runs and standout performances defined the season's first match.",
    image: news5.src,
    keywords: [
      "Rajshahi Warriors BPL 2026",
      "BPL 2026 opening match",
      "Sylhet Titans vs Rajshahi Warriors",
      "BPL 2026 high scoring match",
      "BPL 2026 match results"
    ],
    content: `<p>Sylhet, December 26:</p>

<p>The Bangladesh Premier League 2026 began with a high-scoring encounter as Rajshahi Warriors delivered a strong all-round performance to defeat Sylhet Titans in the opening match at the Sylhet International Cricket Stadium.</p>

<p>Put in to bat first, <a href="/teams/sylhet-titans/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Sylhet Titans</a> made full use of the conditions and posted a challenging total. Their innings was anchored by a fluent top-order knock, supported well by the middle order, which kept the scoreboard moving throughout the 20 overs. Boundaries came regularly, and the Titans looked set for a competitive start before being checked slightly in the final overs by disciplined bowling.</p>

<p><a href="/teams/rajshahi-warriors/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Rajshahi Warriors</a> responded with confidence and intent. The chase was led by a commanding innings from <a href="https://en.wikipedia.org/wiki/Najmul_Hossain_Shanto" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Najmul Hossain Shanto</a>, who controlled the tempo from the start and punished loose deliveries. He received solid support from the other top-order batters, ensuring there was no collapse and keeping the required rate well within reach.</p>

<p>The Warriors' batting depth proved decisive, as they crossed the target comfortably with wickets in hand. Their calm approach under pressure highlighted why they are being viewed as early contenders this season.</p>

<p>From a bowling perspective, Rajshahi's attack did enough to restrict Sylhet at key moments, while Sylhet struggled to find breakthroughs during the chase despite brief spells of resistance.</p>

<p>The result gives Rajshahi Warriors an early boost on the <a href="/schedule/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL 2026</a> points table, while Sylhet Titans will look to address their bowling execution ahead of their next fixture. With strong batting displays and plenty of runs on the board, the opening match set the tone for an exciting <a href="https://www.tigercricket.com.bd/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Bangladesh Premier League</a> tournament ahead.</p>`
  },
  {
    id: "4",
    slug: "najmul-hossain-shanto-hits-stunning-century-rajshahi-warriors-beat-sylhet-titans-bpl-opener",
    title: "Najmul Hossain Shanto Hits Stunning Century as Rajshahi Warriors Beat Sylhet Titans in BPL Opener",
    date: "December 26, 2025",
    summary: "Najmul Hossain Shanto smashed a brilliant hundred to lead Rajshahi Warriors to victory over Sylhet Titans in the opening match of BPL 2026 in Sylhet.",
    image: news4.src,
    keywords: [
      "Najmul Hossain Shanto century",
      "Rajshahi Warriors BPL 2026",
      "BPL 2026 opening match",
      "Sylhet Titans vs Rajshahi Warriors",
      "BPL 2026 match results"
    ],
    content: `<p>Sylhet, December 26, 2025:</p>

<p>Najmul Hossain Shanto produced a memorable innings to headline the opening match of the Bangladesh Premier League as Rajshahi Warriors began their BPL 2026 campaign with a commanding win over Sylhet Titans at the Sylhet International Cricket Stadium.</p>

<p>Batting second, <a href="/teams/rajshahi-warriors/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Rajshahi Warriors</a> were set a challenging target after <a href="/teams/sylhet-titans/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Sylhet Titans</a> put up a competitive total in their 20 overs. The pitch offered good value for shots, and the Titans' batters made the most of it with a steady flow of runs, keeping the contest finely balanced at the halfway stage.</p>

<p>The chase, however, quickly turned one-sided thanks to <a href="https://en.wikipedia.org/wiki/Najmul_Hossain_Shanto" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Najmul Hossain Shanto</a>'s masterclass at the top of the order. Shanto played with authority and composure, finding gaps with ease and clearing the ropes when required. He brought up his century in style, anchoring the innings from start to finish and ensuring there were no nervous moments for his side.</p>

<p>Supported well by his fellow batters, Shanto guided Rajshahi Warriors past the target with wickets in hand. His hundred not only sealed the result but also stood out as one of the finest individual performances in recent BPL opening matches.</p>

<p>Sylhet Titans struggled to make inroads during the chase, with their bowlers unable to break the key partnership or slow the scoring rate for long periods. Despite flashes of resistance in the field, the Warriors' batting depth and control proved decisive.</p>

<p>The emphatic victory gives Rajshahi Warriors an early boost in the <a href="/schedule/" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">BPL 2026</a> standings, while Sylhet Titans will look to regroup quickly ahead of their next fixture. With a century in the very first match, Najmul Hossain Shanto has already set the tone for what promises to be an exciting <a href="https://www.tigercricket.com.bd/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Bangladesh Premier League</a> season.</p>`
  },
  {
    id: "3",
    slug: "bpl-12-set-to-begin-amid-payment-delays-and-overseas-player-uncertainty",
    title: "BPL 12 Set to Begin Amid Payment Delays and Overseas Player Uncertainty",
    date: "December 25, 2025",
    summary: "",
    image: news3.src,
    keywords: [
      "BPL 12 payment delays",
      "BPL 2026 overseas players",
      "Bangladesh Premier League payment issues",
      "BPL 12 organizational challenges",
      "BPL 2026 player payments"
    ],
    content: `<p>With the 12th edition of the Bangladesh Premier League just around the corner, familiar off-field concerns have resurfaced, even as players remain focused on delivering an exciting tournament.</p>

<p>At the Sylhet Outer Stadium on Wednesday, Chattogram Royals opener Mohammad Naim cut a relaxed figure during training, smiling and chatting with teammates. The most expensive local signing of the season, Naim will be under the spotlight when Chattogram face Noakhali Express in the second match on the opening day of BPL 12 in Sylhet.</p>

<p>Away from the practice fields, however, organisational challenges have once again come to the fore. Issues that troubled previous editions, particularly payment delays and last-minute complications involving overseas players, have returned just days before the first ball is bowled. Earlier, the planned opening ceremony in Dhaka was cancelled due to security concerns, and on Wednesday the traditional pre-tournament captains' photoshoot with the trophy was also called off.</p>

<p>Payment concerns have been a major talking point. Several franchises are yet to clear the mandatory 25 percent of player payments required under BPL regulations, with only two days remaining before the opening fixtures. A Chattogram Royals player confirmed that no payments had been made so far, while sources from Sylhet Titans and Noakhali Express indicated that dues were still outstanding.</p>

<p>There were more positive updates from other camps. Dhaka Capitals captain Mohammad Mithun confirmed during a press briefing that his team had received the initial 25 percent, a statement backed by several players. Rangpur Riders have reportedly paid 50 percent of the dues to local players, while Rajshahi Warriors officials said 25 percent payments, along with nine days of travelling and dearness allowance, had been disbursed to both local and foreign cricketers.</p>

<p>Chattogram Royals are also dealing with uncertainty around their overseas contingent. With less than 36 hours to go before the tournament begins, none of their foreign players had arrived, and head coach Justin Kemp was also yet to join the squad. Although the franchise had secured several overseas names, including Abrar Ahmed, Niroshan Dickwella, Angelo Perera, Paul Stirling, Cameron Delport, Kamran Ghulam and Mirza Tahir Baig, most have opted out, while a few are still expected to arrive late.</p>

<p>Noakhali Express have faced their own setback, with Sri Lankan batter Kusal Mendis ruled out through injury. The franchise, however, has welcomed Pakistani players Hassan Eisakhil and Haider Ali and remains hopeful of additional overseas arrivals in Sylhet.</p>

<p>Despite the off-field uncertainty, confidence among players remains high. Rajshahi Warriors' Nepali leg-spinner Sandeep Lamichchane, returning to the BPL after last featuring in 2019, spoke positively about his team's balance and belief, stressing the importance of local players stepping up. Rangpur Riders all-rounder Khushdil Shah also expressed optimism, hoping to build on last season's performances that helped him earn a recall to Pakistan's national team.</p>

<p>As BPL 12 prepares to get underway, organisational challenges continue to cast a shadow, but on the field, players are ready to shift the focus back to cricket.</p>`
  },
  {
    id: "2",
    slug: "smc-plus-named-official-electrolyte-sports-drink-partner-bpl-2026",
    title: "SMC Plus Named Official Electrolyte Sports Drink Partner for BPL 2026",
    date: "December 24, 2025",
    summary: "SMC Plus Joins BPL 2026 as Official Electrolyte Sports Drink Partner. SMC Plus, one of Bangladesh's most recognized electrolyte sports drink brands, has officially been announced as the Electrolyte Sports Drink Partner of the Bangladesh Premier League (BPL) 2026.",
    image: news2.src,
    keywords: [
      "SMC Plus BPL 2026",
      "BPL 2026 sponsors",
      "BPL official partners",
      "SMC Plus cricket",
      "Bangladesh Premier League sponsors",
      "BPL 2026 commercial partners",
      "electrolyte sports drink BPL",
      "T Sports BPL",
      "BPL 2026 partnerships",
      "SMC Enterprise Limited",
      "BPL sponsors 2026",
      "cricket sponsors Bangladesh",
      "BPL commercial deals",
      "sports nutrition BPL",
      "BPL 2026 official partners"
    ],
    content: `<p>SMC Plus Joins BPL 2026 as Official Electrolyte Sports Drink Partner. SMC Plus, one of Bangladesh's most recognized electrolyte sports drink brands, has officially been announced as the Electrolyte Sports Drink Partner of the Bangladesh Premier League (BPL) 2026, marking a major commercial partnership ahead of the tournament's 12th edition.</p>

<p>The partnership agreement was formally signed between Mr. Sayef Nasir, Managing Director of SMC Enterprise Limited, and Mr. Tasvir Ul Islam, Executive Director of <a href="https://www.tsports.com/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">T Sports </a>, the official broadcaster of the league. The signing signals a shared commitment to supporting professional sports and enhancing athlete performance during one of Bangladesh's most celebrated cricket events.</p>

<p>As part of the collaboration, SMC Plus will play a key role in supporting player hydration and electrolyte balance throughout the tournament, reinforcing its focus on endurance, recovery, and peak performance. The partnership also reflects the growing importance of sports nutrition in modern cricket, especially during high-intensity T20 competitions like the BPL.</p>

<p>Speaking at the signing ceremony, Mr. Sayef Nasir expressed confidence in the partnership, stating that aligning with the Bangladesh Premier League reflects SMC Plus's long-term vision of encouraging an active lifestyle and providing reliable hydration solutions for athletes and sports lovers across the country.</p>

<p>On the other hand, Mr. Tasvir Ul Islam emphasized T Sports' ongoing efforts to bring strong and relevant brand collaborations to the league. He noted that SMC Plus's involvement will add value to the BPL by promoting awareness around proper hydration, sports nutrition, and athlete well-being.</p>

<p>The <a href="/schedule/" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] hover:text-[#c49563] underline transition-colors">Bangladesh Premier League 2026, scheduled</a>  to feature top local and international cricketing talent, is expected to deliver fast-paced action and nationwide excitement. With SMC Plus joining as the official electrolyte partner, the tournament further strengthens its focus on performance, professionalism, and fan engagement both on and off the field.</p>`
  }
 
];