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
  const indexedImages = [...images, { link: '/lights-blur.webp' }]

  const handleImageError: HandleImageError = () => {
    setCurrentImageIndex(prevCurrentImage => prevCurrentImage + 1)
  }

  const currentImage = {
    link: indexedImages[currentImageIndex]?.link,
    width: (indexedImages[currentImageIndex]?.width || 0) * 0.75,
    height: (indexedImages[currentImageIndex]?.height || 0) * 0.75,
    position: indexedImages[currentImageIndex]?.position ?? 'center',
  }

  return { currentImage: currentImage, onError: handleImageError }
}
