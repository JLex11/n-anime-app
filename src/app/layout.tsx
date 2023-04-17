import { Inter } from 'next/font/google'
import '../styles/globals.css'

export const metadata = {
  title: 'Anime App',
  description: 'This a web app to see favorite animes',
  keywords: ['anime', 'app', 'nextjs'],
}

const interFont = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={interFont.variable}>{children}</body>
    </html>
  )
}
