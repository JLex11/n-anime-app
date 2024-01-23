'use client'

import { RootContext } from '@/app/LayoutContext'
import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'
import { useContext } from 'react'
import styles from './Carousel.module.css'

interface PictureImage {
  link?: string | null
  width?: number
  height?: number
  position?: string
}

/* type SmallSizePercent = Range<0, 100> */

interface Props {
  title: string
  images: PictureImage[]
  defaultSize: { width: number; height: number }
  preferDefaultSize?: boolean
  /* smallSize?: { width: number; height: number, quality?: number } | SmallSizePercent */
  lazy?: boolean
}

export function Picture({ title, images, defaultSize, preferDefaultSize, /* smallSize = 80, */ lazy }: Props) {
  const { currentImage: carouselImage, onError } = useFallbackImage(images, defaultSize)
  const isMobile = useContext(RootContext).isMobile

  const definedWidth = preferDefaultSize ? defaultSize.width : carouselImage.width
  const definedHeight = preferDefaultSize ? defaultSize.height : carouselImage.height

  /* const smallSizeWidth = typeof smallSize === 'number' ? definedWidth * (smallSize / 100) : smallSize.width
  const smallSizeHeight = typeof smallSize === 'number' ? definedHeight * (smallSize / 100) : smallSize.height */

  /* const imageWidth = isMobile ? smallSizeWidth : definedWidth
  const imageHeight = isMobile ? smallSizeHeight : definedHeight
  const imageQuality = typeof smallSize === 'number' ? 100 : smallSize.quality || 100 */

  return (
    <picture className={styles.carouselPicture}>
      <Image
        src={carouselImage.link}
        alt={title}
        width={definedWidth}
        height={definedHeight}
        style={{ backgroundPosition: carouselImage.position || 'center' }}
        loading={lazy ? 'lazy' : 'eager'}
        priority={!lazy}
        /* quality={imageQuality} */
        onError={onError}
      />
    </picture>
  )
}
