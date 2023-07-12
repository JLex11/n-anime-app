'use client'

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
  const dfImage = images.at(0)
  const carouselImage = {
    ...dfImage,
    link: dfImage?.link ?? '/lights-blur.webp',
    width: dfImage?.width ?? 1080,
    height: dfImage?.height ?? 650,
    position: dfImage?.position ?? 'center',
  }
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
      {!carouselImage.link.includes('.webp') ? (
        <Image
          src={carouselImage.link}
          alt={title}
          width={carouselImage.width * 0.75}
          height={carouselImage.height * 0.75}
          style={{ backgroundPosition: carouselImage.position }}
          loading={index === 0 ? 'eager' : 'lazy'}
          priority={!index}
          quality={60}
          onError={e => handleImageError(e, images)}
          id={animeId}
          blurDataURL={placeholderImg}
          placeholder='blur'
        />
      ) : (
        <img
          src={carouselImage.link}
          alt={title}
          width={carouselImage.width * 0.75}
          height={carouselImage.height * 0.75}
          style={{ backgroundPosition: carouselImage.position }}
          loading={index === 0 ? 'eager' : 'lazy'}
          onError={e => handleImageError(e, images)}
          id={animeId}
        />
      )}
    </picture>
  )
}
