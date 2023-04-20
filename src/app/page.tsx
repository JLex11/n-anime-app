import { Banner } from '@/components/Banner/Banner'
import { EpisodeCard } from '@/components/EpisodeCard'
import LatestIcon from '@/components/Icons/LatestIcon'
import { getRatingAnimes } from '@/services/getAnimes'
import { getLatestEpisodes } from '@/services/getEpisodes'
import styles from './Home.module.css'

export default async function HomePage() {
  const animes = await getRatingAnimes()
  const episodes = await getLatestEpisodes()

  return (
    <>
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
