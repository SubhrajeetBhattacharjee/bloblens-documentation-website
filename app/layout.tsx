import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BlobSense - Real-time Blob Analytics & Documentation',
  description: 'Interactive dashboards and comprehensive documentation for monitoring blob usage, costs, and market dynamics. Get real-time insights into Ethereum blob transactions, rollup activity, and network metrics with BlobSense.',
  keywords: 'blob, analytics, Ethereum, rollups, documentation, real-time data, network metrics, blob costs',
  generator: 'v0.app',
  openGraph: {
    title: 'BlobSense - Real-time Blob Analytics',
    description: 'Interactive dashboards for monitoring blob usage, costs, and market dynamics on Ethereum rollups.',
    url: 'https://blobsense.io',
    siteName: 'BlobSense',
    images: [
      {
        url: '/Thumbnail_website.png',
        width: 1200,
        height: 630,
        alt: 'BlobSense Real-time Blob Analytics Dashboard',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlobSense - Real-time Blob Analytics',
    description: 'Interactive dashboards for monitoring blob usage, costs, and market dynamics on Ethereum rollups.',
    images: ['/Thumbnail_website.png'],
  },
  icons: {
    icon: [
      {
        url: '/bloblogo.png',
        type: 'image/png',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
