'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'

interface Props {
  images: {
    link?: string
    width?: number
    height?: number
    position?: string
  }[]
  episode: number
  title: string
  className?: string
}

export const EpisodeImage = ({ images, episode, title, className }: Props) => {
  const { currentImage: episodeImage, onError } = useFallbackImage(images, { width: 150, height: 100 })

  return (
    <img
      src={episodeImage.link}
      alt={`Episodio ${episode} de ${title}`}
      width={episodeImage.width}
      height={episodeImage.height}
      onError={onError}
      decoding='async'
      className={className}
    />
  )
}
