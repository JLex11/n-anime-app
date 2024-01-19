import { useEffect, useRef, useState } from 'react'

interface Props {
  itemIds: string[]
}

export function useCarousel({ itemIds }: Props) {
  const [currentItem, setCurrentItem] = useState(() => {
    const storageSlideId = sessionStorage.getItem('currentSlideId')
    return {
      value: itemIds.indexOf(storageSlideId || itemIds[0]),
      dispatchSource: 'init' as 'init' | 'user' | 'auto'
    }
  })

  const scrollerRef = useRef<HTMLUListElement>(null)

  const setCurrentSlide = (itemId: string) => {
    if (!scrollerRef.current) return

    setCurrentItem({ value: itemIds.indexOf(itemId), dispatchSource: 'user' })
    sessionStorage.setItem('currentSlideId', itemId)
  }

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

  return {
    currentSlideId: itemIds[currentItem.value],
    scrollerRef,
    setCurrentSlide
  }
}
