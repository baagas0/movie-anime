import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimeOverview } from "@/components/anime-overview"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"
import { notFound } from "next/navigation"

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
