import { Banner } from '@/components/Banner/Banner'
import { EpisodeCard } from '@/components/EpisodeCard'
import Header from '@/components/Header'
import LatestIcon from '@/components/Icons/LatestIcon'
import { API, APP_ROUTES } from '@/constants'
import { Anime, LastEpisode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import styles from './Home.module.css'

const sortByRank = (a: Anime, b: Anime) => Number(b?.rank ?? 0) - Number(a?.rank ?? 0)

const getRatingAnimes = async () => {
  const response = await fetch(API.routes.RatingAnimes, {
    next: { revalidate: minToSeconds(10) },
  })

  const animes: Anime[] = await response.json()
  return animes.sort(sortByRank) ?? []
}

const getLatestEpisodes = async () => {
  const response = await fetch(API.routes.LatestEpisodes, {
    next: { revalidate: minToSeconds(10) },
  })

  const episodes: LastEpisode[] = await response.json()
  return episodes ?? []
}

export default async function HomePage() {
  const animes = await getRatingAnimes()
  const episodes = await getLatestEpisodes()

  return (
    <>
      <Header pages={APP_ROUTES} />
      <Banner animes={animes} showInfo />
      <main className={styles.main}>
        <section className={styles.latestEpisodes}>
          <h2 className={styles.title}>
            <LatestIcon />
            Latest Episodes
          </h2>
          <div className={styles.gridContainer}>
            {episodes.map(episode => (
              <EpisodeCard key={episode.episodeId} episode={episode} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
