import { Anime } from '@/types'
import Image from 'next/image'
import { CSSProperties } from 'react'
import styles from './Anime.module.css'

const PORTRAIT_ASPECT_RATIO = 9 / 12

export async function AnimeAside({ anime }: { anime: Anime }) {
  return (
    <aside className={styles.aside}>
      <Image
        src={anime.images?.coverImage ?? ''}
        alt={anime.title}
        width={300}
        height={300 / PORTRAIT_ASPECT_RATIO}
        className={styles.asideImg}
        priority
        loading='eager'
        blurDataURL='/lights-blur.webp'
        placeholder='blur'
        style={
          {
            'view-transition-name': `anime-image-${anime.animeId}`
          } as CSSProperties
        }
      />
      {anime.status && (
        <div className={styles.status}>
          <span className={styles.statusValue}>{anime.status}</span>
        </div>
      )}
    </aside>
  )
}
