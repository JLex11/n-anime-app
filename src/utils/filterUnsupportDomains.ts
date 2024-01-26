import { imageDomains } from '@/constants'
import { Anime } from '@/types'

const domains = imageDomains.map(({ hostname }) => hostname)
const domainsRegexp = new RegExp(domains.join('|'), 'i')

const isValidDomain = (url?: string | null) => domainsRegexp.test(url ?? '')

const replaceInvalidImagePath = (url: string) =>
  url && !url.includes('/api/image/')
    ? url.replace('/api/', '/api/image/')
    : url

export const filterUnsupportDomains = (anime: Anime) => {
  const { images } = anime
  const coverImage = images?.coverImage ?? ''
  const carouselImages = images?.carouselImages ?? []

  return {
    ...anime,
    images: {
      coverImage: isValidDomain(coverImage)
        ? replaceInvalidImagePath(coverImage)
        : '',
      carouselImages: carouselImages
        .filter(img => isValidDomain(img.link))
        .map(img => {
          return {
            ...img,
            link: replaceInvalidImagePath(img.link)
          }
        })
    }
  }
}
