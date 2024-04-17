import { Anime } from '@/types'
import { Carousel } from '../Carousel'
import LoadingIcon from '../Icons/LoadingIcon'

interface Props {
  animesPromise: Promise<Anime[]>
  fallbackPromise?: Promise<Anime[]>
}

export async function CarouselHero({ animesPromise, fallbackPromise }: Props) {
  const carouselAnimes = (await animesPromise) || (await fallbackPromise)
  return <Carousel animes={carouselAnimes} showInfo />
}

export const CarouselLoader = () => {
  return (
    <div
      style={{
        height: 'var(--carousel-height)',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <div className='page-loader'>
        <LoadingIcon />
      </div>
    </div>
  )
}
