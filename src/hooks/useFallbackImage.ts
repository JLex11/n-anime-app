import { useState } from 'react'

interface Image {
  link?: string
  width?: number
  height?: number
  position?: string
}

type HandleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => void

export const useFallbackImage = (images: Image[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageError: HandleImageError = () => {
    setCurrentImageIndex(prevCurrentImage => prevCurrentImage + 1)
  }

  const currentImage = {
    link: images[currentImageIndex]?.link ?? '/lights-blur.webp',
    width: (images[currentImageIndex]?.width || 0) * 0.75,
    height: (images[currentImageIndex]?.height || 0) * 0.75,
    position: images[currentImageIndex]?.position ?? 'center',
  }

  return { currentImage: currentImage, onError: handleImageError }
}
