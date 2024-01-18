import { Anime } from '@/types'
import { CarouselWrapper } from './CarouselWrapper'
import { Item } from './Item'

interface Props {
  animes: Anime[]
  showInfo?: boolean
  timeBetweenSlides?: number
}

export function Carousel({ animes, showInfo, timeBetweenSlides }: Props) {
  if (!animes) return null

  return (
    <CarouselWrapper animes={animes} timeBetweenSlides={timeBetweenSlides}>
      {animes.map((anime, i) => (
        <Item key={anime.animeId} anime={anime} showInfo={showInfo} index={i} />
      ))}
    </CarouselWrapper>
  )
}
