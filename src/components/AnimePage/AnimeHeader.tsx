import { BadgeList } from '../BadgeList'
import styles from './Anime.module.css'

interface Props {
  animeId: string
  title: string
  otherTitles: string[]
}

export function AnimeHeader({ animeId, title, otherTitles }: Props) {
  return (
    <header className={styles.header}>
      <h1
        className={styles.headerTitle}
        style={{
          viewTransitionName: `anime-title-${animeId}`
        }}
      >
        {title}
      </h1>
      <BadgeList items={otherTitles.map(title => ({ name: title }))} />
    </header>
  )
}
