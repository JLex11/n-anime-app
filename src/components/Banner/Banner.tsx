'use client'

import { Anime } from '@/types'
import { viewHeight } from '@/utils/calculateClientViewport'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Banner.module.css'
import BannerItem from './Item'
//import { BannerSliderNavigations } from './BannerSliderNavigations'
import dynamic from 'next/dynamic'

interface Props {
  animes: Anime[]
  showInfo?: boolean
  timeBetweenSlides?: number
}

const BannerNavigation = dynamic(() => import('./Navigation'), {
  loading: () => <p>Loading...</p>,
})

export const Banner = ({ animes, showInfo, timeBetweenSlides = 7000 }: Props) => {
  const [currentSlideId, setCurrentSlideId] = useState(animes.at(0)?.animeId ?? '')

  const bannerElementsRef = useRef<HTMLDivElement[]>([])
  const scrollerRef = useRef(null)

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animeId = entry.target.id
        setCurrentSlideId(animeId)
      }
    })
  }

  useEffect(() => {
    if (animes.length <= 1) return

    const oberverOptions = {
      root: scrollerRef.current,
      rootMargin: '0px',
      threshold: 1,
    }

    const observer = new IntersectionObserver(handleObserver, oberverOptions)
    bannerElementsRef.current.forEach(e => observer.observe(e))

    return () => observer.disconnect()
  }, [animes])

  const handleCurrentSlide = (animeId: string) => {
    setCurrentSlideId(animeId)
    const element = bannerElementsRef.current.find(e => e.id === animeId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (animes.length <= 1) return

    const interval = setInterval(() => {
      if (window.scrollY > viewHeight(30)) return

      const currentIndex = animes.findIndex(a => a.animeId === currentSlideId)
      const nextIndex = currentIndex + 1 >= animes.length ? 0 : currentIndex + 1
      const nextAnime = animes.at(nextIndex)
      if (!nextAnime) return

      handleCurrentSlide(nextAnime.animeId)
    }, timeBetweenSlides)

    return () => clearInterval(interval)
  }, [animes, currentSlideId, timeBetweenSlides])

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
        <BannerNavigation buttonsData={buttonsData} setCurrentSlide={handleCurrentSlide} />
      )}
    </section>
  )
}
