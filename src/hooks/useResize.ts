import { useEffect, useState } from 'react'

export const useResize = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      })
    }
  }, [ref])

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return size
}
