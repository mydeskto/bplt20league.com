import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - BPL T20 | Bangladesh Premier League',
  description: 'Privacy Policy for BPLT20League.com - Learn how we collect, use, and protect your personal information and data.',
  alternates: {
    canonical: 'https://bplt20league.com/privacy-policy',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

