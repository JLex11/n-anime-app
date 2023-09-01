import PlayIcon from '@/components/Icons/PlayIcon'
import { Episode } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import styles from '../Episode.module.css'
import { EpisodeImage } from '../EpisodeImage'

interface AsideListItemProps {
  link: string
  animeId: string
  episode: Episode
  currentEpisode: number
  animeImage?: string | null
  animeTitle?: string
}

export function AsideListItem({ link, animeId, episode, currentEpisode, animeImage, animeTitle }: AsideListItemProps) {
  const isSeeing = currentEpisode == episode.episode
  const itemClass = clsx(styles.asideItem, isSeeing && styles.active)
  const episodeImage = {
    link: episode.image ?? animeImage ?? '/lights-blur.webp',
    width: 150,
    height: 100
  }

  return (
    <li>
      <Link href={link} className={itemClass} scroll={false}>
        <span>{isSeeing ? <PlayIcon width={50} /> : episode.episode}</span>
        <EpisodeImage
          image={episodeImage}
          episode={episode.episode}
          title={animeTitle ?? animeId.replaceAll('-', ' ')}
          className={styles.episodeImage}
        />
      </Link>
    </li>
  )
}
