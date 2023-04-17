// const API_BASE_URL = 'https://anime-scrapper-two.vercel.app/api'
const API_BASE_URL = 'http://localhost:3002/api'

export const API = {
  baseUrl: API_BASE_URL,
  routes: {
    LatestEpisodes: `${API_BASE_URL}/episodes/latest`,
    VideoStreaming: `${API_BASE_URL}/episodes/sources`,
    LatestAnimes: `${API_BASE_URL}/animes/latest`,
    BroadcastAnimes: `${API_BASE_URL}/animes/broadcast`,
    RatingAnimes: `${API_BASE_URL}/animes/latest/rating`,
    InfoAnime: `${API_BASE_URL}/animes`
  },
}

export const APP_ROUTES = [
  { name: 'Home', link: '/' },
  { name: 'Directory', link: '/directory' },
]