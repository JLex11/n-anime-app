import { Badge } from '@/components/Common/Badge'
import Link from 'next/link'
import styles from './Anime.module.css'

export function Genres({ genres }: { genres: string[] }) {
  if (genres.length === 0) return null

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
