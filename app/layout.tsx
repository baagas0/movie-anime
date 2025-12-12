import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = "https://animevault.example.com"
const siteName = "AnimeVault"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Discover Amazing Anime Movies`,
    template: `%s | ${siteName}`,
  },
  description: "Your gateway to the best anime movies. Explore, discover, and enjoy.",
  keywords: ["anime", "movies", "series", "streaming", "watch anime online"],
  openGraph: {
    siteName,
    type: "website",
    url: siteUrl,
    title: `${siteName} - Discover Amazing Anime Movies`,
    description: "Your gateway to the best anime movies. Explore, discover, and enjoy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AnimeVault",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@animevault",
    creator: "@animevault",
    title: `${siteName} - Discover Amazing Anime Movies`,
    description: "Your gateway to the best anime movies. Explore, discover, and enjoy.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
