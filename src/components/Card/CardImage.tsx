'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'
import { CardImageProps } from './types'

export function CardImage({
  src,
  fbSrc,
  alt,
  size,
  lazy,
  className: cssClass,
  useNext
}: CardImageProps) {
  const { currentImage, onError } = useFallbackImage(
    [
      { link: src, ...size },
      { link: fbSrc, ...size }
    ],
    { width: 300, height: 350 }
  )

  const ImageComponent = useNext ? Image : 'img'

  return (
    <ImageComponent
      src={currentImage.link}
      alt={alt}
      width={currentImage.width}
      height={currentImage.height}
      loading={lazy ? 'lazy' : undefined}
      className={cssClass}
      onError={onError}
      decoding='async'
    />
  )
}
