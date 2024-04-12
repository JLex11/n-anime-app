import { APIRoutes } from '@/enums'

interface NextFetchInit extends RequestInit {
  next?: Record<string, unknown>
}

export const fetchData = async (apiPath: string, fetchConfig: NextFetchInit = {}) => {
  if (!apiPath) throw new Error('apiPath is required')

  const promiseArray = [
    fetch(`${APIRoutes.renderBaseUrl}${apiPath}`, { ...fetchConfig }),
    fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig })
  ]

  return Promise.any(promiseArray)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    })
    .catch(console.log)
}
