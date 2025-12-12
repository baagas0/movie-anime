"use client"

import { Star, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Link from "next/link"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"

export function MovieGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const animes = animeData as Anime[]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {animes.map((anime) => (
        <div
          key={anime.id}
          className="group relative cursor-pointer"
          onMouseEnter={() => setHoveredId(anime.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Link href={`/anime/${anime.id}`}>
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 bg-card">
              <img
                src={anime.image_url || "/placeholder.svg"}
                alt={anime.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
                {anime.total_episodes} EP
              </Badge>

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-foreground">{anime.rating}</span>
              </div>

              {hoveredId === anime.id && (
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 animate-in slide-in-from-bottom-4 duration-300">
                  <Link href={`/watch/${anime.id}?ep=1`} className="flex-1">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-1">
                      <Play className="w-4 h-4 fill-current" />
                      Play
                    </Button>
                  </Link>
                  <Button size="icon" variant="secondary" className="bg-secondary/80 hover:bg-secondary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </Link>

          <Link href={`/anime/${anime.id}`}>
            <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
              {anime.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{anime.year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{anime.genre[0]}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
