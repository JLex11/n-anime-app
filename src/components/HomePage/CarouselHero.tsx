import { Anime } from '@/types'
import { Carousel } from '../Carousel'
import LoadingIcon from '../Icons/LoadingIcon'

interface Props {
  animesPromise: Promise<Anime[]>
}

export async function CarouselHero({ animesPromise }: Props) {
  const carouselAnimes = await animesPromise
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
