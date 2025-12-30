// Lazy-loaded components to reduce initial bundle size
import dynamic from 'next/dynamic'

// Lazy load heavy pages/components that have default exports


// Lazy load components with animations
export const LazyMatchCarousel = dynamic(
  () => import('@/app/matches/components/match_carosule'),
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" />
  }
)

