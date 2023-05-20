export const API_BASE_URL = 'https://anime-scrapper-two.vercel.app/api'
//export const API_BASE_URL = 'http://localhost:3002/api'
export const IMG_DOMAIN = /anime-app.s3|cdn.animeflv.net/

export const APP_ROUTES = [
  {
    name: 'Home',
    link: '/',
    description: 'View most recent episodes and animes',
  },
  {
    name: 'Directory',
    link: '/directory',
    description: 'View all animes',
  },
  {
    name: 'Animes',
    link: '/animes',
    description: 'View Animes',
  },
  {
    name: 'Episodes',
    link: '/episodes',
    description: 'View episodes',
  },
]
