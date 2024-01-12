import { APIRoutes } from '@/enums'

interface NextFetchInit extends RequestInit {
  next?: Record<string, unknown>
}

const responseJson = (response: Response) => response.json()

export const fetchData = async (apiPath: string, fetchConfig: NextFetchInit = {}) => {
  const controller = new AbortController()

  const promiseArray = [
    fetch(`${APIRoutes.renderBaseUrl}${apiPath}`, { ...fetchConfig, signal: controller.signal }),
    fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig, signal: controller.signal })
  ]

  const response = await Promise.race(promiseArray)
    .then(responseJson, (error) => console.error(error))
    .finally(() => controller.abort())

  return response
}