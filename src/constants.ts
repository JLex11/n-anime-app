export const API_BASE_URL = 'https://anime-scrapper-lake.vercel.app/api'
//export const API_BASE_URL = 'http://localhost:3002/api'
export const IMG_DOMAIN = /anime-app.s3|cdn.animeflv.net|anime-scrapper-lake.vercel.app|www3.animeflv.net/

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
