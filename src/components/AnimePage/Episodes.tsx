import { Episode } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import { EpisodeImage } from '../EpisodePage/EpisodeImage'
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
            <EpisodeImage
              image={{
                link: episode.image ?? fallbackImg ?? '/lights-blur.webp',
                width: 150,
                height: 100
              }}
              episode={episode.episode}
              title={animeTitle}
              className={styles.episodeImage}
            />
            <span className={styles.episodeNumber}>Episodio {episode.episode}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
