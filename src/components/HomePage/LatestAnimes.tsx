import { getLatestAnimes } from '@/services/getLatestAnimes'
import { AnimeCard } from '../AnimeCard'

export const LatestAnimes = async () => {
  const latestAnimes = await getLatestAnimes()

  const animesData = latestAnimes.map(anime => {
    const imageSrc = anime.images?.coverImage ?? anime.images?.carouselImages?.at(-1)?.link ?? ''
    const fbSrc = anime.images?.carouselImages?.at(-2)?.link ?? ''

    return {
      key: anime.animeId,
      title: anime.title,
      image: {
        src: imageSrc,
        fbSrc,
        width: 300,
        height: 350,
        lazy: true
      },
      link: `/animes/${anime.animeId}`,
      labels: [anime.status, anime.type || 'anime'],
      rank: anime.rank,
      description: anime.description
    }
  })

  return animesData.map(animeData => <AnimeCard {...animeData} />)
}
