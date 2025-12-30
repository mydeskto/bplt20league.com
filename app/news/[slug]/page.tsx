import type { Metadata } from 'next'
import { newsArticles } from "@/data/news-data"
import NewsArticle from './components/NewsArticle'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug)
  
  if (!article) {
    return {
      title: 'Article Not Found - BPL News',
      description: 'The requested news article could not be found',
      robots: {
        index: false,
        follow: false
      }
    }
  }

  // Use article keywords if available, otherwise fallback to default keywords
  const keywords = article.keywords && article.keywords.length > 0 
    ? article.keywords 
    : ['BPL News', 'Bangladesh Premier League', 'Cricket News', 'bpl', 'bpl 2026', article.title];

  return {
    title: `${article.title} - BPL News`,
    description: article.summary,
    keywords: keywords,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      }
    },
    openGraph: {
      title: `${article.title} - BPL News`,
      description: article.summary,
      siteName: "bplt20league",
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: typeof article.image === 'string' ? article.image : article.image.src,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/jpeg',
        }
      ],
      publishedTime: article.date,
      authors: ['bplteam'],
      tags: ['BPL', 'Cricket', 'News']
    },
    alternates: {
      canonical: `https://bplt20league.com/news/${slug}`
    }
  }
}

interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Extract image URL
  const imageUrl = typeof article.image === 'string' ? article.image : article.image.src;

  // JSON-LD Schema for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.summary,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "BPL T20 Team",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bplt20league.com/images/imag-for-url.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "BPL T20 Team",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bplt20league.com/images/imag-for-url.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bplt20league.com/news/${slug}`
    },
    "articleSection": "News",
    "keywords": article.keywords && article.keywords.length > 0 
      ? article.keywords.join(', ') 
      : article.summary
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NewsArticle
        title={article.title}
        date={article.date}
        content={article.content}
        image={article.image}
        summary={article.summary}
        slug={slug}
      />
    </>
  )
}
