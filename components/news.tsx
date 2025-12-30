import { NewsCard } from "@/components/news-card"
import { newsArticles } from "@/data/news-data"

export default function NewsPageForHome() {
    return (
        <div className="min-h-screen bg-[#0a0e27]">
\            <div className="container mx-auto px-4 py-8 lg:px-8">
                {/* Latest News Heading */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#d4a574] mb-2">Latest News</h2>
                    <div className="w-20 h-1 bg-[#d4a574] rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...newsArticles]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((article) => (
                            <NewsCard key={article.id} {...article} image={typeof article.image === "string" ? article.image : article.image.src} />
                        ))}
                </div>
            </div>
        </div>
    )
}
