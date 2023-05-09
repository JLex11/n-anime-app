import { CarouselHero } from '@/components/CarouselHero/Carousel'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import styles from '@/styles/Home.module.css'

export default async function HomePage() {
  const ratingAnimes = await getRatingAnimes(10)

  return (
    <>
      <CarouselHero animes={ratingAnimes} showInfo />
      <main className={styles.main}>
        {/* @ts-expect-error Server Component */}
        <HomeAside />
        <div className={styles.content}>
          {/* @ts-expect-error Server Component */}
          <LatestEpisodes />
          {/* @ts-expect-error Server Component */}
          <LatestAnimes />
        </div>
      </main>
    </>
  )
}
