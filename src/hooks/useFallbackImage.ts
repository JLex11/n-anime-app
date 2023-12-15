import { useState } from "react"

interface Image {
	link?: string | null
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
	const indexedImages = images.filter((image): image is OutputImage => Boolean(image.link))

	const handleImageError: HandleImageError = () => setCurrentImageIndex(prevCurrentImage => prevCurrentImage + 1)

	const currentImage = {
		link: indexedImages[currentImageIndex].link,
		width: indexedImages[currentImageIndex].width || defaultDimensions.width,
		height: indexedImages[currentImageIndex].height || defaultDimensions.height,
		position: indexedImages[currentImageIndex].position ?? "center",
	}

	return { currentImage: currentImage, onError: handleImageError }
}
