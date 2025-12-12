import type { Metadata } from "next"
import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ ep?: string }>
}): Promise<Metadata> {
  const { id } = await params
  const { ep } = await searchParams
  const anime = (animeData as Anime[]).find((a) => a.id === id)

  if (!anime) {
    return {
      title: "Episode not found",
      robots: { index: false, follow: false },
    }
  }

  const episodeNumber = Number.parseInt(ep || "1", 10)
  const episodeIndex = anime.episodes.length - episodeNumber
  const currentEpisode = anime.episodes[episodeIndex] || anime.episodes[anime.episodes.length - 1]

  const title = `${anime.title} - ${currentEpisode?.episode || "Episode"}`
  const description =
    currentEpisode?.title?.slice(0, 155) ||
    `Tonton ${currentEpisode?.episode || "episode ini"} dari ${anime.title} tanpa iklan di OtaMovie.`
  const poster = anime.image_url || "/banner-image.png"
  const genreKeywords = Array.isArray(anime.genre) ? anime.genre.join(", ") : anime.genre

  return {
    title,
    description,
    keywords: [
      anime.title,
      currentEpisode?.episode || "episode",
      "nonton anime",
      "anime tanpa iklan",
      genreKeywords,
    ],
    openGraph: {
      title,
      description,
      images: [{ url: poster }],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [poster],
    },
    alternates: {
      canonical: `/watch/${id}?ep=${episodeNumber}`,
    },
  }
}

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
