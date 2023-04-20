export interface Episode {
  originalLink: string
  title: string
  link: string
  episode: number
  image?: string
}

export interface LastEpisode extends Episode {
  episodeId?: string
  animeId?: string
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

export type BannerImage = {
  link: string
  position: string
  width?: number
  height?: number
  color?: string
}

type AnimeImages = {
  coverImage?: string
  bannerImages?: BannerImage[]
}

export interface AnimeBase {
  images?: AnimeImages
  title: string
  type?: string
  rank?: string
  link: string
  animeId: string
  status?: string
}

type OtherTitle = string
type Genre = string | undefined

export interface Anime extends AnimeBase {
  description: string
  genres: Genre[]
  originalLink: string
  otherTitles: OtherTitle[]
  episodes: Episode[]
}

export interface ShortAnime extends AnimeBase {
  shortDescription: string
}

export interface GoogleImage {
  contextLink: string
  height: number
  width: number
  byteSize: number
  thumbnailLink: string
  thumbnailHeight: number
  thumbnailWidth: number
}

export interface GoogleImageSearchItem {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  htmlSnippet: string
  mime: string
  fileFormat: string
  image: GoogleImage
}
