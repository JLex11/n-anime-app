export const API_BASE_URL = 'https://anime-scrapper-alpha.vercel.app/api'
//export const API_BASE_URL = 'http://localhost:3002/api'

export const imageDomains = [
  {
    protocol: 'http',
    hostname: 'anime-scrapper-alpha.vercel.app',
    port: '',
    pathname: '/api/image/**'
  }
]

export const APP_ROUTES = [
  {
    name: 'Inicio',
    link: '/',
    description: 'Ver los episodios y animes mas recientes',
  },
  {
    name: 'Animes',
    link: '/animes',
    description: 'Ver el listado de animes',
  },
]
