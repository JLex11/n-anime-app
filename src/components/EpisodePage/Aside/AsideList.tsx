import { Episode } from '@/types'
import Link from 'next/link'
import styles from '../Episode.module.css'
import { AsideListItem } from './AsideListItem'

interface Props {
  limit: string
  episodes: Episode[]
  animeId: string
  animeImage?: string | null
  animeTitle?: string
  currentEpisode: number
}

export function AsideList({ limit, episodes, currentEpisode, animeId, animeImage, animeTitle }: Props) {
  const createItemLink = (episode: string | number) => {
    return `${episode}${limit ? `?limit=${limit}` : ''}`
  }

  const firstEpisodeInList = episodes.some(({ episode }) => episode === 1)

  return (
    <ul className={styles.asideList}>
      {episodes.map(episode => (
        <AsideListItem
          key={episode.episode}
          link={createItemLink(episode.episode)}
          episode={episode}
          animeId={animeId}
          currentEpisode={currentEpisode}
          animeImage={animeImage}
          animeTitle={animeTitle}
        />
      ))}
      {!firstEpisodeInList && (
        <li>
          <Link href={`?limit=${episodes.length + 5}`} className={styles.asideItem} scroll={false}>
            Cargar mas
          </Link>
        </li>
      )}
    </ul>
  )
}
