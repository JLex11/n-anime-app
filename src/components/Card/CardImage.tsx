'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'

interface Props {
  src: string | null | undefined
  fbSrc?: string
  alt: string
  dimensions: {
    width: number
    height: number
  }
  lazy?: boolean
  priority?: boolean
  className?: string
}

export function CardImage({
  src,
  fbSrc,
  alt,
  dimensions,
  lazy,
  className: cssClass
}: Props) {
  const { currentImage, onError } = useFallbackImage(
    [
      { link: src, ...dimensions },
      { link: fbSrc, ...dimensions }
    ],
    { width: 300, height: 350 }
  )

  return (
    <Image
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
