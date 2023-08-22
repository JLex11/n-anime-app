import { imageConfig } from '@/constants'
import { Anime } from '@/types'

const domains = imageConfig.remotePatterns.map(({ hostname }) => hostname)
const domainsRegexp = new RegExp(domains.join('|'), 'i')

const isValidDomain = (url?: string) => url?.match(domainsRegexp)

export const filterUnsupportDomains = (anime: Anime) => {
  const { images } = anime
  const { coverImage, carouselImages } = images

  return {
    ...anime,
    images: {
      coverImage: isValidDomain(coverImage) ? coverImage : '',
      carouselImages: carouselImages?.filter(img => isValidDomain(img.link)) || [],
    },
  }
}
