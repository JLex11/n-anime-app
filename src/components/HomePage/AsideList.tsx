import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import Link from 'next/link'
import styles from './Home.module.css'

export const AsideList = async () => {
  const broadcastAnimes = await getBroadcastAnimes(30)

  return (
    <ul className={styles.asideList}>
      {broadcastAnimes.map(anime => (
        <li key={anime.animeId}>
          <Link href={`/animes/${anime.animeId}`}>{anime.title}</Link>
        </li>
      ))}
    </ul>
  )
}
