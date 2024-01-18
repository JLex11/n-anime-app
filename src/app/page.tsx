import { CardsSection } from '@/components/CardsSection'
import { CarouselHero } from '@/components/HomePage/CarouselHero'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { CardsSkeleton, LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import LatestIcon from '@/components/Icons/LatestIcon'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Suspense } from 'react'

export default async function HomePage() {
  return (
    <>
      <CarouselHero animesPromise={getRatingAnimes(5)} />
      <main className={styles.main}>
        <div className={styles.content}>
          <CardsSection title='Últimos episodios' icon={<LatestIcon />} gridWidth={230} gridHeight={190}>
            <Suspense fallback={<CardsSkeleton countCards={3} hasPill={true} />}>
              <LatestEpisodes />
            </Suspense>
          </CardsSection>

          <CardsSection title='Últimos animes' icon={<LatestIcon />}>
            <Suspense fallback={<CardsSkeleton countCards={3} />}>
              <LatestAnimes />
            </Suspense>
          </CardsSection>
        </div>
        <Suspense fallback={<span>Loading...</span>}>
          <HomeAside />
        </Suspense>
      </main>
    </>
  )
}