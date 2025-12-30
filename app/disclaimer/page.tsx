import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - BPL T20 | Bangladesh Premier League',
  description: 'Disclaimer for BPLT20League.com - Important information about the use of our website and content accuracy.',
  alternates: {
    canonical: 'https://bplt20league.com/disclaimer',
  },
}

export default function Disclaimer() {
  // JSON-LD Schema for SEO
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer - BPL T20 | Bangladesh Premier League",
    "description": "Disclaimer for BPLT20League.com - Important information about the use of our website and content accuracy.",
    "url": "https://bplt20league.com/disclaimer",
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
          "name": "Disclaimer",
          "item": "https://bplt20league.com/disclaimer"
        }
      ]
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-left">
            Disclaimer
          </h1>
          <p className="text-sm text-white mb-6 leading-relaxed">
            Last Updated: October 2025
          </p>

          <div className="prose prose-lg max-w-none">

            <p className="text-md text-white mb-6 leading-relaxed">
              BPLT20League.com is an independent cricket information website created to provide Match Schedule  Live Scorecard, Points Table, news, updates, and coverage related to the Bangladesh Premier League (BPL T20).
            </p>

            <p className="text-md text-white mb-6 leading-relaxed">
              This website is not affiliated with, endorsed by, or officially connected to the Bangladesh Premier League or any of its governing bodies, teams, or organizers.
            </p>

            <p className="text-md text-white mb-8 leading-relaxed">
              By accessing or using this website, you agree to the terms stated in this Disclaimer. If you do not agree, please discontinue use of the site immediately.
            </p>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                1. Informational Purposes Only
              </li>
              <p className="pl-3 my-3 text-md">
                All content published on this website, including articles, schedules, player information, team details, venue data, ticket-related information, match previews, predictions, and other cricket-related material, is provided for general informational purposes only.
              </p>
              <p className="pl-3 mb-3 text-md">
                While we make reasonable efforts to keep information accurate and up to date, we make no guarantees regarding completeness, accuracy, or reliability. Any action taken based on information from this site is strictly at your own risk.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                2. No Professional or Official Advice
              </li>
              <p className="pl-3 my-3 text-md">
                The content on BPLT20League.com does not constitute official, legal, financial, or professional sports advice.
              </p>
              <p className="pl-3 mb-3 text-md">
                Before making decisions such as ticket purchases, travel plans, or fantasy league participation, users are strongly advised to verify information through official or authorized sources.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                3. External Links and Third-Party Content
              </li>
              <p className="pl-3 my-3 text-md">
                This website may contain links to external websites, services, or third-party content for user convenience.
              </p>
              <p className="pl-3 mb-3 text-md">
                We do not control or endorse these external platforms and are not responsible for their content, accuracy, privacy policies, or practices. Accessing third-party links is done at your own discretion and risk.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                4. Limitation of Liability
              </li>
              <p className="pl-3 my-3 text-md">
                To the fullest extent permitted by law, BPLT20League.com, its owners, contributors, and service providers shall not be held liable for any direct, indirect, incidental, consequential, or special damages arising from the use of, or inability to use, this website or its content.
              </p>
              <p className="pl-3 mb-3 text-md">
                This includes, but is not limited to, loss of data, revenue, profits, or business opportunities.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                5. Content Ownership and Copyright
              </li>
              <p className="pl-3 my-3 text-md">
                All original text, graphics, and content published on this website are the property of BPLT20League.com, unless otherwise stated.
              </p>
              <p className="pl-3 mb-3 text-md">
                Content may be viewed or shared for personal, non-commercial use only. Reproduction, redistribution, or modification of any material without prior written permission is prohibited.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                6. Advertisement Disclosure
              </li>
              <p className="pl-3 my-3 text-md">
                This website displays Google AdSense and other third-party advertisements to support hosting and operational costs.
              </p>
              <p className="pl-3 mb-3 text-md">
                All advertisements comply with Google's Publisher, Content, and User Safety policies. We do not personally endorse any advertised products or services unless explicitly stated.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                7. Governing Law
              </li>
              <p className="pl-3 my-3 text-md">
                This Disclaimer and your use of the website are governed by the laws of Bangladesh. Any disputes related to the use of this website shall fall under the jurisdiction of the courts of Bangladesh.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                8. Contact Us
              </li>
              <p className="pl-3 my-3 text-md">
                If you have any questions or concerns regarding this Disclaimer, please contact us at:
              </p>
              <p className="pl-3 mb-3 text-md">
                📧 infobplt20league@gmail.com
              </p>
              <p className="pl-3 mb-3 text-md">
                🌐 <a href="https://bplt20league.com/contact-us/" className="text-blue-400 hover:text-blue-300 underline">https://bplt20league.com/contact-us/</a>
              </p>
            </ol>


          </div>
        </div>
      </div>

    </div>
    </>
  )
}
