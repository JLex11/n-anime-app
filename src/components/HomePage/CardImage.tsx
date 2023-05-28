'use client'

import Image from 'next/image'

interface Props {
  src: string
  fbSrc?: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
  className?: string
}

type HandleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => void

export const CardImage = ({
  src,
  fbSrc,
  alt,
  width,
  height,
  loading,
  priority,
  className: cssClass,
}: Props) => {
  const handleImageError: HandleImageError = e => {
    const target = e.target as HTMLImageElement
    if (target.src === fbSrc) return
    target.src = fbSrc ?? ''
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading ?? 'lazy'}
      priority={priority ?? false}
      className={cssClass}
      onError={handleImageError}
      decoding='async'
    />
  )
}
