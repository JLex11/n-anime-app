import { APIRoutes } from '@/enums'

interface NextFetchInit extends RequestInit {
  next?: Record<string, unknown>
}

const responseJson = (response: Response) => response.json()

export const fetchData = async (apiPath: string, fetchConfig: NextFetchInit = {}) => {
  const promiseArray = [
    fetch(`${APIRoutes.renderBaseUrl}${apiPath}`, { ...fetchConfig }),
    fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig })
  ]

  return Promise.any(promiseArray).then(responseJson).catch(console.error)
}
