'use client'

import { RootContext } from '@/app/LayoutContext'
import { useFallbackImage } from '@/hooks/useFallbackImage'
import { Range } from '@/types'
import { userIsMobile } from '@/utils/isMobile'
import Image from 'next/image'
import { useContext, useMemo } from 'react'
import styles from './Carousel.module.css'

interface PictureImage {
  link?: string | null
  width?: number
  height?: number
  position?: string
}

type SmallSizePercent = Range<0, 100>

interface Props {
  title: string
  images: PictureImage[]
  defaultSize: { width: number; height: number }
  preferDefaultSize?: boolean
  smallSize?: { width: number; height: number, quality?: number } | SmallSizePercent
  lazy?: boolean
}

export default function Picture({ title, images, defaultSize, preferDefaultSize, smallSize = 80, lazy }: Props) {
  const { currentImage: carouselImage, onError } = useFallbackImage(images, defaultSize)
  const headers = useContext(RootContext).headers
  const isMobile = headers && userIsMobile(headers)

  const definedWidth = preferDefaultSize ? defaultSize.width : carouselImage.width
  const definedHeight = preferDefaultSize ? defaultSize.height : carouselImage.height

  const { imageWidth, imageHeight, imageQuality } = useMemo(() => {
    const smallSizeWidth = typeof smallSize === 'number' ? definedWidth * (smallSize / 100) : smallSize.width
    const smallSizeHeight = typeof smallSize === 'number' ? definedHeight * (smallSize / 100) : smallSize.height

    return {
      imageWidth: isMobile ? smallSizeWidth : definedWidth,
      imageHeight: isMobile ? smallSizeHeight : definedHeight,
      imageQuality: typeof smallSize === 'number' ? 100 : smallSize.quality || 100,
    }
  }, [isMobile, smallSize, definedWidth, definedHeight])

  return (
    <picture className={styles.carouselPicture}>
      <Image
        src={carouselImage.link}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        style={{ backgroundPosition: carouselImage.position || 'center' }}
        loading={lazy ? 'lazy' : 'eager'}
        priority={!lazy}
        quality={imageQuality}
        onError={onError}
      />
    </picture>
  )
}
