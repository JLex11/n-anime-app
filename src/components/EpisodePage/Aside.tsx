import { Anime, Episode } from '@/types'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Episode.module.css'
import { EpisodeImage } from './EpisodeImage'

interface AsideProps {
  episodes: Episode[]
  animeInfo: Anime
  currentEpisode: number
}

export const Aside = ({ episodes, animeInfo, currentEpisode }: AsideProps) => {
  const { animeId, images, title } = animeInfo

  return (
    <aside className={styles.aside}>
      <header className={styles.asideHeader}>
        {images?.coverImage && <Image src={images?.coverImage} alt={title} width={50} height={50} />}
        <h2>Episodios</h2>
      </header>
      <ul className={styles.asideList}>
        {episodes.map(episode => (
          <li key={episode.episode}>
            <Link
              href={`/animes/${animeId}/${episode.episode}`}
              className={clsx(styles.asideItem, currentEpisode == episode.episode && styles.active)}
            >
              <span>{episode.episode}</span>
              <EpisodeImage
                images={[{ link: episode.image || images.coverImage }]}
                episode={episode.episode}
                title={title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
