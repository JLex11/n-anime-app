import { Header } from '@/components/Header'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import LocalFont from 'next/font/local'
import Script from 'next/script'
import { unstable_ViewTransition as ViewTransition } from 'react'
import '../globals.css'

export const metadata: Metadata = {
	title: 'One Anime',
	description:
		'Descubre un mundo lleno de tus animes favoritos y sumérgete en la magia del entretenimiento en línea. En este lugar, podrás disfrutar de una amplia selección de series animadas japonesas que te transportarán a emocionantes aventuras, intrigantes historias y personajes inolvidables. Desde los clásicos más queridos hasta los lanzamientos más recientes, aquí encontrarás todo lo que necesitas para saciar tu pasión por el anime. No importa si eres un fanático de la acción, la comedia, el romance o la fantasía, nuestra plataforma te brinda la oportunidad de disfrutar de tus animes favoritos en cualquier momento y en cualquier lugar. ¡Únete a nuestra comunidad anime y déjate llevar por la emoción de este fascinante universo!',
	icons: {
		icon: '/Nika_Logo.svg',
		apple: '/Nika_Logo.svg',
	},
}

const montserratFont = Montserrat({
	subsets: ['latin'],
	variable: '--montserrat-font',
	preload: true,
	adjustFontFallback: true,
})

const animeAceBBFont = LocalFont({
	src: 'fonts/Anime Ace BB/animeace2_reg.woff2',
	variable: '--anime-ace-bb-font',
	preload: true,
})

interface Props {
	children: React.ReactNode
}

const speculationRulesConfig = {
	prerender: [
		{ source: 'document', where: { selector_matches: 'a.prerender' }, eagerness: 'eager' },
		{ source: 'document', where: { selector_matches: 'a.prerender-hover' }, eagerness: 'moderate' },
	],
	prefetch: [{ source: 'document', where: { selector_matches: 'a.prefetch' } }],
}

const speculationRulesJSON = JSON.stringify(speculationRulesConfig)

export default function RootLayout({ children }: Props) {
	return (
		<ViewTransition>
			<html lang='es'>
				<Script type='speculationrules' id='speculation-rules-script'>
					{speculationRulesJSON}
				</Script>
				<body className={clsx(montserratFont.className, animeAceBBFont.variable)}>
					<Header />
					{children}
				</body>
			</html>
		</ViewTransition>
	)
}
