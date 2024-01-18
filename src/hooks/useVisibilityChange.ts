import { useEffect, useState } from 'react'

export const useVisibilityChange = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') setIsVisible(true)
      else setIsVisible(false)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange, {
      passive: true
    })

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isVisible
}
