import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://media-flow-snowy.vercel.app'),
  title: {
    default: "MediaHub - Universal Media Player | Play Video, Audio, View Images & PDFs Online",
    template: "%s | MediaHub - Universal Media Player"
  },
  description: "MediaHub is a free, powerful universal media player for playing videos, audio files, viewing images, and reading PDFs online. Support for MP4, MP3, JPG, PNG, PDF and more. No installation required.",
  keywords: [
    "media player",
    "universal media player",
    "online video player",
    "audio player online",
    "image viewer",
    "PDF viewer",
    "MP4 player",
    "MP3 player",
    "web media player",
    "free media player",
    "video player online",
    "audio player",
    "document viewer",
    "multimedia player",
    "play video online",
    "play audio online",
    "view images online",
    "read PDF online",
    "browser media player",
    "HTML5 media player",
    "responsive media player",
    "cross-platform media player"
  ],
  authors: [{ name: "MediaHub Team" }],
  creator: "MediaHub",
  publisher: "MediaHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://media-flow-snowy.vercel.app",
    siteName: "MediaHub - Universal Media Player",
    title: "MediaHub - Universal Media Player | Play Video, Audio, View Images & PDFs",
    description: "Free online universal media player supporting videos, audio, images, and PDFs. No installation required. Works on any device.",
    images: [
      {
        url: "/og-image.png", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "MediaHub Universal Media Player",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaHub - Universal Media Player | Play Video, Audio, View Images & PDFs",
    description: "Free online universal media player supporting videos, audio, images, and PDFs. No installation required.",
    images: ["/og-image.png"], // Create this image
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "okbiN8eweBV97wCO8ZP9zLkMVeEYDhecxaRQVC48exQ",
    other: {
      "google-site-verification": "googlea74e140af2dd5f1b",
    },
  },
  alternates: {
    canonical: "https://media-flow-snowy.vercel.app/", // Replace with your actual domain
  },
  category: "technology",
  icons: {
    icon: [
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="okbiN8eweBV97wCO8ZP9zLkMVeEYDhecxaRQVC48exQ" />
        <link rel="canonical" href="https://media-flow-snowy.vercel.app" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
