import { useEffect, useRef, useState } from 'react'

interface Props {
  itemIds: string[]
}

export function useCarousel({ itemIds }: Props) {
  const [currentItem, setCurrentItem] = useState({
    value: 0,
    dispatchSource: 'init' as 'init' | 'user' | 'auto'
  })

  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const currentSlideId = sessionStorage.getItem('currentSlideId')
    const currentSlideIndex = currentSlideId
      ? itemIds.indexOf(currentSlideId)
      : null

    if (currentSlideIndex) {
      setCurrentItem({ value: currentSlideIndex, dispatchSource: 'init' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!scrollerRef.current) return

    const scrollerRefItems = [
      ...scrollerRef.current.childNodes
    ] as HTMLElement[]

    const element = scrollerRefItems[currentItem.value]
    scrollerRef.current.scrollTo({
      left: element?.offsetLeft,
      behavior: currentItem.dispatchSource === 'user' ? 'smooth' : 'auto'
    })
  }, [currentItem])

  const setCurrentSlide = (itemId: string) => {
    if (!scrollerRef.current) return

    setCurrentItem({ value: itemIds.indexOf(itemId), dispatchSource: 'user' })
    sessionStorage.setItem('currentSlideId', itemId)
  }

  return {
    currentSlideId: itemIds[currentItem.value],
    scrollerRef,
    setCurrentSlide
  }
}
