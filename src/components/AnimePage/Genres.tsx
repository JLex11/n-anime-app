import Link from 'next/link'
import { Badge } from '../Common/Badge'
import styles from './Anime.module.css'

export const Genres = ({ genres }: { genres: string[] }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Generos</h2>
      <ul className={styles.sectionList}>
        {genres.map(genre => (
          <li key={genre}>
            <Badge>
              <Link href={`/search/?genre=${genre}`}>{genre}</Link>
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}
