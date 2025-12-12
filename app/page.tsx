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
  description: "Jelajahi anime populer tanpa iklan, tonton episode, temukan genre favorit, dan cari rekomendasi tontonan terbaik di OtaMovie.",
  keywords: [
    "anime",
    "film anime",
    "nonton anime online",
    "streaming anime",
    "anime sub indo",
    "anime terbaru",
    "rekomendasi anime",
  ],
  openGraph: {
    type: "website",
    title: "OtaMovie - Anime Terpopuler & Seri Pilihan",
    description: "Lihat anime terpopuler, trailer, dan episode pilihan tanpa iklan. Temukan tontonan berikutnya di OtaMovie.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beranda OtaMovie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OtaMovie - Anime Terpopuler & Seri Pilihan",
    description: "Lihat anime terpopuler, trailer, dan episode pilihan tanpa iklan. Temukan tontonan berikutnya di OtaMovie.",
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
