import { Episode } from '@/types'
import Link from 'next/link'
import styles from './EpisodeList.module.css'
import { ListItem } from './ListItem'

interface Props {
  limit: string | number
  episodes: Episode[]
  animeId: string
  animeImage?: string | null
  animeTitle?: string
  currentEpisode?: number
  linkPrefix?: string
}

export function EpisodeList({ limit, episodes, currentEpisode, animeImage, animeTitle, linkPrefix }: Props) {
  const createItemLink = (episode: Episode) => {
    return `${linkPrefix || ''}${episode.episode}${limit ? `?limit=${limit}` : ''}`
  }

  const firstEpisodeInList = episodes.some(({ episode }) => episode === 1)

  return (
    <ul className={styles.episodeList}>
      {episodes.map(episode => (
        <ListItem
          key={episode.episode}
          link={createItemLink(episode)}
          episode={episode}
          isSeeing={currentEpisode == episode.episode}
          animeImage={animeImage}
          animeTitle={animeTitle}
        />
      ))}
      {!firstEpisodeInList && (
        <li>
          <Link href={`?limit=${episodes.length + 5}`} className={styles.listItem} scroll={false}>
            Cargar mas
          </Link>
        </li>
      )}
    </ul>
  )
}
