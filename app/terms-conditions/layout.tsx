import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions - BPL T20 | Bangladesh Premier League',
  description: 'Terms and Conditions for BPLT20League.com - Read our terms of service, user agreements, and legal policies.',
  alternates: {
    canonical: 'https://bplt20league.com/terms-conditions',
  },
}

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

