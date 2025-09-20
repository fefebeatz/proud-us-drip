import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ClerkProvider } from '@clerk/nextjs'
import { frFR } from '@clerk/localizations'
import { Toaster } from 'react-hot-toast'
import { SanityLive } from '@/sanity/lib/live'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Proud Us Drip',
    template: 'Proud Us Drip | %s',
  },
  description:
    'Le streetwear qui fait du bien. Des vêtements conçus sur mesure rien que pour vous.',
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider dynamic localization={frFR}>
      <html lang='fr'>
        <body className={`${montserrat.className} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster
            position='bottom-right'
            toastOptions={{
              style: {
                background: '#000000',
                color: '#ffffff',
              },
            }}
          />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  )
}
