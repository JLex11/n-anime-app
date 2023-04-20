'use client'

import { Anime } from '@/types'
import { viewHeight } from '@/utils/calculateClientViewport'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Banner.module.css'
import BannerItem from './Item'
import BannerNavigation from './Navigation'

interface Props {
  animes: Anime[]
  showInfo?: boolean
  timeBetweenSlides?: number
}

export const Banner = ({ animes, showInfo, timeBetweenSlides = 7000 }: Props) => {
  const [currentSlideId, setCurrentSlideId] = useState(animes.at(0)?.animeId ?? '')
  const [sliding, setSliding] = useState(animes.length > 1)

  const bannerElementsRef = useRef<HTMLDivElement[]>([])
  const scrollerRef = useRef(null)

  useEffect(() => {
    if (!sliding) return

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && sliding) {
          const animeId = entry.target.id
          setCurrentSlideId(animeId)
        }
      })
    }

    const oberverOptions = {
      root: scrollerRef.current,
      rootMargin: '0px',
      threshold: 1,
    }

    const observer = new IntersectionObserver(handleObserver, oberverOptions)
    bannerElementsRef.current.forEach(e => observer.observe(e))

    return () => observer.disconnect()
  }, [animes, sliding])

  const handleCurrentSlide = (animeId: string) => {
    setCurrentSlideId(animeId)
    const element = bannerElementsRef.current.find(e => e.id === animeId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!sliding) return

    const interval = setInterval(() => {
      if (window.scrollY > viewHeight(30)) return

      const currentIndex = animes.findIndex(a => a.animeId === currentSlideId)
      const nextIndex = currentIndex + 1 >= animes.length ? 0 : currentIndex + 1
      const nextAnime = animes.at(nextIndex)
      if (!nextAnime) return

      handleCurrentSlide(nextAnime.animeId)
    }, timeBetweenSlides)

    /* const handleVisibilityChange = () => {
      setSliding(document.visibilityState === 'visible')
      console.log(document.visibilityState)
    }

    window.addEventListener('visibilitychange', handleVisibilityChange) */

    return () => {
      clearInterval(interval)
      // window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [animes, currentSlideId, timeBetweenSlides, sliding])

  const handleBannerItemsRef = (e: HTMLDivElement | null, index: number) => {
    if (!e) return
    bannerElementsRef.current[index] = e
  }

  const buttonsData = animes.map(({ title, animeId }) => {
    return {
      title,
      animeId,
      isActive: animeId === currentSlideId,
    }
  })

  return (
    <section className={styles.banner}>
      <div className={styles.scroller} id='banner-scroller' ref={scrollerRef}>
        {animes.map((anime, i) => (
          <BannerItem
            key={anime.animeId}
            anime={anime}
            showInfo={showInfo}
            index={i}
            ref={e => handleBannerItemsRef(e, i)}
            isActive={anime.animeId === currentSlideId}
          />
        ))}
      </div>
      {animes.length > 1 && (
        <BannerNavigation
          buttonsData={buttonsData}
          setCurrentSlide={handleCurrentSlide}
        />
      )}
    </section>
  )
}
