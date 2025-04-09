import { useEffect, useState, useSyncExternalStore } from 'react'

export const useResize = (ref: React.RefObject<HTMLElement>) => {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		if (ref.current) {
			setSize({
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			})
		}
	}, [ref])

	const subscribe = (callback: () => void) => {
		window.addEventListener('resize', callback, { passive: true })
		return () => {
			window.removeEventListener('resize', callback)
		}
	}

	const getSnapshot = () => {
		if (ref.current) {
			return {
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			}
		}
		return size
	}

	return useSyncExternalStore(subscribe, getSnapshot)
}
