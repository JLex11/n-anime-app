import styles from '@/components/EpisodePage/Episode.module.css'
import { Anime } from '@/types'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import Image from 'next/image'

export function BackgroundImage({ animeInfo }: { animeInfo?: Anime | null }) {
  const bgImage = animeInfo?.images?.carouselImages[0]?.link || animeInfo?.images?.coverImage
  if (!bgImage) return null

  return (
    <Image
      src={bgImage}
      alt={normalizeAnimeId(animeInfo.animeId)}
      width={500}
      height={600}
      decoding="async"
      className={styles.bgImage}
    />
  )
}