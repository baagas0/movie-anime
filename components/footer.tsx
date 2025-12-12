import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="px-4 py-12 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="OtaMovie" width={100} height={100} className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-foreground">OtaMovie</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Your ultimate destination for the best anime movies. Discover, watch, and enjoy thousands of titles.
            </p>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2025 OtaMovie. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
