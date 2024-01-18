import { Anime } from '@/types'
import styles from './Carousel.module.css'
import { ItemInfo } from './ItemInfo'
import { Picture } from './Picture'

interface Props {
  anime: Anime
  showInfo?: boolean
  index: number
}

export function Item({ anime, showInfo, index }: Props) {
  const pictureImages =
    anime.images?.carouselImages.filter(carouselImage => carouselImage.link) ??
    []
  const fbImage = { link: anime.images?.coverImage }

  return (
    <li id={anime.animeId} className={styles.carouselItem}>
      <Picture
        title={anime.title}
        images={[...pictureImages, fbImage]}
        lazy={index > 0}
      />
      {showInfo && (
        <ItemInfo
          animeId={anime.animeId}
          title={anime.title ?? ''}
          genres={anime.genres}
        />
      )}
    </li>
  )
}
