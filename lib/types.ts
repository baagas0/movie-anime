export interface Episode {
  episode: string
  title: string
  release_date: string
  iframe_url: string
}

export interface Anime {
  id: string
  title: string
  image_url: string
  year: string
  description: string
  genre: string[]
  stars: string[]
  director: string
  country: string
  network: string
  rating: number
  episodes: Episode[]
  total_episodes: number
}
