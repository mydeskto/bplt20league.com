"use client"

import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function PrivacyPolicy() {
  const showBackToTop = false

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // JSON-LD Schema for SEO
  useEffect(() => {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - BPL T20 | Bangladesh Premier League",
      "description": "Privacy Policy for BPLT20League.com - Learn how we collect, use, and protect your information.",
      "url": "https://bplt20league.com/privacy-policy",
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
            "name": "Privacy Policy",
            "item": "https://bplt20league.com/privacy-policy"
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(webPageSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-25 font-font-inter  tracking-wider">
      <div className="max-w-full mx-auto ">
        <div className=" rounded-lg  p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 text-left">
            Privacy Policy
          </h1>
          <p className="text-xs text-white mb-6 leading-relaxed">
           Last Updated: October 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-md text-white mb-6 leading-relaxed">
              Welcome to <Link href="/" className="underline font-bold">BPLT20League.com</Link>. Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
            </p>

            <p className="text-md text-white mb-8 leading-relaxed">
             By using this site, you agree to the terms described below. If you do not agree, please stop using the website.
            </p>

            <ol className="text-white  ">
              <li className="text-3xl font-bold">
                1. Information We Collect
              </li>
              <p className="pl-3 mb-3">
                We collect information in the following ways:
              </p>
            </ol>
            <div className="text-white ml-10 space-y-3 mb-3">
              <li>
Directly from you: when you contact us, send feedback, or reach out via our contact forms.
              </li>
              <li>
Automatically: through cookies and analytics tools that help us understand how visitors use our site.
              </li>
              <li>
From third parties: such as Google AdSense and Google Analytics, which may collect non-personal data for ad personalization and traffic measurement.
              </li>
            </div>
            <p className="text-md text-white mb-4 leading-relaxed">
We do not collect sensitive information such as payment details, national ID numbers, or passwords.
            </p>





            <ol className="text-white  mt-8 ">
              <li className="text-3xl font-bold">
                2. How We Use Your Information
              </li>
              <p className="pl-3 mb-3">
                Collected information is used to:
              </p>
            </ol>
            <div className="text-white ml-10 space-y-3 mb-3">
              <li>
                Improve website performance and user experience
              </li>
              <li>
                Display relevant advertisements and analyze their performance
              </li>
              <li>
                Respond to inquiries, feedback, or messages
              </li>
              <li>
                Prevent spam, abuse, or unauthorized access
              </li>
            </div>




            <ol className="text-white mt-8 ">
              <li className="text-3xl font-bold mb-3">
                3. Cookies and Tracking Technologies
              </li>
              <p className="pl-3 mb-3">
                Cookies help us remember user preferences, analyze traffic, and show relevant ads. Some cookies are managed by Google AdSense and Google Analytics for advertising and analytics purposes.
              </p>
              <p className="pl-3 mb-3">
You can disable cookies through your browser settings. To manage personalized advertising, you may visit Google Ads Settings.
              </p>
              <p className="pl-3 mb-3">
                Types of cookies we use:
              </p>
            </ol>
            <div className="text-white ml-10 space-y-3 mb-3">
              <li>
                Essential cookies for core website functionality
              </li>
              <li>
              Performance cookies for analytics and improvements
              </li>
              <li>
                Advertising cookies to show relevant ads and reduce repetition
              </li>
            </div>




            <ol className="text-white  mt-8">
              <li className="text-3xl font-bold">
                4. Third-Party Services
              </li>
              <p className="pl-3 mb-3">
                We use trusted third-party services, including:
            </p>
            </ol>
            <div className="text-white ml-10 space-y-3 mb-3">
              <li>
                Google AdSense – to display advertisements
             </li>
              <li>
                Google Analytics – to understand visitor behavior and traffic patterns
              </li>
            </div>
            <p className="text-md text-white mb-4 leading-relaxed">
              These services may collect non-personal information about your activity on this and other websites. Please refer to Google's Privacy Policy for more details.
            </p>



            <ol className="text-white  mt-8">
              <li className="text-3xl font-bold">
                5. Data Retention
              </li>
              <p className="pl-3 mb-3">
               Non-personal analytics data is retained for performance analysis purposes. Messages or emails received through our contact forms are stored securely and removed when no longer required.
             </p>
            </ol>


            <ol className="text-white  mt-8">
              <li className="text-3xl font-bold">
                6. Children's Privacy
              </li>
              <p className="pl-3 mb-3">
                This website is intended for a general audience and is not directed at children under the age of 13. We do not knowingly collect personal data from minors. If you believe a child has shared information with us, please contact us for immediate removal.
         </p>
            </ol>

            <ol className="text-white mt-8 ">
              <li className="text-3xl font-bold">
                7. International Users
              </li>
              <p className="pl-3 mb-3">
                If you access our website from outside South Asia, your information may be processed or stored in countries where our hosting or third-party service providers operate. By using this site, you consent to this data processing.
            </p>
            </ol>


            <ol className="text-white mt-8 ">
              <li className="text-3xl font-bold">
                8. Your Rights and Choices
              </li>
              <p className="pl-3 mb-3">
               You have the right to:
            </p>
            </ol>
            <div className="text-white ml-10 space-y-3 mb-3">
              <li>
                Request access to or deletion of your personal data
            </li>
              <li>
                Disable cookies or opt out of personalized advertising
              </li>
              <li>
                Withdraw consent by discontinuing use of this website
              </li>
            </div>
            <p className="text-md text-white mb-4 leading-relaxed">
             For such requests, contact us at:
            </p>
            <p className="text-md text-white mb-4 leading-relaxed">
             📧 infobplt20league@gmail.com
            </p>

            <ol className="text-white  mt-8">
              <li className="text-3xl font-bold">
                9. Advertising and Transparency
              </li>
              <p className="pl-3 mb-3">
                This website displays Google AdSense advertisements to support hosting and operational costs.
           </p>
              <p className="pl-3 mb-8">
                All advertisements shown on BPLT20League.com comply with Google's publisher, content, and user-safety policies.
           </p>
            </ol>

            <ol className="text-white mt-8 ">
              <li className="text-3xl font-bold">
                10. Updates to This Policy
              </li>
              <p className="pl-3 mb-3">
               We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
         </p>
              <p className="pl-3 mb-3">
                We encourage users to review this page periodically.
       </p>
            </ol>


            <ol className="text-white mt-8 ">
              <li className="text-3xl font-bold">
                11. Contact Us
              </li>
              <p className="pl-3 mb-3">
                If you have any questions regarding this Privacy Policy, please contact:
              </p>
              <p className="pl-3 mb-3">
                📧 infobplt20league@gmail.com
              </p>
              <p className="pl-3 mb-3">
                🌐 <a href="/contact-us/" className="underline"> https://bplt20league.com/contact-us/ </a>
              </p>
            </ol>
            <p className="text-md text-white mb-8 leading-relaxed mt-8">
              Note: This website is an independent cricket information platform and is not affiliated with the official Bangladesh Premier League.
            </p>


          </div>
        </div>
      </div>
    </div>
  )
}
