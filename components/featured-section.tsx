"use client"

import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

const featuredMovies = [
  {
    id: 1,
    title: "Suzume",
    image: "/anime-movie-poster-beautiful-girl-with-magical-doo.jpg",
    rating: 8.9,
    year: 2024,
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "Your Name",
    image: "/anime-movie-poster-boy-and-girl-with-comet-in-sky.jpg",
    rating: 9.0,
    year: 2016,
    genre: "Romance",
  },
  {
    id: 3,
    title: "Spirited Away",
    image: "/anime-movie-poster-girl-in-magical-spirit-world.jpg",
    rating: 9.3,
    year: 2001,
    genre: "Fantasy",
  },
  {
    id: 4,
    title: "Jujutsu Kaisen 0",
    image: "/anime-movie-poster-dark-sorcerer-with-cursed-spiri.jpg",
    rating: 8.6,
    year: 2023,
    genre: "Action",
  },
  {
    id: 5,
    title: "Weathering With You",
    image: "/anime-movie-poster-boy-and-girl-in-rain-with-sunsh.jpg",
    rating: 8.4,
    year: 2019,
    genre: "Romance",
  },
  {
    id: 6,
    title: "One Piece Film: Red",
    image: "/anime-movie-poster-pirate-crew-with-red-haired-sin.jpg",
    rating: 8.2,
    year: 2022,
    genre: "Action",
  },
]

export function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
          <p className="text-muted-foreground mt-1">Most watched anime movies this week</p>
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
        {featuredMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 md:w-56 group relative cursor-pointer"
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {hoveredId === movie.id && (
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
                <span className="text-xs font-medium text-foreground">{movie.rating}</span>
              </div>
            </div>

            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{movie.year}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{movie.genre}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
