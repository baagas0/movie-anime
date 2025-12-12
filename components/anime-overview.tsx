"use client"

import { Play, Plus, Star, Calendar, Film, Users, Globe, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Anime } from "@/lib/types"

interface AnimeOverviewProps {
  anime: Anime
}

export function AnimeOverview({ anime }: AnimeOverviewProps) {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-end pb-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${anime.image_url}')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />
      </section>

      {/* Content Section */}
      <section className="relative z-10 px-4 md:px-8 lg:px-16 -mt-48">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="w-48 md:w-64 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-border">
              <img
                src={anime.image_url || "/placeholder.svg"}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary text-primary-foreground px-3 py-1">{anime.network}</Badge>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
                <span className="font-semibold">{anime.rating}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">{anime.title}</h1>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-3xl">{anime.description}</p>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{anime.year}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Film className="w-4 h-4" />
                <span className="text-sm">{anime.total_episodes} Episodes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{anime.country}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tv className="w-4 h-4" />
                <span className="text-sm">{anime.network}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genre.map((g) => (
                <Badge key={g} variant="secondary" className="bg-secondary text-secondary-foreground">
                  {g}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href={`/watch/${anime.id}?ep=1`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Episode 1
                </Button>
              </Link>
            </div>

            {/* Director */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Director</h3>
              <p className="text-muted-foreground">{anime.director}</p>
            </div>

            {/* Cast */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Cast
              </h3>
              <div className="flex flex-wrap gap-2">
                {anime.stars.map((star) => (
                  <Badge key={star} variant="outline" className="text-muted-foreground border-border">
                    {star}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="px-4 md:px-8 lg:px-16 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Episodes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {anime.episodes
            .slice()
            .reverse()
            .map((ep, index) => (
              <Link key={ep.episode} href={`/watch/${anime.id}?ep=${index + 1}`}>
                <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={anime.image_url || "/placeholder.svg"}
                      alt={ep.title || ep.episode}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/30 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-background/50 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-md shadow">
                      {ep.episode}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center border border-border">
                          <Play className="w-4 h-4 fill-primary text-primary ml-1" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold line-clamp-1">{ep.title || anime.title}</span>
                          <span className="text-muted-foreground">{ep.release_date || "Upcoming"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {ep.episode}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{ep.release_date}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
