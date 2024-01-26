import Link from 'next/link'
import { BadgeList } from '../BadgeList'
import styles from './Carousel.module.css'

interface Props {
  animeId: string
  title: string
  genres: string[]
}

export function ItemInfo({ animeId, title, genres }: Props) {
  const uniqueGenres = [...new Set(genres)]
  const mappedGenres = uniqueGenres.map(genre => ({
    name: genre,
    url: `/animes/?genre=${genre}`
  }))

  return (
    <div className={styles.info}>
      <div className={styles.content}>
        <Link href={`/animes/${animeId}`}>
          <h1 className={styles.infoTitle}>{title}</h1>
        </Link>
        <BadgeList items={mappedGenres} width='50%' />
      </div>
    </div>
  )
}
