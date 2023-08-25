import { Anime } from '@/types'
import { CarouselClient } from './Carousel_client'
import { Item } from './Item'

interface Props {
  animes: Anime[]
  showInfo?: boolean
  timeBetweenSlides?: number
}

export const CarouselHero = ({ animes, showInfo, timeBetweenSlides = 10000 }: Props) => {
  return (
    <CarouselClient animes={animes} showInfo={showInfo} timeBetweenSlides={timeBetweenSlides}>
      {animes.map((anime, i) => (
        <Item key={anime.animeId} anime={anime} showInfo={showInfo} index={i} />
      ))}
    </CarouselClient>
  )
}
