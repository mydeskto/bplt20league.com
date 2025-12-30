"use client"

import { useEffect } from "react"

export default function TermsConditions() {
  // JSON-LD Schema for SEO
  useEffect(() => {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions - BPL T20 | Bangladesh Premier League",
      "description": "Terms and Conditions for BPLT20League.com - Read our terms of use and user agreement.",
      "url": "https://bplt20league.com/terms-conditions",
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
            "name": "Terms and Conditions",
            "item": "https://bplt20league.com/terms-conditions"
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
    <div className="min-h-screen bg-[#0a0e27]  font-inter ">

      <div className="max-w-full mx-auto pt-25">
        <div className=" rounded-lg  p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-left">
            Terms and Conditions
          </h1>
          <p className="text-sm text-white mb-6 leading-relaxed">
            Last Updated: September 2025
          </p>

          <div className="prose prose-lg max-w-none">

            <p className="text-md text-white mb-8 leading-relaxed">
              Welcome to BPLT20League.com. By accessing or using <a href="https://bplt20league.com" className="text-blue-400 hover:text-blue-300 underline">https://bplt20league.com</a> (the "Site"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please stop using the Site immediately.
            </p>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                1. Use of the Site
              </li>
            </ol>
            <ul className="text-white ml-10 space-y-3 mb-8 list-disc">
              <li className="text-md">
                You must be at least 13 years old to use this Site.
              </li>
              <li className="text-md">
                You agree to use the Site only for lawful purposes and in compliance with these Terms.
              </li>
              <li className="text-md">
                You must not attempt to damage, disable, or interfere with the Site's operation, security, or accessibility.
              </li>
            </ul>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                2. Intellectual Property Rights
              </li>
              <p className="pl-3 my-3 text-md">
                All content on BPLT20League.com, including text, graphics, logos, and other materials, is owned by or licensed to us and protected by applicable copyright and intellectual property laws.
              </p>
              <p className="pl-3 my-3 text-md">
                You may not copy, reproduce, or distribute any part of the Site's content for commercial purposes without prior written permission.
              </p>
              <p className="pl-3 mb-8 text-md">
                You may share our content for non-commercial purposes with proper credit and a link to the original page.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                3. User-Generated Content
              </li>
              <p className="pl-3 my-3 text-md">
                If you submit comments, suggestions, or other material on the Site:
              </p>
            </ol>
            <ul className="text-white ml-10 space-y-3 mb-8 list-disc">
              <li className="text-md">
                You grant us a non-exclusive, royalty-free license to use, display, and publish that content.
              </li>
              <li className="text-md">
                You agree not to post anything illegal, misleading, defamatory, or that violates the rights of others.
              </li>
              <li className="text-md">
                We reserve the right to remove content that violates these Terms or Google's content policies.
              </li>
            </ul>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                4. Third-Party Links and Advertisements
              </li>
              <p className="pl-3 my-3 text-md">
                The Site may display advertisements through Google AdSense or other verified partners. These services may use cookies to show relevant ads based on browsing behavior.
              </p>
              <p className="pl-3 mb-8 text-md">
                We may also include links to external websites for reference or convenience. We are not responsible for the content, accuracy, or policies of third-party websites.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                5. Disclaimer of Warranties
              </li>
              <p className="pl-3 my-3 text-md">
                All content on this Site is provided on an "as is" and "as available" basis.
              </p>
              <p className="pl-3 my-3 text-md">
                We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of any information.
              </p>
              <p className="pl-3 mb-8 text-md">
                We do not guarantee uninterrupted access or error-free operation of the Site.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                6. Limitation of Liability
              </li>
              <p className="pl-3 my-3 mb-8 text-md">
                To the maximum extent permitted by law, BPLT20League.com, its owners, and contributors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site or reliance on its content.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                7. Privacy Policy
              </li>
              <p className="pl-3 my-3 mb-8 text-md">
                Your use of this Site is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                8. Changes to These Terms
              </li>
              <p className="pl-3 my-3 text-md">
                We may update these Terms from time to time to reflect operational or legal changes.
              </p>
              <p className="pl-3 my-3 text-md">
                Any updates will be posted on this page with a revised "Last Updated" date. Continued use of the Site indicates acceptance of the updated Terms.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                9. Governing Law
              </li>
              <p className="pl-3 my-3 text-md">
                These Terms and your use of the Site are governed by the laws of Bangladesh. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of Bangladesh.
              </p>
            </ol>

            <ol className="text-white mt-8">
              <li className="text-3xl font-bold">
                10. Contact Us
              </li>
              <p className="pl-3 my-3 text-md">
                If you have questions regarding these Terms and Conditions, please contact us:
              </p>
              <p className="pl-3 mb-3 text-md">
                📧 infobplt20league@gmail.com
              </p>
              <p className="pl-3 mb-8 text-md">
                🌐 <a href="https://bplt20league.com/contact-us/" className="text-blue-400 hover:text-blue-300 underline">https://bplt20league.com/contact-us/</a>
              </p>
            </ol>

          </div>
        </div>
      </div>

    </div>
  )
}
