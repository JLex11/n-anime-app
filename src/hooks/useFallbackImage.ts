import blurImage from '@/public/lights-blur.webp'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface Image {
	link?: string | null
	width?: number
	height?: number
	position?: string
	isBlur?: boolean
}

type ValidImage = Image & { link: string }

type DefaultDimensions = {
	width: number
	height: number
}

const globalImageCache = new Map<string, boolean>()

export const useFallbackImage = (images: Image[], defaultDimensions: DefaultDimensions, preloadImages = false) => {
	const [errorCount, setErrorCount] = useState(0)
	const previousImagesRef = useRef<Image[]>([])
	const [failedImageUrls, setFailedImageUrls] = useState<Set<string>>(new Set())

	const filteredImages = useMemo(() => {
		const valid = images.filter((image): image is ValidImage => {
			if (!image.link) return false
			if (globalImageCache.has(image.link) && globalImageCache.get(image.link) === false) return false
			if (failedImageUrls.has(image.link)) return false

			return true
		})

		if (JSON.stringify(previousImagesRef.current) !== JSON.stringify(images)) {
			previousImagesRef.current = [...images]
			if (errorCount > 0) setErrorCount(0)
		}

		return valid
	}, [images, failedImageUrls, errorCount])

	const handleImageError = useCallback(() => {
		const currentImage = filteredImages[errorCount % filteredImages.length]

		if (currentImage?.link) {
			setFailedImageUrls(prev => {
				const newSet = new Set(prev)
				newSet.add(currentImage.link)
				return newSet
			})
			globalImageCache.set(currentImage.link, false)
		}

		setErrorCount(prevCount => prevCount + 1)
	}, [errorCount, filteredImages])

	const getCurrentImage = useCallback(() => {
		if (!filteredImages.length || errorCount >= filteredImages.length) {
			return {
				link: blurImage.src,
				width: defaultDimensions.width,
				height: defaultDimensions.height,
				position: 'center',
				isBlur: true,
			}
		}

		const currentIndex = errorCount % filteredImages.length
		const image = filteredImages[currentIndex]

		return {
			link: image.link,
			width: image.width ?? defaultDimensions.width,
			height: image.height ?? defaultDimensions.height,
			position: image.position ?? 'center',
			isBlur: image.isBlur,
		}
	}, [filteredImages, errorCount, defaultDimensions])

	useEffect(() => {
		const imageInstances: HTMLImageElement[] = []

		if (preloadImages && filteredImages.length > 0) {
			for (const image of filteredImages) {
				const imageLink = image.link

				if (!globalImageCache.has(imageLink) || globalImageCache.get(imageLink)) {
					const img = new Image()
					imageInstances.push(img)

					img.onload = () => {
						globalImageCache.set(imageLink, true)
					}

					img.onerror = () => {
						globalImageCache.set(imageLink, false)
						setFailedImageUrls(prev => {
							const newSet = new Set(prev)
							newSet.add(imageLink)
							return newSet
						})
					}

					img.src = imageLink
				}
			}
		}

		return () => {
			for (const img of imageInstances) {
				img.onload = null
				img.onerror = null
				img.src = ''
			}
		}
	}, [filteredImages, preloadImages])

	const currentImage = getCurrentImage()

	return {
		currentImage,
		onError: handleImageError,
		failedUrls: Array.from(failedImageUrls),
		isUsingFallback: errorCount >= filteredImages.length,
		imageCount: filteredImages.length,
		errorCount,
	}
}
