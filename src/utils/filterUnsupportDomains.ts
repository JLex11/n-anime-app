import { IMG_DOMAIN } from '@/constants'
import { Anime } from '@/types'

export const filterUnsupportDomains = (anime: Anime) => {
  return {
    ...anime,
    images: {
      coverImage: anime?.images?.coverImage?.match(IMG_DOMAIN) ? anime.images?.coverImage : '',
      carouselImages: anime?.images?.carouselImages?.filter(img => img?.link?.match(IMG_DOMAIN)) || [],
    },
  }
}
