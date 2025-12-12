"use client"

import { Play, Plus, Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"

export function HeroSection() {
  const featured = animeData[0] as Anime

  return (
    <section className="relative min-h-[90vh] flex items-end pb-16 pt-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${featured.image_url}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">Featured</Badge>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-sm font-medium">{featured.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">{featured.year}</span>
          <span className="text-muted-foreground text-sm">{featured.total_episodes} Episodes</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance leading-tight">
          {featured.title}
        </h1>

        <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
          {featured.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          {featured.genre.map((g, i) => (
            <span key={g} className="flex items-center gap-4 text-sm text-muted-foreground">
              {g}
              {i < featured.genre.length - 1 && <span className="w-1 h-1 rounded-full bg-muted-foreground" />}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          <span className="text-foreground font-medium">Director:</span> {featured.director} |{" "}
          <span className="text-foreground font-medium">Network:</span> {featured.network}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href={`/watch/${featured.id}?ep=1`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-border hover:bg-secondary gap-2 bg-transparent">
            <Plus className="w-5 h-5" />
            Add to List
          </Button>
          <Link href={`/anime/${featured.id}`}>
            <Button size="lg" variant="ghost" className="gap-2">
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
