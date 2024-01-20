import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

interface Props {
  itemIds: string[]
}

interface CurrentItem {
  value: number
  dispatchSource: 'init' | 'user' | 'auto'
}

const SESSION_STORAGE_KEY = 'currentSlideId'

export function useCarousel({ itemIds }: Props) {
  const [currentItem, setCurrentItem] = useState<CurrentItem>({
    value: 0,
    dispatchSource: 'init'
  })

  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const currentSlideId = sessionStorage.getItem(SESSION_STORAGE_KEY)
    const currentSlideIndex = currentSlideId
      ? itemIds.indexOf(currentSlideId)
      : null

    if (!currentSlideIndex) return

    flushSync(() =>
      setCurrentItem({ value: currentSlideIndex, dispatchSource: 'init' })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!scrollerRef.current) return

    const scrollerRefItems = [
      ...scrollerRef.current.childNodes
    ] as HTMLElement[]

    scrollerRefItems.forEach(element => element.removeAttribute('active'))

    const element = scrollerRefItems[currentItem.value]
    element?.setAttribute('active', 'true')

    scrollerRef.current.scrollTo({
      left: element?.offsetLeft,
      behavior: currentItem.dispatchSource === 'user' ? 'smooth' : 'auto'
    })
  }, [currentItem])

  const setCurrentSlide = (itemId: string) => {
    if (!scrollerRef.current) return

    setCurrentItem({ value: itemIds.indexOf(itemId), dispatchSource: 'user' })
    sessionStorage.setItem(SESSION_STORAGE_KEY, itemId)
  }

  return {
    currentSlideId: itemIds[currentItem.value],
    scrollerRef,
    setCurrentSlide
  }
}
