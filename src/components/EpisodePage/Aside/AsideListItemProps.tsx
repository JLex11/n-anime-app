import { Episode } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import styles from '../Episode.module.css'
import { EpisodeImage } from '../EpisodeImage'

interface AsideListItemProps {
  animeId: string
  episode: Episode
  currentEpisode: number
  animeImage?: string
  animeTitle?: string
}

export const AsideListItem = ({ animeId, episode, currentEpisode, animeImage, animeTitle }: AsideListItemProps) => {
  const itemClass = clsx(styles.asideItem, currentEpisode === episode.episode && styles.active)

  return (
    <li>
      <Link href={`/animes/${animeId}/${episode.episode}`} className={itemClass}>
        <span>{episode.episode}</span>
        <EpisodeImage
          images={[{ link: episode.image }, { link: animeImage }]}
          episode={episode.episode}
          title={animeTitle ?? ''}
        />
      </Link>
    </li>
  )
}
