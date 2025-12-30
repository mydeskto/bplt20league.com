import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - BPL T20 | Bangladesh Premier League',
  description: 'Get in touch with BPLT20League.com. Contact us for inquiries, support, or feedback about the Bangladesh Premier League.',
  alternates: {
    canonical: 'https://bplt20league.com/contact-us',
  },
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

