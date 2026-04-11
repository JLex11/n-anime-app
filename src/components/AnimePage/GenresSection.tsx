import { BadgeList } from '../BadgeList'
import styles from './Anime.module.css'

export function Genres({ genres }: { genres?: string[] | null }) {
  const safeGenres = Array.isArray(genres) ? genres : []
  if (safeGenres.length === 0) return null

  const uniqueGenres = [...new Set(safeGenres)]
  const mappedGenres = uniqueGenres.map(genre => ({
    name: genre,
    url: `/animes/?genre=${genre}`
  }))

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Generos</h2>
      <BadgeList items={mappedGenres} />
    </section>
  )
}
