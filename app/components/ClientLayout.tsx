"use client"
import { Suspense, ReactNode } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

// Lazy load ProgressBar (client-only component)
const ProgressBar = dynamic(() => import("./ProgressBar").then(mod => ({ default: mod.ProgressBar })), {
  ssr: false,
})

interface ClientLayoutProps {
  children: ReactNode
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <Suspense fallback={null}>
        <ProgressBar />
      </Suspense>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

