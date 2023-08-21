'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'

interface Props {
  images: {
    link: string
    width?: number
    height?: number
    position?: string
  }[]
  episode: number
  title: string
}

export const EpisodeImage = ({ images, episode, title }: Props) => {
  const { currentImage: episodeImage, onError } = useFallbackImage(images)

  return (
    <img
      src={episodeImage.link}
      alt={`Episodio ${episode} de ${title}`}
      width={episodeImage.width || 150}
      height={episodeImage.height || 100}
      onError={onError}
      decoding='async'
    />
  )
}