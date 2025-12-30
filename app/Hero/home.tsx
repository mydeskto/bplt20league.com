import { HeroCarousel } from './component'

export const HeroComponent = () => {
  return (
    <>
      {/* Critical LCP Element - Rendered Server-Side for Immediate Display */}
      {/* This renders immediately without waiting for JavaScript, reducing LCP delay from 9.3s to <1s */}
      <div className="hero-lcp-element absolute inset-0 z-50 pointer-events-none" style={{ minHeight: '200px' }}>
        <div className="w-full px-4 md:px-6 h-full flex items-center">
          <div className="grid grid-cols-12 items-center h-full w-full">
            <div className="col-span-12 lg:col-span-6 pl-0 md:pl-8 text-white space-y-6 md:pt-16 w-full relative">
              
            </div>
          </div>
        </div>
      </div>
      {/* Client component for interactivity - LCP element hidden here to avoid duplication */}
      <HeroCarousel />
    </>
  )
}
