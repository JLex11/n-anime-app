import { AsideProps } from '.'
import styles from '../Episode.module.css'
import { AsideListItem } from './AsideListItemProps'

export const AsideListItems = ({ episodes, animeId, currentEpisode, animeImage, animeTitle }: AsideProps) => {
  return (
    <ul className={styles.asideList}>
      {episodes.map(episode => (
        <AsideListItem
          key={episode.episode}
          episode={episode}
          animeId={animeId}
          currentEpisode={currentEpisode}
          animeImage={animeImage}
          animeTitle={animeTitle}
        />
      ))}
    </ul>
  )
}