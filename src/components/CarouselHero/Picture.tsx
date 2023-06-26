import { CarouselImage } from '@/types'
import { placeholderImgs } from '@/utils/placeHolderImgs'
import Image from 'next/image'
import { useRef } from 'react'
import styles from './Carousel.module.css'

interface Props {
  animeId: string
  title: string
  images: CarouselImage[]
  index: number
}

type HandleImageError = (e: React.SyntheticEvent<HTMLImageElement>, carouselImages: CarouselImage[] | undefined) => void

export const Picture: React.FC<Props> = ({ animeId, title, images, index }) => {
  const currentImageRef = useRef(1)
  const carouselImage = images?.at(0)
  const placeholderImg = placeholderImgs.at(0)

  const handleImageError: HandleImageError = (e, images) => {
    const target = e.target as HTMLImageElement
    if (images?.length === 0) return

    const fallbackImage = images?.at(currentImageRef.current++)
    if (target.src === fallbackImage?.link) return

    target.src = fallbackImage?.link ?? '/lights-blur.webp'
    target.width = (fallbackImage?.width ?? 0) * 0.75
    target.height = (fallbackImage?.height ?? 0) * 0.75
  }

  return (
    <picture className={styles.carouselPicture}>
      <Image
        src={carouselImage?.link ?? '/lights-blur.webp'}
        alt={title}
        width={(carouselImage?.width ?? 1080) * 0.75}
        height={(carouselImage?.height ?? 650) * 0.75}
        style={{ backgroundPosition: carouselImage?.position }}
        loading={index === 0 ? 'eager' : 'lazy'}
        priority={!index}
        quality={60}
        onError={e => handleImageError(e, images)}
        id={animeId}
        blurDataURL={placeholderImg}
        placeholder='blur'
      />
    </picture>
  )
}
