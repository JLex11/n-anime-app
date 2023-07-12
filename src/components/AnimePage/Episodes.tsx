import { Episode } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './Anime.module.css'

interface EpisodesProps {
  episodes: Episode[]
  animeTitle: string
  fallbackImg?: string
}

export const Episodes = ({ episodes, animeTitle, fallbackImg }: EpisodesProps) => {
  const episodesClass = clsx(styles.sectionGrid, styles.episodesList)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Episodios</h2>
      <div className={episodesClass}>
        {episodes.map(episode => (
          <Link key={episode.episodeId} href={`/animes/${episode.animeId}/${episode.episode}`}>
            <img
              src={episode.image || fallbackImg || '/lights-blur.webp'}
              alt={`Episode ${episode.episode} of ${animeTitle}`}
              width={150}
              height={100}
              loading='lazy'
              decoding='async'
              style={{ backgroundImage: `image-set(url(${episode.image}) 1x, url(${fallbackImg}) 2x)` }}
            />
            <span className={styles.episodeNumber}>Episodio {episode.episode}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
