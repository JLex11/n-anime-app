import styles from '@/styles/Anime.module.css'
import { Episode } from '@/types'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface EpisodesProps {
  episodes: Episode[]
  animeTitle: string
}

export const Episodes = ({ episodes, animeTitle }: EpisodesProps) => {
  const episodesClass = clsx(styles.sectionGrid, styles.episodesList)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Episodes</h2>
      <div className={episodesClass}>
        {episodes.map(episode => (
          <Link key={episode.episodeId} href={`/animes/${episode.animeId}/${episode.episode}`}>
            <Image src={episode.image ?? ''} alt={`Episode ${episode.episode} of ${animeTitle}`} width={150} height={100} loading='lazy' />
            <span className={styles.episodeNumber}>Episode {episode.episode}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
