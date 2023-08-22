import { CarouselHero } from '@/components/CarouselHero/Carousel'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Suspense } from 'react'

export default async function HomePage() {
  const ratingAnimes = await getRatingAnimes(7)

  return (
    <>
      <CarouselHero animes={ratingAnimes} showInfo />
      <main className={styles.main}>
        <HomeAside />
        <div className={styles.content}>
          <Suspense fallback={<span>Loading...</span>}>
            <LatestEpisodes />
            <LatestAnimes />
          </Suspense>
        </div>
      </main>
    </>
  )
}
