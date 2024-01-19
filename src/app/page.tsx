import { CardsSection } from '@/components/CardsSection'
import { CarouselHero } from '@/components/HomePage/CarouselHero'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import {
  CardsSkeleton,
  LatestEpisodes
} from '@/components/HomePage/LatestEpisodes'
import LatestIcon from '@/components/Icons/LatestIcon'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Suspense } from 'react'

export default async function HomePage() {
  const CARDS_WIDTH = '230px'
  const CARDS_HEIGHT = '190px'
  const CARDS_GAP = '1rem'

  return (
    <>
      <CarouselHero animesPromise={getRatingAnimes(5)} />
      <main className={styles.main}>
        <CardsSection
          title='Últimos episodios'
          icon={<LatestIcon />}
          gridProps={{ width: CARDS_WIDTH, height: CARDS_HEIGHT, gap: CARDS_GAP }}
        >
          <Suspense fallback={<CardsSkeleton countCards={3} hasPill={true} />}>
            <LatestEpisodes />
          </Suspense>
        </CardsSection>

        <CardsSection
          title='Últimos animes'
          icon={<LatestIcon />}
          gridProps={{ gap: CARDS_GAP }}
          style={{ order: 1, gridColumn: '1 / span 2' }}
        >
          <Suspense fallback={<CardsSkeleton countCards={3} />}>
            <LatestAnimes />
          </Suspense>
        </CardsSection>

        <Suspense>
          <HomeAside />
        </Suspense>
      </main>
    </>
  )
}
