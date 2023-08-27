import { imageDomains } from '@/constants'
import { Anime } from '@/types'

const domains = imageDomains.map(({ hostname }) => hostname)
const domainsRegexp = new RegExp(domains.join('|'), 'i')

const isValidDomain = (url?: string) => domainsRegexp.test(url ?? '')

export const filterUnsupportDomains = (anime: Anime) => {
  const { images } = anime

  return {
    ...anime,
    images: {
      coverImage: isValidDomain(images?.coverImage ?? '') ? images?.coverImage : null,
      carouselImages: images?.carouselImages?.filter(img => isValidDomain(img.link)) || []
    }
  }
}
