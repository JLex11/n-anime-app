import { useEffect, useState, useSyncExternalStore } from 'react'

export const useResizeObserver = (target: Element | null) => {
	const [elementSizes, setElementSizes] = useState<ResizeObserverSize>({
		inlineSize: 0,
		blockSize: 0,
	})

	const subscribe = (callback: () => void) => {
		if (!target) return () => {}

		const handleResize: ResizeObserverCallback = entries => {
			if (!entries || entries.length === 0) return
			const [firstEntry] = entries
			const [borderSizes] = firstEntry.borderBoxSize
			setElementSizes(borderSizes)
			callback()
		}

		const observer = new ResizeObserver(handleResize)
		observer.observe(target)

		return observer.disconnect
	}

	const getSnapshot = () => elementSizes

	const getServerSnapshot = () => ({
		inlineSize: 0,
		blockSize: 0,
	})

	useEffect(() => {
		if (!target) return

		setElementSizes({
			inlineSize: target.clientWidth,
			blockSize: target.clientHeight,
		})
	}, [target])

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
