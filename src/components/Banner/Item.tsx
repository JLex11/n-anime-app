import { Anime } from '@/types'
import { forwardRef } from 'react'
import styles from '../../styles/Banner.module.css'
import { ItemInfo } from './ItemInfo'
import { Picture } from './Picture'

interface Props {
  anime: Anime
  showInfo?: boolean
  index: number
  ref: (e: React.RefObject<HTMLDivElement>) => void
  isActive: boolean
}

const Item = forwardRef<HTMLDivElement, Props>(({ anime, showInfo, index, isActive }, ref) => {
  return (
    <div
      className={`${styles.bannerItem} ${isActive ? styles.active : ''}`}
      id={anime.animeId}
      ref={ref}
    >
      <Picture
        animeId={anime.animeId}
        title={anime.title}
        images={anime.images?.bannerImages ?? []}
        index={index}
      />
      {showInfo && (
        <ItemInfo
          animeId={anime.animeId}
          title={anime.title ?? ''}
          genres={anime.genres}
          isActive={isActive}
        />
      )}
    </div>
  )
})

Item.displayName = 'Item'
export default Item
