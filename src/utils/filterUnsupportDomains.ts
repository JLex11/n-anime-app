import { imageDomains } from '@/constants'
import { Anime } from '@/types'

const domains = imageDomains.map(({ hostname }) => hostname)
const domainsRegexp = new RegExp(domains.join('|'), 'i')

const isValidDomain = (url?: string) => domainsRegexp.test(url ?? '')

export const filterUnsupportDomains = (anime: Anime) => {
  const { images } = anime
  const { coverImage, carouselImages } = images

  return {
    ...anime,
    images: {
      coverImage: isValidDomain(coverImage) ? coverImage : null,
      carouselImages: carouselImages?.filter(img => isValidDomain(img.link)) || []
    }
  }
}
