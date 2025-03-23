import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
	itemIds: string[]
}

interface CurrentItem {
	value: number
	dispatchSource: 'init' | 'user' | 'auto'
}

const SESSION_STORAGE_KEY = 'currentSlideId'

// Creamos una versión segura de useLayoutEffect que funciona en SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useCarousel({ itemIds }: Props) {
	const [currentItem, setCurrentItem] = useState<CurrentItem>({
		value: 0,
		dispatchSource: 'init',
	})

	const scrollerRef = useRef<HTMLUListElement>(null)

	// Usamos useIsomorphicLayoutEffect para que se ejecute solo una vez al montar el componente
	useIsomorphicLayoutEffect(() => {
		if (typeof window !== 'undefined') {
			const currentSlideId = sessionStorage.getItem(SESSION_STORAGE_KEY)
			const currentSlideIndex = currentSlideId ? itemIds.indexOf(currentSlideId) : -1

			if (currentSlideIndex !== -1) {
				setCurrentItem({ value: currentSlideIndex, dispatchSource: 'init' })
			}
		}
	}, [])

	useEffect(() => {
		if (!scrollerRef.current) return

		const scrollerRefItems = [...scrollerRef.current.childNodes] as HTMLElement[]
		for (const element of scrollerRefItems) element.removeAttribute('active')

		const element = scrollerRefItems[currentItem.value]
		element?.setAttribute('active', 'true')

		scrollerRef.current.scrollTo({
			left: element?.offsetLeft,
			top: window.scrollY,
			behavior: currentItem.dispatchSource === 'user' ? 'smooth' : 'auto',
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
		setCurrentSlide,
	}
}
