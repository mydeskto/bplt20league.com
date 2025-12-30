
import { Metadata } from 'next'
import Image from 'next/image'
import NPLSchedule from '../../components/SchedulePage'
import { Breadcrumb } from '@/components/breadcrumb'


export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "BPL 2026 Schedule, Fixtures, Dates & Match List | Bangladesh Premier League",
    description: "Get the complete BPL 2026 schedule with match dates, fixtures, venues, timings, playoffs, and final details. Updated officially by BCB.",
    keywords: ["BPL 2026 Schedule",
      "Bangladesh Premier League Fixtures",
      "BPL Today Match",
      "BPL schedule",
      "BPL 2026 schedule",
      "BPL match schedule",
      ],
    robots: {
    index: true, // This will override the root layout robots for this route only
    follow: true,
    googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      },
  }
    , alternates: {
      canonical: 'https://bplt20league.com/schedule',
    }
  }
}

 export default function ScheduleHome() {
    // Define breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'BPL Schedule 2026', href: '/schedule', isCurrent: true }
    ];

    // JSON-LD Schema for SEO
    const schedulePageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://bplt20league.com/schedule#webpage",
        "name": "BPL 2026 Schedule, Fixtures, Dates & Match List",
        "description": "Complete BPL 2026 schedule with match dates, fixtures, venues, timings, playoffs, and final details officially updated.",
        "url": "https://bplt20league.com/schedule",
        "inLanguage": "en",
        "isPartOf": {
          "@id": "https://bplt20league.com/#website"
        },
        "about": {
          "@id": "https://bplt20league.com/#sportsleague"
        }
      };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://bplt20league.com/"
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "BPL Schedule 2026",
                item: "https://bplt20league.com/schedule"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Which teams are playing in BPL 2026?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The BPL 2026 will feature six teams: Sylhet Titans, Chattogram Royals, Dhaka Capitals, Noakhali Express, Rangpur Riders, and Rajshahi Warriors."
                }
            },
            {
                "@type": "Question",
                name: "When does the Bangladesh Premier League 2026 start and end?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The BPL 2026 will take place from 26 December 2025 to 23 January 2026."
                }
            },
            {
                "@type": "Question",
                name: "Where can I find the BPL 2026 schedule?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The full BPL 2026 schedule is available online with complete match fixtures, venues, timings, and playoff dates."
                }
            }
        ]
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schedulePageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="schedule-carousel-container  h-[76vh] md:h-[90vh] font-inter ">

                {/* Background Image with Overlay - Using Next.js Image with lazy loading */}
                <div className="schedule-background relative h-[76vh] w-full overflow-hidden">
                    {/* Main Background Image */}
                    <Image
                        src="/images/schedule.webp"
                        alt="BPL Schedule Background"
                        fill
                        className="object-cover object-center"
                        loading="lazy"
                        priority={false}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, 100vw"
                    />
                    
                    {/* Original dark overlay */}
                    <div className="absolute inset-0 bg-black/60 z-5" />

                    {/* Pattern overlay */}
                    <div className="hidden lg:block absolute inset-0 z-10 opacity-50">
                        <Image
                            src="/images/schedule-patern.webp"
                            alt="Schedule Pattern Overlay"
                            width={860}
                            height={600}
                            className="absolute right-0 top-0"
                            loading="lazy"
                            priority={false}
                        />
                    </div>
                    
                   

                    {/* Added Text Content */}
                    <div className="absolute left-25 top-65 transform -translate-y-1/2 z-20 text-[#d4a574] max-w-md">
                        <h2 className="text-3xl italic md:text-6xl md:mt-40 -ml-15 md:-ml-1 font-semibold font-sans mb-4">Schedule</h2>
                        {/* <p className="text-lg md:text-xl">Stay updated with all upcoming matches and events in the Bangladesh Premier League.</p> */}
                    </div>
                </div>
            </div>
             {/* Breadcrumb */}
                    <div className="bg-[#0a0e27] pt-5 px-5 md:px-10">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
            <NPLSchedule />
        </>
    )
}
