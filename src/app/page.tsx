import { Suspense } from 'react'
import { getLatestAnimes } from '@/api/getLatestAnimes'
import { getRatingAnimes } from '@/api/getRatingAnimes'
import { CardsSection } from '@/components/CardsSection'
import { CarouselHero } from '@/components/HomePage/CarouselHero'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import LatestIcon from '@/components/Icons/LatestIcon'

export default async function HomePage() {
	const CARDS_WIDTH = '230px'
	const CARDS_HEIGHT = '190px'

	return (
		<>
			<Suspense fallback={<div style={{ height: '500px', background: '#1a1a1a' }}>Cargando...</div>}>
				<CarouselHero animesPromise={getRatingAnimes(5)} fallbackPromise={getLatestAnimes(5)} />
			</Suspense>
			<main className={styles.main}>
				<CardsSection
					title='Últimos episodios'
					icon={<LatestIcon />}
					gridProps={{ width: CARDS_WIDTH, height: CARDS_HEIGHT }}
				>
					<Suspense fallback={<div>Cargando episodios...</div>}>
						<LatestEpisodes />
					</Suspense>
				</CardsSection>

				<CardsSection
					title='Últimos animes'
					icon={<LatestIcon />}
					order={1}
					column='1 / span 2'
					gridProps={{ width: '14rem', height: '26rem', gap: '1.5rem' }}
				>
					<Suspense fallback={<div>Cargando animes...</div>}>
						<LatestAnimes />
					</Suspense>
				</CardsSection>
				<Suspense fallback={<div>Cargando aside...</div>}>
					<HomeAside />
				</Suspense>
			</main>
		</>
	)
}
