import { getLatestAnimes } from '@/services/getLatestAnimes'
import { CardsSection } from '../CardsSection'
import LatestIcon from '../Icons/LatestIcon'

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
    }
  })

  return <CardsSection title='Latest Animes' icon={<LatestIcon />} data={animeData} />
}
