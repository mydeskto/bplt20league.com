import type { Metadata } from 'next'
import { blogArticles } from "@/data/blog-data"
import BlogArticle from './components/BlogArticle'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug)
  
  if (!article) {
    return {
      title: 'Article Not Found - BPL Blog',
      description: 'The requested blog article could not be found',
      robots: {
        index: false,
        follow: false
      }
    }
  }

  // Use article keywords if available, otherwise fallback to default keywords
  const keywords = article.keywords && article.keywords.length > 0 
    ? article.keywords 
    : ['BPL Blog', 'Bangladesh Premier League', 'Cricket Blog', 'bpl', 'bpl 2026', article.title];

  return {
    title: `${article.title} - BPL Blog`,
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
      title: `${article.title} - BPL Blog`,
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
      tags: ['BPL', 'Cricket', 'Blog']
    },
    alternates: {
      canonical: `https://bplt20league.com/blog/${slug}/`
    }
  }
}

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Extract image URL
  const imageUrl = typeof article.image === 'string' ? article.image : article.image.src;

  // JSON-LD Schema for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.summary,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "bplteam",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bplt20league.com/images/imag-for-url.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "bplteam",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bplt20league.com/images/imag-for-url.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bplt20league.com/blog/${slug}`
    },
    "articleSection": "Blog",
    "keywords": article.keywords && article.keywords.length > 0 
      ? article.keywords.join(', ') 
      : article.summary
  };

  // FAQPage Schema if FAQs exist
  const faqSchema = article.faq && article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogArticle
        title={article.title}
        date={article.date}
        content={article.content}
        image={article.image}
        summary={article.summary}
        slug={slug}
        faq={article.faq}
        foreignPlayers={article.foreignPlayers}
      />
    </>
  )
}

