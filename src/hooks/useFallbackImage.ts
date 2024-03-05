import { useMemo, useState } from 'react'

interface Image {
  link?: string | null
  width?: number
  height?: number
  position?: string
}

type ValidImage = Image & { link: string }

type DefaultDimensions = {
  width: number
  height: number
}

export const useFallbackImage = (images: Image[], defaultDimensions: DefaultDimensions) => {
  const [errorCount, setErrorCount] = useState(0)
  const filteredImages = useMemo(
    () => images.filter((image): image is ValidImage => Boolean(image.link)),
    [images]
  )

  const handleImageError = () => setErrorCount(prevCount => prevCount + 1)

  const getCurrentImage = () => {
    if (errorCount >= filteredImages.length) {
      return {
        link: '/lights-blur.webp',
        width: defaultDimensions.width,
        height: defaultDimensions.height,
        position: 'center'
      }
    }

    return {
      link: filteredImages[errorCount % filteredImages.length].link,
      width: filteredImages[errorCount % filteredImages.length].width || defaultDimensions.width,
      height: filteredImages[errorCount % filteredImages.length].height || defaultDimensions.height,
      position: filteredImages[errorCount % filteredImages.length].position ?? 'center'
    }
  }

  const currentImage = getCurrentImage()

  return { currentImage: currentImage, onError: handleImageError }
}
