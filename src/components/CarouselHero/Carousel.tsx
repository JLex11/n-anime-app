'use client'

import { useCarousel } from '@/hooks/useCarousel'
import { Anime } from '@/types'
import clsx from 'clsx'
import styles from './Carousel.module.css'
import { Item } from './Item'
import { CarouselNavigation } from './Navigation'

interface Props {
  animes: Anime[]
  showInfo?: boolean
  timeBetweenSlides?: number
}

export const CarouselHero = ({ animes, showInfo, timeBetweenSlides = 7000 }: Props) => {
  const { carouselElementsRef, currentSlideId, scrollerRef, changeCurrentSlide } = useCarousel({
    itemIds: animes.map(({ animeId }) => animeId),
    timeBetweenSlides,
  })

  const handleCarouselItemsRef = (e: HTMLDivElement | null, index: number) => {
    if (!e) return
    carouselElementsRef.current[index] = e
  }

  const buttonsData = animes.map(({ title, animeId }) => {
    return {
      title,
      animeId,
      isActive: animeId === currentSlideId,
    }
  })

  return (
    <section className={styles.carousel}>
      <div className={styles.scroller} ref={scrollerRef}>
        {animes.map((anime, i) => {
          const isActive = anime.animeId === currentSlideId
          const itemClass = clsx(styles.carouselItem, isActive && styles.active)

          return (
            <div key={anime.animeId} id={anime.animeId} ref={e => handleCarouselItemsRef(e, i)} className={itemClass}>
              <Item anime={anime} showInfo={showInfo} index={i} isActive={isActive} />
            </div>
          )
        })}
      </div>
      {animes.length > 1 && <CarouselNavigation buttonsData={buttonsData} setCurrentSlide={changeCurrentSlide} />}
    </section>
  )
}
