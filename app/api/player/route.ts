import { NextResponse } from "next/server"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id") || ""
  const epParam = searchParams.get("ep") || "1"

  const episodeNumber = Number.parseInt(epParam, 10)
  if (!id || Number.isNaN(episodeNumber) || episodeNumber < 1) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 })
  }

  const anime = (animeData as Anime[]).find((a) => a.id === id)
  if (!anime) {
    return NextResponse.json({ error: "Anime not found" }, { status: 404 })
  }

  // Episodes are stored newest-first, so translate ep number to index
  const episodeIndex = anime.episodes.length - episodeNumber
  const targetEpisode = anime.episodes[episodeIndex] || anime.episodes[anime.episodes.length - 1]

  if (!targetEpisode?.iframe_url) {
    return NextResponse.json({ error: "Episode not found" }, { status: 404 })
  }

  // Redirect to the actual iframe URL so it isn't exposed directly in markup
  return NextResponse.redirect(targetEpisode.iframe_url, 302)
}

