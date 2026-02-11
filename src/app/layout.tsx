import type { Metadata } from 'next'
import { Playfair_Display, Inter, Caveat } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'A story about us.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="antialiased bg-cream text-stone-800 font-sans selection:bg-pink-200 selection:text-pink-900">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
