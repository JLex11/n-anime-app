import { useEffect, useState } from 'react'

export default function useDebounce(fn: any, delay: number = 500) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>()

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId)
    }
  }, [timeoutId])

  return function debouncedFn(...args: any) {
    clearTimeout(timeoutId)
    const id = setTimeout(() => {
      fn(...args)
    }, delay)
    setTimeoutId(id)
  }
}