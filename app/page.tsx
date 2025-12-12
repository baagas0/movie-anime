import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryTabs } from "@/components/category-tabs"
import { MovieGrid } from "@/components/movie-grid"
import { FeaturedSection } from "@/components/featured-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | OtaMovie",
  },
  description: "Discover trending anime movies, watch episodes, explore genres, and find what to watch next on OtaMovie.",
  keywords: [
    "anime",
    "anime movies",
    "anime streaming",
    "watch anime online",
    "trending anime",
    "new anime releases",
  ],
  openGraph: {
    type: "website",
    title: "OtaMovie - Trending Anime Movies & Series",
    description: "Explore trending anime movies, trailers, and episodes. Find your next watch on OtaMovie.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OtaMovie Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OtaMovie - Trending Anime Movies & Series",
    description: "Explore trending anime movies, trailers, and episodes. Find your next watch on OtaMovie.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <section className="px-4 py-12 md:px-8 lg:px-16">
          <CategoryTabs />
          <MovieGrid />
        </section>
      </main>
      <Footer />
    </div>
  )
}
