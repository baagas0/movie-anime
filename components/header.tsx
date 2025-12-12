"use client"

import { useState } from "react"
import { Search, Menu, X, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">AnimeVault</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
          </nav>
        </div>

        {/* <div className="flex items-center gap-3">
          {isSearchOpen ? (
            <div className="flex items-center gap-2">
              <Input placeholder="Search anime..." className="w-48 md:w-64 bg-secondary border-border" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div> */}
      </div>

      {isMenuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-background border-b border-border">
          <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
            Home
          </a>
          {/* <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
            Movies
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
            Series
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
            Popular
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
            New Releases
          </a> */}
        </nav>
      )}
    </header>
  )
}
