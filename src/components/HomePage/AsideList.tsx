import { Anime } from '@/types'
import Link from 'next/link'
import styles from './Home.module.css'

export const AsideList = ({ animes }: { animes: Anime[] }) => {
  return (
    <ul className={styles.asideList}>
      {animes.map(anime => (
        <li key={anime.animeId}>
          <Link href={`/animes/${anime.animeId}`}>{anime.title}</Link>
        </li>
      ))}
    </ul>
  )
}
