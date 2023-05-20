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
  return (
    <>
      <Picture animeId={anime.animeId} title={anime.title} images={anime.images?.carouselImages ?? []} index={index} />
      {showInfo && isActive && <ItemInfo animeId={anime.animeId} title={anime.title ?? ''} genres={anime.genres} />}
    </>
  )
}
