import { getAnime } from '@/services/getAnime'
import { placeholderImgs } from '@/utils/placeHolderImgs'
import Image from 'next/image'
import styles from './Anime.module.css'

export async function AnimeAside({ animeId }: { animeId: string}) {
  const anime = await getAnime(animeId)
  if (!anime) return null

  const aspectRatio = 9 / 12
  const placeholderImg = placeholderImgs[0]

  return (
    <section className={styles.aside}>
      <Image
        src={anime.images?.coverImage ?? ''}
        alt={anime.title}
        width={300}
        height={300 / aspectRatio}
        className={styles.asideImg}
        priority
        loading='eager'
        blurDataURL={placeholderImg}
        placeholder='blur'
      />
      {anime.status && (
        <div className={styles.status}>
          <span className={styles.statusValue}>{anime.status}</span>
        </div>
      )}
    </section>
  )
}
