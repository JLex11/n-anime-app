import { useState } from 'react'

interface Image {
  link?: string
  width?: number
  height?: number
  position?: string
}

interface OutputImage extends Image {
  link: string
}

type DefaultDimensions = {
  width: number
  height: number
}

type HandleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => void

export const useFallbackImage = (images: Image[], defaultDimensions: DefaultDimensions) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const indexedImages = [
    ...(images.filter(({ link }) => Boolean(link)) as OutputImage[]),
    { link: '/lights-blur.webp' }
  ]

  const handleImageError: HandleImageError = () => {
    setCurrentImageIndex(prevCurrentImage => prevCurrentImage + 1)
  }

  const currentImage = {
    link: indexedImages[currentImageIndex].link,
    width: (indexedImages[currentImageIndex]?.width || defaultDimensions.width) * 0.75,
    height: (indexedImages[currentImageIndex]?.height || defaultDimensions.height) * 0.75,
    position: indexedImages[currentImageIndex]?.position ?? 'center'
  }

  return { currentImage: currentImage, onError: handleImageError }
}
