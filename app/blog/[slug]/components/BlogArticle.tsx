"use client";

import { Breadcrumb } from "@/components/breadcrumb"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AuthorDetails from "@/components/authordetails"
import { useState, useEffect, useRef } from "react"

interface FAQItem {
  question: string;
  answer: string;
}

interface ForeignPlayer {
  team: string;
  teamLink?: string;
  players: string;
}

interface BlogArticleProps {
  title: string
  date: string
  content: string
  image: string | { src: string }
  summary: string
  slug: string
  faq?: FAQItem[];
  foreignPlayers?: ForeignPlayer[];
}

export default function BlogArticle({ title, date, content, image, summary, slug, faq, foreignPlayers }: BlogArticleProps) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const adInitialized = useRef(false);
  const adContainerRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };
  // Define breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    // { label: title, href: `/blog/${slug}`, isCurrent: true }
  ]

  // Initialize Google AdSense ad after script loads
  useEffect(() => {
    if (adInitialized.current) return;
    
    const initializeAd = () => {
      try {
        if (
          typeof window !== 'undefined' && 
          (window as any).adsbygoogle && 
          !adInitialized.current && 
          adContainerRef.current
        ) {
          // Check if ad element exists in DOM
          const adElement = adContainerRef.current.querySelector('.adsbygoogle');
          if (adElement && !adElement.hasAttribute('data-adsbygoogle-status')) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            adInitialized.current = true;
          }
        }
      } catch (err) {
        console.error('Error initializing AdSense:', err);
      }
    };

    // Check if adsbygoogle is already available
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      // Wait a bit for DOM to be ready
      setTimeout(initializeAd, 100);
    } else {
      // Wait for script to load (script is loaded globally in layout.tsx)
      const checkAdSense = setInterval(() => {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle && adContainerRef.current) {
          initializeAd();
          clearInterval(checkAdSense);
        }
      }, 100);

      // Cleanup interval after 15 seconds
      setTimeout(() => {
        clearInterval(checkAdSense);
        // Try one more time after timeout
        if (!adInitialized.current) {
          initializeAd();
        }
      }, 15000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#122754]">
      <HeroSection title="Blog" />
      
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />


         <div className="mb-8 pt-5 pl-10">
            <Link href="/blog/">
              <Button
                variant="outline"
                className="mb-6 border-green-500/30 hover:bg-green-500/20 hover:text-white bg-transparent text-white hover:border-green-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        
        {/* Article Content */}
        <article className="max-w-4xl mx-auto ">
          

          {/* Article Image */}
          <div className="mb-8">
            <Image
              src={typeof image === "string" ? image : image.src}
              alt={title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Google AdSense Ad - NPL 3 */}
          {/* Script is loaded globally in layout.tsx, no need to load here */}
          <div className="my-4 container mx-auto px-4" ref={adContainerRef}>
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-3169729065573671"
              data-ad-slot="8664753806"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
              <span>{date}</span>
              <span>•</span>
              <span>BPL 2025</span>
            </div>
          </div>

          

          {/* Article Summary */}
          {/* <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-lg text-white leading-relaxed">
              {summary}
            </p>
          </div> */}

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-invert max-w-none text-white [&_a]:text-emerald-400 [&_a:hover]:text-emerald-300 [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:text-emerald-400 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-4 [&_h3]:text-emerald-400 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2 [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-600 [&_table]:my-6 [&_th]:border [&_th]:border-gray-600 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-emerald-400 [&_th]:font-semibold [&_td]:border [&_td]:border-gray-600 [&_td]:px-4 [&_td]:py-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Foreign Players Table */}
          {foreignPlayers && foreignPlayers.length > 0 && (
            <div className="w-full my-8">
              <table className="w-full border-collapse border border-gray-600">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-gray-600 px-4 py-3 text-left text-emerald-400 font-semibold">Team</th>
                    <th className="border border-gray-600 px-4 py-3 text-left text-emerald-400 font-semibold">Foreign Players</th>
                  </tr>
                </thead>
                <tbody>
                  {foreignPlayers.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "" : "bg-slate-800"}>
                      <td className="border border-gray-600 px-4 py-3">
                        {item.teamLink ? (
                          <a 
                            href={item.teamLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 underline"
                          >
                            {item.team}
                          </a>
                        ) : (
                          item.team
                        )}
                      </td>
                      <td className="border border-gray-600 px-4 py-3 text-slate-200">{item.players}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* FAQ Section */}
          {faq && faq.length > 0 && (
            <div id="faq" className="w-full bg-[#122754] rounded-lg p-6 mt-8 scroll-mt-20">
              <h2 className="text-blue-400 text-sm font-bold tracking-wider mb-6 uppercase">FREQUENTLY ASKED QUESTIONS</h2>
              <div className="space-y-4">
                {faq.map((item, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <button
                      className="flex justify-between items-center w-full text-white font-semibold text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">Q{index + 1}:</span>
                        <span>{item.question}</span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                          openFAQIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFAQIndex === index && (
                      <p className="text-gray-300 text-sm leading-relaxed mt-3 ml-7">
                        {item.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Details */}
          <AuthorDetails />
        </article>
      </div>
    </div>
  )
}
