import { BadgeList } from '../BadgeList'
import styles from './Anime.module.css'

interface Props {
  title: string
  otherTitles: string[]
}

export function AnimeHeader({ title, otherTitles }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <BadgeList items={otherTitles.map(title => ({ name: title }))} />
    </header>
  )
}
