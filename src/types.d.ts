declare global {
  interface Array<T> {
    toSorted(fn?: (a: T, b: T) => number): T[]
  }
}

export interface Episode {
  originalLink: string
  title: string
  link: string
  episode: number
  image?: string
  episodeId: string
  animeId: string
  created_at?: string
}

export interface EpisodeVideo {
  server: string
  title: string
  ads: number
  url?: string
  allow_mobile: boolean
  code: string
  episodeId: string
}

export interface VideoList {
  SUB?: EpisodeVideo[]
  DUB?: EpisodeVideo[]
}

export interface EpisodeSources {
  episode: string
  videos: VideoList
}

export type CarouselImage = {
  link: string
  position: string
  width?: number
  height?: number
  color?: string
}

type AnimeImages = {
  coverImage: string | null
  carouselImages: CarouselImage[]
}

export interface Anime {
  images: AnimeImages
  title: string
  type: string | null
  rank: number | null
  animeId: string
  link: string
  otherTitles: string[] | []
  description: string
  originalLink: string | null
  status: string
  genres: string[] | []
  created_at: string
}
