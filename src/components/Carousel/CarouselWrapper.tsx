'use client'

import { useCarousel } from '@/hooks/useCarousel'
import { Anime } from '@/types'
import styles from './Carousel.module.css'
import { CarouselNavigation } from './Navigation'

interface Props {
  animes: Anime[]
  timeBetweenSlides?: number
  children: React.ReactNode
}

export function CarouselWrapper({ animes, children, timeBetweenSlides = 10000 }: Props) {
  const { currentSlideId, setCurrentSlide, scrollerRef } = useCarousel({
    itemIds: animes.map(({ animeId }) => animeId),
    timeBetweenSlides
  })

  const buttonsData = animes.map(({ title, animeId }) => ({
    title,
    animeId
  }))

  return (
    <section className={styles.carousel}>
      <ul className={styles.scroller} ref={scrollerRef}>
        {children}
      </ul>
      {animes.length > 1 && (
        <CarouselNavigation
          buttonsData={buttonsData}
          currentSlideId={currentSlideId}
          setCurrentSlide={setCurrentSlide}
        />
      )}
    </section>
  )
}
