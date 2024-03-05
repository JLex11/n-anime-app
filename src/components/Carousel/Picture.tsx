'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'
import styles from './Carousel.module.css'

interface PictureImage {
  link?: string | null
  width?: number
  height?: number
  position?: string
}

interface Props extends Omit<React.ComponentProps<typeof Image>, 'src' | 'width' | 'height'> {
  images: PictureImage[]
  defaultSize: { width: number; height: number }
  preferDefaultSize?: boolean
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export default function Picture({ images, defaultSize, preferDefaultSize, ...imageProps }: Props) {
  const { currentImage: carouselImage, onError } = useFallbackImage(images, defaultSize)

  const imageWidth = preferDefaultSize ? defaultSize.width : carouselImage.width
  const imageHeight = preferDefaultSize ? defaultSize.height : carouselImage.height

  return (
    <picture className={styles.carouselPicture}>
      <Image
        {...imageProps}
        src={carouselImage.link}
        width={imageWidth}
        height={imageHeight}
        style={{ backgroundPosition: carouselImage.position || 'center' }}
        onError={onError}
      />
    </picture>
  )
}
