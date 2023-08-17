import { Anime } from '@/types'
import { ItemInfo } from './ItemInfo'
import { Picture } from './Picture'

interface Props {
  anime: Anime
  showInfo?: boolean
  index: number
  isActive: boolean
}

export const Item = ({ anime, showInfo, index, isActive }: Props) => {
  const pictureImages = anime.images?.carouselImages.filter(carouselImage => carouselImage.link)
  const fbImage = { link: anime.images.coverImage }

  return (
    <>
      <Picture title={anime.title} images={[...pictureImages, fbImage]} lazy={index > 0} />
      {showInfo && isActive && <ItemInfo animeId={anime.animeId} title={anime.title ?? ''} genres={anime.genres} />}
    </>
  )
}
