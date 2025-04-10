import { useEffect, useState } from 'react'

export const useResizeObserver = (target?: Element | null) => {
	const [elementSizes, setElementSizes] = useState<ResizeObserverSize>({
		inlineSize: 0,
		blockSize: 0,
	})

	useEffect(() => {
		if (!target) return

		const handleResize: ResizeObserverCallback = entries => {
			if (!entries || entries.length === 0) return

			const firstEntry = entries[0]

			if (firstEntry.borderBoxSize && Array.isArray(firstEntry.borderBoxSize) && firstEntry.borderBoxSize.length > 0) {
				setElementSizes(firstEntry.borderBoxSize[0])
			} else if (firstEntry.contentRect) {
				setElementSizes({
					inlineSize: firstEntry.contentRect.width,
					blockSize: firstEntry.contentRect.height,
				})
			}
		}

		const observer = new ResizeObserver(handleResize)
		observer.observe(target)

		return () => observer.disconnect()
	}, [target])

	return elementSizes
}
