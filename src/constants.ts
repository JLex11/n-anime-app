export const VERCEL_API_BASE_URL = 'https://anime-scrapper-alpha.vercel.app/api'
export const RENDER_API_BASE_URL = 'https://anime-scrapper-3c3n.onrender.com/api'
export const FL0_API_BASE_URL = 'https://anime-scrapper-2rl4-dev.fl0.io/api'
//export const API_BASE_URL = 'http://localhost:3002/api'

export const imageDomains = [
  {
    protocol: 'http',
    hostname: 'anime-scrapper-alpha.vercel.app',
    port: '',
    pathname: '/api/image/**'
  },
  {
    protocol: 'https',
    hostname: 'anime-scrapper-3c3n.onrender.com',
    port: '',
    pathname: '/api/image/**'
  },
  {
    protocol: 'http',
    hostname: 'anime-scrapper-3c3n.onrender.com',
    port: '',
    pathname: '/api/image/**'
  },
  /* {
    protocol: 'https',
    hostname: 'anime-scrapper-2rl4-dev.fl0.io',
    port: '',
    pathname: '/api/image/**'
  },
  {
    protocol: 'http',
    hostname: 'anime-scrapper-2rl4-dev.fl0.io',
    port: '',
    pathname: '/api/image/**'
  } */
]

export const APP_ROUTES = [
  {
    name: 'Inicio',
    link: '/',
    description: 'Ver los episodios y animes mas recientes'
  },
  {
    name: 'Animes',
    link: '/animes',
    description: 'Ver el listado de animes'
  }
]
