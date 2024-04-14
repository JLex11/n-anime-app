import { Anime } from '@/types'
import { CSSProperties } from 'react'
import styles from './Carousel.module.css'
import { ItemInfo } from './ItemInfo'
import Picture from './Picture'

interface Props {
  anime: Anime
  showInfo?: boolean
  index: number
}

export function Item({ anime, showInfo, index }: Props) {
  const pictureImages = anime.images?.carouselImages.filter(carouselImage => carouselImage.link) ?? []
  const fbImage = { link: anime.images?.coverImage }

  return (
    <li id={anime.animeId} className={styles.carouselItem} {...{ active: 'false' }}>
      <Picture
        alt={anime.title}
        images={[...pictureImages, fbImage]}
        defaultSize={{ width: 998, height: 499 }}
        preferDefaultSize
        priority={index === 0}
        quality={60}
        decoding={index === 0 ? 'async' : 'sync'}
        style={
          {
            'view-transition-name': `carousel-picture-${anime.animeId}`
          } as CSSProperties
        }
      />
      {showInfo && <ItemInfo animeId={anime.animeId} title={anime.title ?? ''} genres={anime.genres} />}
    </li>
  )
}
