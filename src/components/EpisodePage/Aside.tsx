import styles from '@/styles/Episode.module.css'
import { Anime, Episode } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface AsideProps {
  episodes: Episode[]
  animeInfo: Anime
}

export const Aside = ({ episodes, animeInfo }: AsideProps) => {
  return (
    <aside className={styles.aside}>
      <header className={styles.asideHeader}>
        <Image src={animeInfo.images?.coverImage ?? ''} alt={animeInfo.title} width={50} height={50} />
        <h2>Episodios</h2>
      </header>
      <ul className={styles.asideList}>
        {episodes.map(episode => (
          <li key={episode.episode}>
            <Link href={`/animes/${animeInfo.animeId}/${episode.episode}`} className={styles.asideItem}>
              <span>{episode.episode}</span>
              {episode.image || animeInfo.images?.coverImage ? (
                <img
                  src={episode.image ?? animeInfo.images?.coverImage ?? ''}
                  alt={`Episodio ${episode.episode} de ${animeInfo.title}`}
                  width={150}
                  height={100}
                />
              ) : (
                <div className={styles.noImage}></div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
