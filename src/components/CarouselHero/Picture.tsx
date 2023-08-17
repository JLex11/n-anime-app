'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'
import { placeholderImgs } from '@/utils/placeHolderImgs'
import Image from 'next/image'
import styles from './Carousel.module.css'

interface PictureImage {
  link: string
  width?: number
  height?: number
  position?: string
}

interface Props {
  title: string
  images: PictureImage[]
  lazy: boolean
}

export const Picture = ({ title, images, lazy }: Props) => {
  const { currentImage: carouselImage, onError } = useFallbackImage(images)

  return (
    <picture className={styles.carouselPicture}>
      <Image
        src={carouselImage.link}
        alt={title}
        width={carouselImage?.width || 1080}
        height={carouselImage?.height || 650}
        style={{ backgroundPosition: carouselImage.position }}
        loading={lazy ? 'lazy' : 'eager'}
        decoding={lazy ? 'sync' : 'async'}
        priority={!lazy}
        quality={60}
        onError={onError}
        blurDataURL={placeholderImgs[0]}
        placeholder='blur'
      />
    </picture>
  )
}
