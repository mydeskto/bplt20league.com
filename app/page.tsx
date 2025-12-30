"use client"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Lazy load HomeLoader
const HomeLoader = dynamic(() => import("./components/HomeLoader").then(mod => ({ default: mod.HomeLoader })), {
  ssr: false,
})

// Lazy load the home content component
const HomeContent = dynamic(() => import("./components/HomeContent").then(mod => ({ default: mod.HomeContent })), {
  ssr: true, // Keep SSR for SEO
})

const home = () => {
  return (
    <Suspense fallback={<HomeLoader />}>
      <HomeContent />
    </Suspense>
  )
}

export default home