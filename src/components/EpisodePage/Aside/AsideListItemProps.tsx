import PlayIcon from '@/components/Icons/PlayIcon'
import { Episode } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import styles from '../Episode.module.css'
import { EpisodeImage } from '../EpisodeImage'

interface AsideListItemProps {
  animeId: string
  episode: Episode
  currentEpisode: number
  animeImage?: string | null
  animeTitle?: string
}

export const AsideListItem = ({ animeId, episode, currentEpisode, animeImage, animeTitle }: AsideListItemProps) => {
  const isSeeing = currentEpisode == episode.episode
  const itemClass = clsx(styles.asideItem, isSeeing && styles.active)
  const episodeImage = {
    link: episode.image ?? animeImage ?? '/lights-blur.webp',
    width: 150,
    height: 100
  }

  return (
    <li>
      <Link href={`/animes/${animeId}/${episode.episode}`} className={itemClass}>
        <span>{isSeeing ? <PlayIcon /> : episode.episode}</span>
        <EpisodeImage
          image={episodeImage}
          episode={episode.episode}
          title={animeTitle ?? animeId.replaceAll('-', ' ')}
        />
      </Link>
    </li>
  )
}
