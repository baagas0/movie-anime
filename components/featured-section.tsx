"use client"

import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef, useMemo } from "react"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"

const parseYear = (year: string | undefined): number => {
  if (!year) return 0
  const match = year.match(/\d{4}/)
  if (!match) return 0
  const value = Number.parseInt(match[0], 10)
  return Number.isNaN(value) ? 0 : value
}

export function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const trending = useMemo(() => {
    const animes = animeData as Anime[]
    return [...animes]
      .map((anime) => ({
        ...anime,
        parsedYear: parseYear(anime.year),
      }))
      .sort((a, b) => b.parsedYear - a.parsedYear)
      .slice(0, 12)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trending Now</h2>
          <p className="text-muted-foreground mt-1">Anime terbaru & paling banyak dilihat</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border hover:bg-secondary bg-transparent"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border hover:bg-secondary bg-transparent"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {trending.map((anime) => {
          const genres = Array.isArray(anime.genre) ? anime.genre.join(" / ") : anime.genre
          const rating = anime.rating ?? "N/A"
          const year = anime.parsedYear || anime.year || "Unknown"

          return (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="flex-shrink-0 w-48 md:w-56 group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              onMouseEnter={() => setHoveredId(anime.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img
                  src={anime.image_url || "/placeholder.svg"}
                  alt={anime.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {hoveredId === anime.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="w-14 h-14 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground animate-in fade-in zoom-in duration-300"
                    >
                      <Play className="w-6 h-6 fill-current" />
                    </Button>
                  </div>
                )}

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-foreground">{rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {anime.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{year}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{genres}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
