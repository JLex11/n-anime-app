'use client'

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

export const CardImage = ({ src, fbSrc, alt, dimensions, loading, className: cssClass }: Props) => {
  const handleImageError: HandleImageError = e => {
    const target = e.target as HTMLImageElement
    if (target.src === fbSrc) return
    target.src = fbSrc ?? ''
  }

  return (
    <img
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      loading={loading ?? 'lazy'}
      className={cssClass}
      onError={handleImageError}
      decoding='async'
    />
  )
}
