import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimeOverview } from "@/components/anime-overview"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const anime = (animeData as Anime[]).find((a) => a.id === id)

  if (!anime) {
    return {
      title: "Anime not found",
      robots: { index: false, follow: false },
    }
  }

  const description = anime.description?.slice(0, 155) || `Watch ${anime.title} and explore episodes.`
  const poster = anime.image_url || "/og-image.png"

  return {
    title: anime.title,
    description,
    openGraph: {
      title: anime.title,
      description,
      images: [{ url: poster }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: anime.title,
      description,
      images: [poster],
    },
    alternates: {
      canonical: `/anime/${id}`,
    },
  }
}

export default async function AnimeOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const anime = (animeData as Anime[]).find((a) => a.id === id)

  if (!anime) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AnimeOverview anime={anime} />
      </main>
      <Footer />
    </div>
  )
}
