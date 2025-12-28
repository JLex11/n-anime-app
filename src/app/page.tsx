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
import {
	CarouselHeroSkeleton,
	CardGridSkeleton,
	AnimeCardGridSkeleton,
	HomeAsideSkeleton
} from '@/components/Skeletons'

export default async function HomePage() {

	const CARDS_WIDTH = '230px'
	const CARDS_HEIGHT = '190px'

	return (
		<>
			<Suspense fallback={<CarouselHeroSkeleton />}>
				<CarouselHero animesPromise={getRatingAnimes(5)} fallbackPromise={getLatestAnimes(5)} />
			</Suspense>
			<main className={styles.main}>
				<CardsSection
					title='Últimos episodios'
					icon={<LatestIcon />}
					gridProps={{ width: CARDS_WIDTH, height: CARDS_HEIGHT }}
				>
					<Suspense fallback={<CardGridSkeleton count={20} width={CARDS_WIDTH} height={CARDS_HEIGHT} hasPill />}>
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
					<Suspense fallback={<AnimeCardGridSkeleton count={12} />}>
						<LatestAnimes />
					</Suspense>
				</CardsSection>
				<Suspense fallback={<HomeAsideSkeleton />}>
					<HomeAside />
				</Suspense>
			</main>
		</>
	)
}
