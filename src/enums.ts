import {
  FL0_API_BASE_URL,
  RENDER_API_BASE_URL,
  VERCEL_API_BASE_URL
} from './constants'

export enum ResponseType {
  JSON = 'json',
  TEXT = 'text',
  BUFFER = 'buffer'
}

export enum animeStatus {
  BROADCAST = '1',
  FINALIZED = '2',
  SOON = '3'
}

export enum APIRoutes {
  vercelBaseUrl = VERCEL_API_BASE_URL,
  fl0BaseUrl = FL0_API_BASE_URL,
  renderBaseUrl = RENDER_API_BASE_URL,
  LatestEpisodes = `/episodes/latest`,
  VideoStreaming = `/episodes/sources`,
  LatestAnimes = `/animes/latest`,
  BroadcastAnimes = `/animes/broadcast`,
  RatingAnimes = `/animes/latest/rating`,
  InfoAnime = `/animes`,
  AnimeEpisodes = `/animes/:animeId/episodes`,
  SearchAnimes = `/animes/search`
}

export enum autoCompleteHotKeys {
  ENTER = 'enter',
  SPACE = 'space',
  TAB = 'tab',
  ARROW_DOWN = 'arrowdown',
  ARROW_UP = 'arrowup',
  CTRL_SPACE = 'ctrl+space',
  OUT = 'escape',
  LAUNCH = '/'
}
