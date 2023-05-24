import { API_BASE_URL } from './constants'

export enum ResponseType {
  JSON = 'json',
  TEXT = 'text',
  BUFFER = 'buffer',
}

export enum animeStatus {
  BROADCAST = '1',
  FINALIZED = '2',
  SOON = '3',
}

export enum APIRoutes {
  baseUrl = API_BASE_URL,
  LatestEpisodes = `${API_BASE_URL}/episodes/latest`,
  VideoStreaming = `${API_BASE_URL}/episodes/sources`,
  LatestAnimes = `${API_BASE_URL}/animes/latest`,
  BroadcastAnimes = `${API_BASE_URL}/animes/broadcast`,
  RatingAnimes = `${API_BASE_URL}/animes/latest/rating`,
  InfoAnime = `${API_BASE_URL}/animes`,
  AnimeEpisodes = `${API_BASE_URL}/animes/:animeId/episodes`,
  SearchAnimes = `${API_BASE_URL}/animes/search`,
}

export enum autoCompleteHotKeys {
  ENTER = 'enter',
  ESCAPE = 'escape',
  SPACE = 'space',
  TAB = 'tab',
  ARROW_DOWN = 'arrowdown',
  ARROW_UP = 'arrowup',
  CTRL_SPACE = 'ctrl+space',
  CTRL_K = 'ctrl+k',
}
