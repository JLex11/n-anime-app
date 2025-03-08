declare global {
  interface Array<T> {
    toSorted(fn?: (a: T, b: T) => number): T[]
  }
  interface Document {
    prerendering: boolean
  }
  interface Window {
    speculation: {
      prerender: (options: { urls: string[] }) => Promise<void>
    }
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
  SUB: EpisodeVideo[]
  DUB?: EpisodeVideo[]
  LAT?: EpisodeVideo[]
}

export interface EpisodeSources {
  episode: string
  videos: VideoList
}

export type VideoLangs = keyof VideoList

export type CarouselImage = {
  link: string
  position: string
  width?: number
  height?: number
  color?: string
}

type AnimeImages = {
  coverImage?: string | null
  carouselImages: CarouselImage[]
}

export interface Anime {
  images?: AnimeImages | null
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

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
