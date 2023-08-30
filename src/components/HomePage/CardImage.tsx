'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'

interface Props {
  src: string
  fbSrc?: string
  alt: string
  dimensions: {
    width: number
    height: number
  }
  loading?: 'lazy' | 'eager'
  priority?: boolean
  className?: string
}

type HandleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => void

export function CardImage({ src, fbSrc, alt, dimensions, loading, className: cssClass }: Props) {
  const { currentImage, onError } = useFallbackImage(
    [
      { link: src, ...dimensions },
      { link: fbSrc, ...dimensions }
    ],
    { width: 300, height: 350 }
  )

  return (
    <img
      src={currentImage.link}
      alt={alt}
      width={currentImage.width}
      height={currentImage.height}
      loading={loading ?? 'lazy'}
      className={cssClass}
      onError={onError}
      decoding='async'
    />
  )
}
