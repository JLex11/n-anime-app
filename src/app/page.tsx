import { CardsSection } from '@/components/CardsSection'
import { CarouselHero } from '@/components/CarouselHero/Carousel'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { HomeCardSkeleton } from '@/components/HomePage/HomeCardSkeleton'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import LatestIcon from '@/components/Icons/LatestIcon'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Suspense } from 'react'

export default async function HomePage() {
  const ratingAnimes = await getRatingAnimes(5)

  return (
    <>
      <CarouselHero animes={ratingAnimes} showInfo />
      <main className={styles.main}>
        <HomeAside />
        <div className={styles.content}>
          <CardsSection title='Últimos episodios' icon={<LatestIcon />} gridWidth={230} gridHeight={190}>
            <Suspense fallback={<CardsSkeleton countCards={5} hasPill={true} />}>
              <LatestEpisodes />
            </Suspense>
          </CardsSection>

          <CardsSection title='Últimos animes' icon={<LatestIcon />}>
            <Suspense fallback={<CardsSkeleton countCards={5} />}>
              <LatestAnimes />
            </Suspense>
          </CardsSection>
        </div>
      </main>
    </>
  )
}

const CardsSkeleton = ({ countCards, hasPill }: { countCards: number; hasPill?: boolean }) => (
  <>
    {new Array(countCards).fill(0).map((_, i) => (
      <HomeCardSkeleton key={i} hasPill={hasPill} />
    ))}
  </>
)
