import Header from '@/components/Header/Header'
import { APP_ROUTES } from '@/constants'
import { Inter } from 'next/font/google'
import '../globals.css'

export const metadata = {
  title: 'One Anime',
  description:
    'Descubre un mundo lleno de tus animes favoritos y sumérgete en la magia del entretenimiento en línea. En este lugar, podrás disfrutar de una amplia selección de series animadas japonesas que te transportarán a emocionantes aventuras, intrigantes historias y personajes inolvidables. Desde los clásicos más queridos hasta los lanzamientos más recientes, aquí encontrarás todo lo que necesitas para saciar tu pasión por el anime. No importa si eres un fanático de la acción, la comedia, el romance o la fantasía, nuestra plataforma te brinda la oportunidad de disfrutar de tus animes favoritos en cualquier momento y en cualquier lugar. ¡Únete a nuestra comunidad anime y déjate llevar por la emoción de este fascinante universo!',
  icons: {
    icon: '/Nika_Logo.svg',
    apple: '/Nika_Logo.svg',
  },
}

const interFont = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  preload: true,
  adjustFontFallback: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className={interFont.className}>
        <Header pages={APP_ROUTES} />
        {children}
      </body>
    </html>
  )
}
