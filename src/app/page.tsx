import { CardsSection } from '@/components/CardsSection'
import { CarouselHero } from '@/components/HomePage/CarouselHero'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { CardsSkeleton, LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import LatestIcon from '@/components/Icons/LatestIcon'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Suspense } from 'react'

interface CSSProps extends React.CSSProperties {
  '--section-grid-order'?: string | number
  '--section-grid-column'?: string | number
}

export default async function HomePage() {
  const CARDS_WIDTH = '230px'
  const CARDS_HEIGHT = '190px'

  return (
    <>
      <CarouselHero animesPromise={getRatingAnimes(5)} />
      <main className={styles.main}>
        <CardsSection
          title='Últimos episodios'
          icon={<LatestIcon />}
          gridProps={{ width: CARDS_WIDTH, height: CARDS_HEIGHT }}
        >
          <Suspense fallback={<CardsSkeleton countCards={3} hasPill={true} />}>
            <LatestEpisodes />
          </Suspense>
        </CardsSection>

        <CardsSection
          title='Últimos animes'
          icon={<LatestIcon />}
          style={
            {
              '--section-grid-order': 1,
              '--section-grid-column': '1 / span 2'
            } as CSSProps
          }
          gridProps={{ width: '14rem', height: '26rem', gap: '1.5rem' }}
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
