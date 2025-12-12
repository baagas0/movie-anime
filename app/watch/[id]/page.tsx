import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"
import { notFound } from "next/navigation"

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ ep?: string }>
}) {
  const { id } = await params
  const { ep } = await searchParams
  const anime = (animeData as Anime[]).find((a) => a.id === id)

  if (!anime) {
    notFound()
  }

  const episodeNumber = Number.parseInt(ep || "1", 10)
  // Episodes are stored in reverse order (newest first), so we need to get the correct index
  const episodeIndex = anime.episodes.length - episodeNumber
  const currentEpisode = anime.episodes[episodeIndex] || anime.episodes[anime.episodes.length - 1]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <VideoPlayer anime={anime} currentEpisode={currentEpisode} episodeNumber={episodeNumber} />
      </main>
    </div>
  )
}
