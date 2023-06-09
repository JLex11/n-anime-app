import { CarouselHero } from '@/components/CarouselHero/Carousel'
import styles from '@/components/HomePage/Home.module.css'
import { HomeAside } from '@/components/HomePage/HomeAside'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { LatestEpisodes } from '@/components/HomePage/LatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'

export default async function HomePage() {
  const ratingAnimes = await getRatingAnimes(10)

  return (
    <>
      <CarouselHero animes={ratingAnimes} showInfo />
      <main className={styles.main}>
        <HomeAside />
        <div className={styles.content}>
          <LatestEpisodes />
          <LatestAnimes />
        </div>
      </main>
    </>
  )
}
