import { useEffect, useState } from 'react'

export const useResizeObserver = (target?: Element | null) => {
  const [elementSizes, setElementSizes] = useState<ResizeObserverSize>({
    inlineSize: 0,
    blockSize: 0
  })

  useEffect(() => {
    if (!target) return

    const handleResize: ResizeObserverCallback = e => {
      const [firstEntry] = e
      const [borderSizes] = firstEntry.borderBoxSize
      setElementSizes(borderSizes)
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(target)

    return () => observer.disconnect()
  }, [target])

  return elementSizes
}
