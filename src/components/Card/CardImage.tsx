'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'
import { ImageProps } from './types'

export function CardImage({ src, fbSrc, width, height, ...imageProps }: ImageProps) {
  const { currentImage, onError } = useFallbackImage([{ link: src }, { link: fbSrc }], { width, height })

  return (
    <Image
      {...imageProps}
      src={currentImage.link}
      width={currentImage.width}
      height={currentImage.height}
      onError={onError}
    />
  )
}
