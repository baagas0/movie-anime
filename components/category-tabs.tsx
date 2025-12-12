"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All" },
  { id: "action", label: "Action" },
  { id: "romance", label: "Romance" },
  { id: "fantasy", label: "Fantasy" },
  { id: "adventure", label: "Adventure" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "sci-fi", label: "Sci-Fi" },
]

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Browse Anime Movie</h2>
    </div>
  )
}
