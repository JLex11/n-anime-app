import { viewHeight } from '@/utils/calculateClientViewport'
import { useEffect, useState } from 'react'

export const useScrolled = (vh = 30) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY > viewHeight(vh)
      if (s !== scrolled) setScrolled(s)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled, vh])

  return scrolled
}
