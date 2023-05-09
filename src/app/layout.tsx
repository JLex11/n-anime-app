import Header from '@/components/Header/Header'
import { APP_ROUTES } from '@/constants'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Anime App',
  description: 'This a web app to see your favorite animes',
  icons: {
    icon: '/Nika_Logo.svg',
    apple: '/Nika_Logo.svg',
  },
  keywords: ['anime', 'app', 'nextjs'],
}

const interFont = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  preload: true,
  adjustFontFallback: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={interFont.className}>
        <Header pages={APP_ROUTES} />
        {children}
      </body>
    </html>
  )
}
