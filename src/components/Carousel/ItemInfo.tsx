import Link from 'next/link'
import { Badge } from '../Common/Badge'
import styles from './Carousel.module.css'

interface Props {
  animeId: string
  title: string
  genres: string[]
}

export function ItemInfo({ animeId, title, genres }: Props) {
  return (
    <div className={styles.info}>
      <div className={styles.content}>
        <Link href={`/animes/${animeId}`}>
          <h1 className={styles.infoTitle}>{title}</h1>
        </Link>
        <ul>
          {genres.map(genre => (
            <li key={genre}>
              <Badge>
                <Link href={`/search/?genre=${genre}`}>{genre}</Link>
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
