import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = "https://otamovie.my.id"
const siteName = "OtaMovie"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Streaming Anime Tanpa Iklan`,
    template: `%s | ${siteName}`,
  },
  description: "Nonton anime tanpa iklan, jelajahi film dan seri anime terbaik dengan sub indo di OtaMovie.",
  keywords: [
    "anime",
    "film anime",
    "seri anime",
    "streaming anime",
    "nonton anime sub indo",
    "anime tanpa iklan",
    "anime terbaru",
  ],
  openGraph: {
    siteName,
    type: "website",
    url: siteUrl,
    title: `${siteName} - Streaming Anime Tanpa Iklan`,
    description: "Nonton anime tanpa iklan, jelajahi film dan seri anime terbaik dengan sub indo di OtaMovie.",
    images: [
      {
        url: "/banner-image.png",
        width: 1200,
        height: 630,
        alt: "OtaMovie Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@OtaMovie",
    creator: "@OtaMovie",
    title: `${siteName} - Streaming Anime Tanpa Iklan`,
    description: "Nonton anime tanpa iklan, jelajahi film dan seri anime terbaik dengan sub indo di OtaMovie.",
    images: ["/banner-image.png"],
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
    <html lang="id">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
