import styles from '@/styles/Anime.module.css'
import Link from 'next/link'
import { Badge } from '../Common/Badge'

export const Genres = ({ genres }: { genres: string[] }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Genres</h2>
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
