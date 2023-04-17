import CustomLi from '@/components/CustomLi'
import styles from './Anime.module.css'

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
            <CustomLi key={title}>{title.trim()}</CustomLi>
          ))}
        </ul>
      )}
    </header>
  )
}
