"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, List, Star, Calendar, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Anime, Episode } from "@/lib/types"

interface VideoPlayerProps {
  anime: Anime
  currentEpisode: Episode
  episodeNumber: number
}

export function VideoPlayer({ anime, currentEpisode, episodeNumber }: VideoPlayerProps) {
  const [showEpisodes, setShowEpisodes] = useState(false)

  const hasPrevious = episodeNumber > 1
  const hasNext = episodeNumber < anime.total_episodes

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Main Player Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`/api/player?id=${anime.id}&ep=${episodeNumber}`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={`${anime.title} - ${currentEpisode.episode}`}
          />
        </div>

        {/* Player Controls Bar */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {hasPrevious ? (
                <Link href={`/watch/${anime.id}?ep=${episodeNumber - 1}`}>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" className="gap-1 bg-transparent" disabled>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}

              {hasNext ? (
                <Link href={`/watch/${anime.id}?ep=${episodeNumber + 1}`}>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" className="gap-1 bg-transparent" disabled>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {currentEpisode.episode}
              </Badge>
              <span className="text-sm text-muted-foreground">of {anime.total_episodes} episodes</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 lg:hidden"
              onClick={() => setShowEpisodes(!showEpisodes)}
            >
              <List className="w-4 h-4" />
              Episodes
            </Button>
          </div>
        </div>

        {/* Anime Info */}
        <div className="p-4 md:p-6 bg-background">
          <div className="flex gap-4 md:gap-6">
            <div className="hidden sm:block shrink-0">
              <div className="w-24 md:w-32 aspect-2/3 rounded-lg overflow-hidden border border-border">
                <img
                  src={anime.image_url || "/placeholder.svg"}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">{anime.network}</Badge>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-medium">{anime.rating}</span>
                </div>
              </div>

              <Link href={`/anime/${anime.id}`}>
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                  {anime.title}
                </h1>
              </Link>

              <h2 className="text-lg text-primary font-semibold mb-3">Now Playing: {currentEpisode.episode}</h2>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 md:line-clamp-3">{anime.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {anime.year}
                </span>
                <span className="flex items-center gap-1">
                  <Film className="w-4 h-4" />
                  {anime.total_episodes} Episodes
                </span>
                <span>Director: {anime.director}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {anime.genre.map((g) => (
                  <Badge key={g} variant="outline" className="text-xs">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Episodes List */}
        {showEpisodes && (
          <div className="lg:hidden bg-card border-t border-border p-4">
            <h3 className="font-semibold text-foreground mb-4">All Episodes</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {anime.episodes
                .slice()
                .reverse()
                .map((ep, index) => {
                  const epNum = index + 1
                  const isActive = epNum === episodeNumber
                  return (
                    <Link key={ep.episode} href={`/watch/${anime.id}?ep=${epNum}`}>
                      <div
                        className={`p-3 rounded-lg text-center transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        }`}
                      >
                        <span className="text-sm font-medium">{epNum}</span>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Episodes Sidebar */}
      <div className="hidden lg:block w-80 border-l border-border bg-card overflow-y-auto max-h-[calc(100vh-4rem)]">
        <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <List className="w-4 h-4" />
            Episodes ({anime.total_episodes})
          </h3>
        </div>
        <div className="p-2">
          {anime.episodes
            .slice()
            .reverse()
            .map((ep, index) => {
              const epNum = index + 1
              const isActive = epNum === episodeNumber
              return (
                <Link key={ep.episode} href={`/watch/${anime.id}?ep=${epNum}`}>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                      isActive ? "bg-primary/10 border border-primary" : "hover:bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {isActive ? (
                        <Play className="w-4 h-4 fill-current" />
                      ) : (
                        <span className="text-sm font-medium">{epNum}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                        Episode {epNum}
                      </p>
                      <p className="text-xs text-muted-foreground">{ep.release_date}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
