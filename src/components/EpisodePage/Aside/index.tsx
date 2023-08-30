import { Episode } from '@/types'
import styles from '../Episode.module.css'
import { AsideHeader } from './AsideHeader'
import { AsideList } from './AsideList'

export interface AsideProps {
  episodes: Episode[]
  animeId: string
  animeImage?: string | null
  animeTitle?: string
  currentEpisode: number
}

export function Aside({ episodes, animeId, animeImage, animeTitle, currentEpisode }: AsideProps) {
  return (
    <aside className={styles.aside}>
      <AsideHeader animeImage={animeImage} animeTitle={animeTitle} />
      <AsideList
        episodes={episodes}
        animeId={animeId}
        animeImage={animeImage}
        animeTitle={animeTitle}
        currentEpisode={currentEpisode}
      />
    </aside>
  )
}
