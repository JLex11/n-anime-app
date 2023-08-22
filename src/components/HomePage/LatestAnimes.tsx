import { getLatestAnimes } from '@/services/getLatestAnimes'
import { CardsSection } from '../CardsSection/CardsSection'
import LatestIcon from '../Icons/LatestIcon'
import { CardDetails } from './LatestAnimesCardDetails'

export const LatestAnimes = async () => {
  const latestAnimes = await getLatestAnimes()

  const animeData = latestAnimes.map(anime => {
    const imageSrc = anime.images?.coverImage ?? anime.images?.carouselImages?.at(-1)?.link ?? ''
    const fbSrc = anime.images?.carouselImages?.at(-2)?.link ?? ''

    return {
      key: anime.animeId,
      title: anime.title,
      link: `/animes/${anime.animeId}`,
      imageSrc,
      fbSrc,
      width: 300,
      height: 350,
      showOnHover: (
        <CardDetails description={anime.description} status={anime.status} rank={anime.rank} genres={anime.genres} />
      ),
    }
  })

  return <CardsSection title='Últimos animes' icon={<LatestIcon />} data={animeData} />
}
