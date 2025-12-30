import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - BPL T20 | Bangladesh Premier League',
  description: 'Learn about BPL T20 - your go-to source for everything related to the Bangladesh Premier League T20. Get match schedules, team updates, player stats and more.',
  alternates: {
    canonical: "https://bplt20league.com/about-us/"
  },
}

export default function AboutUs() {
  // JSON-LD Schema for SEO
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Us - BPL T20 | Bangladesh Premier League",
    "description": "Learn about BPL T20 - your go-to source for everything related to the Bangladesh Premier League T20. Get match schedules, team updates, player stats and more.",
    "url": "https://bplt20league.com/about-us",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "BPL T20 League",
      "url": "https://bplt20league.com"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bplt20league.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://bplt20league.com/about-us"
        }
      ]
    },
    "about": {
      "@type": "Organization",
      "name": "BPLT20League.com",
      "description": "Independent cricket information website providing coverage of the Bangladesh Premier League"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    <div className="min-h-screen bg-[#0a0e27] font-inter ">

      <div className="max-w-full mx-auto pt-25">
        <div className=" rounded-lg  p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-left">
            About Us
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-md text-white mb-6 leading-relaxed font-semibold">
              BPLT20League.com is an independent cricket information website and is not affiliated with, endorsed by, or connected to the official Bangladesh Premier League or its organizers.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Welcome</h2>
            <p className="text-md text-white mb-6 leading-relaxed">
              Welcome to BPLT20League.com, your trusted and independent hub for everything related to the Bangladesh Premier League (BPL T20).
            </p>
            <p className="text-md text-white mb-8 leading-relaxed">
              Our purpose is to keep cricket fans updated with accurate, timely, and balanced information about BPL matches, teams, players, venues, schedules, and tickets — all in one convenient place.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Our Mission</h2>
            <p className="text-md text-white mb-8 leading-relaxed">
              We created this platform to make it easier for cricket lovers to follow Bangladesh's premier T20 competition.
            </p>
            <p className="text-md text-white mb-8 leading-relaxed">
              Our mission is to deliver verified coverage, simple navigation, and reliable updates so fans can stay informed without switching between multiple sources.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Who We Are</h2>
            <p className="text-md text-white mb-8 leading-relaxed">
              We are a team of dedicated cricket followers and digital content creators who closely track Bangladesh cricket.
            </p>
            <p className="text-md text-white mb-8 leading-relaxed">
              While BPL T20 League is not an official BPL website, our goal is to present authentic and consistent coverage using information from trusted cricket sources, public announcements, and credible reports.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">What You'll Find Here</h2>
            <ul className='text-white ml-10 space-y-5 list-disc mb-8'>
              <li>
                Complete BPL T20 schedule and fixtures
              </li>
              <li>
                Team squads, live scores, and match results
              </li>
              <li>
                Venue and ticket information
              </li>
              <li>
                Player statistics and post-match reports
              </li>
            </ul>

            <p className="text-md text-white mb-8 leading-relaxed">
              We regularly review and update our content to maintain accuracy. If you notice any error or outdated information, feel free to contact us. We value feedback.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Contact Us</h2>
            <p className="text-md text-white mb-4 leading-relaxed">
              For questions, suggestions, or collaboration requests, email us at:
            </p>
            <p className="text-md text-white mb-4 leading-relaxed">
              infobplt20league@gmail.com
            </p>
            <p className="text-md text-white mb-8 leading-relaxed">
              or reach out through our <a href="/contact-us" className="text-blue-400 hover:text-blue-300 underline">Contact Page</a>.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Transparency Note</h2>
            <p className="text-md text-white mb-4 leading-relaxed">
              This website displays Google AdSense advertisements to support hosting and website maintenance.
            </p>
            <p className="text-md text-white mb-8 leading-relaxed">
              All ads shown on our platform comply with Google's content, publisher, and user-safety policies.
            </p>

          </div>
        </div>
      </div>

    </div>
    </>
  )
}
