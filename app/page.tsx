import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryTabs } from "@/components/category-tabs"
import { MovieGrid } from "@/components/movie-grid"
import { FeaturedSection } from "@/components/featured-section"
import { Footer } from "@/components/footer"

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
