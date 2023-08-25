import { Episode } from '@/types'
import styles from '../Episode.module.css'
import { AsideHeader } from './AsideHeader'
import { AsideListItems } from './AsideListItems'

export interface AsideProps {
  episodes: Episode[]
  animeId: string
  animeImage?: string
  animeTitle?: string
  currentEpisode: number
}

export const Aside = ({ episodes, animeId, animeImage, animeTitle, currentEpisode }: AsideProps) => {
  return (
    <aside className={styles.aside}>
      <AsideHeader animeImage={animeImage} animeTitle={animeTitle} />
      <AsideListItems
        episodes={episodes}
        animeId={animeId}
        animeImage={animeImage}
        animeTitle={animeTitle}
        currentEpisode={currentEpisode}
      />
    </aside>
  )
}
