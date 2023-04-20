import { API, IMG_DOMAIN } from '@/constants'
import { Anime } from '@/types'
import { minToSeconds } from '@/utils/convertTime'

const sortByRank = (a: Anime, b: Anime) => Number(b?.rank ?? 0) - Number(a?.rank ?? 0)

const filterUnsupportImageDomains = (anime: Anime) => {
  return {
    ...anime,
    images: {
      coverImage: anime.images?.coverImage?.includes(IMG_DOMAIN)
        ? anime.images?.coverImage
        : '',
      bannerImages: anime.images?.bannerImages?.filter(img =>
        img.link.includes(IMG_DOMAIN)
      ),
    },
  }
}

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
  const response = await fetch(`${API.routes.RatingAnimes}?limit=${limit}`, {
    next: { revalidate: minToSeconds(10) },
  })

  const animes: Anime[] = await response.json()
  return animes.sort(sortByRank).map(filterUnsupportImageDomains)
}
