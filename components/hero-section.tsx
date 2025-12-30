import Image from 'next/image'
import stadiumBg from '@/public/images/Warner-Park.webp'
import patternBg from '@/public/images/teams_banner_mobile.webp'

interface HeroSectionProps {
  title: string;
  teamData?: {
    position: number;
    points: number;
    matches: number;
    won: number;
    lost: number;
  };
}

export function HeroSection({ title }: HeroSectionProps) {
  return (
    <div className="relative h-[30vh] md:h-[65vh] min-h-[200px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${stadiumBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Cricket stadium background"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-5" />

        {/* Pattern overlay */}
        <div
          className="hidden lg:block absolute inset-0 "
          style={{
            backgroundImage: `url(${patternBg.src})`,
            // backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "860px",
            // mixBlendMode: "overlay",
            opacity: 1,
           
          }}
        />

        {/* Text Content */}
        <div className="absolute inset-0 top-40 md:top-70 italic flex items-center px-6 md:px-12 z-30">
          <div className="text-[#d4a574] max-w-2xl">
            <h2 className="text-3xl md:text-6xl  font-semibold mb-4">{title}</h2>
            
          </div>
        </div>
      </div>
    </div>
  )
}
