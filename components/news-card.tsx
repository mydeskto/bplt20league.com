import Image from "next/image"
import Link from "next/link"


interface NewsCardProps {
  id: string
  slug: string
  title: string
  date: string
  summary: string
  image: string
}

export function NewsCard({ slug, title, date, summary, image }: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="block">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600/30 overflow-hidden hover:bg-slate-700/50 transition-colors">
        <div className="aspect-video relative overflow-hidden">
          <Image 
            src={image} 
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
          />
        </div>
        <div className="p-6">
          <p className="text-sm text-[#d4a574] mb-2">{date}</p>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-200 line-clamp-2">{summary}</p>
        </div>
      </div>
    </Link>
  )
}