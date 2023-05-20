import { viewHeight } from '@/utils/calculateClientViewport'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useVisibilityChange } from './useVisibilityChange'

export const useCarousel = (itemIds: string[], timeBetweenSlides: number) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [sliding, setSliding] = useState(itemIds.length > 1)
  const isVisible = useVisibilityChange()
  const first = useRef(true)

  const carouselElementsRef = useRef<HTMLDivElement[]>([])
  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleCurrentSlide = useCallback(
    (itemId: string, smooth = true, scroll = true) => {
      if (!scrollerRef.current || window.scrollY > viewHeight(20) || !isVisible || !scroll) return

      setCurrentItemIndex(itemIds.indexOf(itemId))
      sessionStorage.setItem('currentSlideId', itemId)

      const element = carouselElementsRef.current.find(({ id }) => id === itemId)
      element?.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
      })
    },
    [itemIds, isVisible]
  )

  const changeCurrentSlide = (itemId: string) => {
    handleCurrentSlide(itemId)
  }

  useEffect(() => {
    const storageSlideId = sessionStorage.getItem('currentSlideId')
    if (!sliding || !storageSlideId) return

    handleCurrentSlide(storageSlideId, !first.current)
    first.current = false
  }, [sliding, handleCurrentSlide])

  useEffect(() => {
    if (itemIds.length <= 1) return

    const interval = setInterval(() => {
      handleCurrentSlide(itemIds[(currentItemIndex + 1) % itemIds.length])
    }, timeBetweenSlides)

    return () => clearInterval(interval)
  }, [itemIds, timeBetweenSlides, isVisible, currentItemIndex, handleCurrentSlide])

  const currentSlideId = itemIds[currentItemIndex]

  return {
    currentSlideId,
    sliding,
    setSliding,
    carouselElementsRef,
    scrollerRef,
    changeCurrentSlide,
  }
}
