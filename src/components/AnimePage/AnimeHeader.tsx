import { Badge } from '@/components/Common/Badge'
import styles from '@/styles/Anime.module.css'

interface Props {
  title: string
  otherTitles: string[]
}

export const AnimeHeader = ({ title, otherTitles }: Props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      {otherTitles && (
        <ul className={styles.otherNames}>
          {otherTitles.map(title => (
            <li key={title}>
              <Badge>{title.trim()}</Badge>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
