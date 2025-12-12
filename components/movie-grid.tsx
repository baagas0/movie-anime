"use client"

import { Star, Play, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import animeData from "@/data/anime.json"
import type { Anime } from "@/lib/types"

export function MovieGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const animes = animeData as Anime[]
  const pageSize = 18
  const [page, setPage] = useState(1)

  const filteredAnimes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return animes
    return animes.filter((anime) => {
      const inTitle = anime.title.toLowerCase().includes(term)
      const inGenres = Array.isArray(anime.genre)
        ? anime.genre.some((g) => g.toLowerCase().includes(term))
        : typeof anime.genre === "string" && anime.genre.toLowerCase().includes(term)
      return inTitle || inGenres
    })
  }, [animes, searchTerm])

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredAnimes.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedAnimes = filteredAnimes.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xl">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or genre..."
            className="pl-12 pr-24 h-12 rounded-xl bg-secondary/80 border-border text-sm"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{paginatedAnimes.length}</span> of{" "}
          <span className="text-foreground font-semibold">{filteredAnimes.length}</span> results
        </div>
      </div>

      {filteredAnimes.length === 0 ? (
        <div className="text-sm text-muted-foreground">No results found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {paginatedAnimes.map((anime) => (
            <div
              key={anime.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredId(anime.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/anime/${anime.id}`}>
                <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 bg-card">
                  <img
                    src={anime.image_url || "/placeholder.svg"}
                    alt={anime.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
      )}

      {filteredAnimes.length > pageSize && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="border-border"
          >
            Prev
          </Button>
          <div className="text-sm text-muted-foreground">
            Page <span className="text-foreground font-semibold">{currentPage}</span> of{" "}
            <span className="text-foreground font-semibold">{totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="border-border"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
