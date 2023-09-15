import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'

export const AsideList = async () => {
  const broadcastAnimes = await getBroadcastAnimes(15)

  return (
    <ul className={styles.asideList}>
      {broadcastAnimes.map((anime, i) => (
        <>
          <li key={anime.animeId}>
            <Link href={`/animes/${anime.animeId}`} className={styles.asideListItem}>
              <Image
                src={anime.images.coverImage || '/lights-blur.webp'}
                alt={`cover image of the anime ${anime.title}`}
                width={40}
                height={40}
              />
              <div className={styles.asideListItemContent}>
                <h3>{anime.title}</h3>
                <span>{'⭐'.repeat(Number(anime.rank))}</span>
              </div>
            </Link>
          </li>
        </>
      ))}
    </ul>
  )
}
