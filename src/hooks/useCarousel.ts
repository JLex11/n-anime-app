import { viewHeight } from '@/utils/calculateClientViewport'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSessionStorage } from './useSessionStorage'
import { useVisibilityChange } from './useVisibilityChange'

interface Props {
  itemIds: string[]
  timeBetweenSlides: number
}

type HandleCurrentSlideProps = {
  itemId: string
  smooth?: boolean
}

export function useCarousel({ itemIds, timeBetweenSlides }: Props) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [sliding, setSliding] = useSessionStorage<boolean>('carousel_sliding', itemIds.length > 1)
  const pageIsVisible = useVisibilityChange()

  const scrollerRef = useRef<HTMLUListElement>(null)

  const handleCurrentSlide = useCallback(
    ({ itemId, smooth = true }: HandleCurrentSlideProps) => {
      if (!scrollerRef.current || !pageIsVisible) return

      const scrollerRefItems = [...scrollerRef.current.childNodes] as HTMLElement[]

      const element = scrollerRefItems.find(({ id }) => id === itemId)
      scrollerRef.current.scrollTo({ left: element?.offsetLeft, behavior: smooth ? 'smooth' : 'auto' })

      setCurrentItemIndex(itemIds.indexOf(itemId))
      sessionStorage.setItem('currentSlideId', itemId)
    },
    [itemIds, pageIsVisible]
  )

  const setCurrentSlide = (itemId: string) => handleCurrentSlide({ itemId })

  useEffect(
    () => {
      const storageSlideId = sessionStorage.getItem('currentSlideId')
      if (!sliding || !storageSlideId) return
      handleCurrentSlide({ itemId: storageSlideId, smooth: false })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (itemIds.length <= 1 || window.scrollY > viewHeight(20) || !sliding) return

    const interval = setInterval(() => {
      handleCurrentSlide({ itemId: itemIds[(currentItemIndex + 1) % itemIds.length] })
    }, timeBetweenSlides)

    return () => clearInterval(interval)
  }, [itemIds, timeBetweenSlides, currentItemIndex, handleCurrentSlide, sliding])

  return {
    currentSlideId: itemIds[currentItemIndex],
    sliding,
    setSliding,
    scrollerRef,
    setCurrentSlide
  }
}
