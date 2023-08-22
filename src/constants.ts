export const API_BASE_URL = 'https://anime-scrapper-alpha.vercel.app/api'
//export const API_BASE_URL = 'http://localhost:3002/api'

const IMAGE_DAYS_CACHE = 30

export const imageConfig = {
  minimumCacheTTL: IMAGE_DAYS_CACHE * 24 * 60 * 60,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'anime-app.s3.us-east-1.amazonaws.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: 'anime-scrapper-alpha.vercel.app',
      port: '',
      pathname: '/api/image/**',
    },
    {
      protocol: 'https',
      hostname: 'cdn.animeflv.net',
      port: '',
      pathname: '/screenshots/**',
    },
    {
      protocol: 'https',
      hostname: 'www3.animeflv.net',
      port: '',
      pathname: '/uploads/animes/covers/**',
    },
  ],
}

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
