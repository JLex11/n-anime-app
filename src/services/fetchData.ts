import { APIRoutes } from '@/enums'

interface NextFetchInit extends RequestInit {
  next: any
}

const responseJson = (response: Response) => response.json()

const handleError = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    // console.error('Fetch request was aborted')
  } else {
    throw error
  }
}

export const fetchData = async (apiPath: string, fetchConfig: RequestInit = {}) => {
  const controller = new AbortController()

  const promiseArray = [
    fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig, signal: controller.signal })
      .then(responseJson)
      .catch(handleError),
    fetch(`${APIRoutes.fl0BaseUrl}${apiPath}`, { ...fetchConfig, signal: controller.signal })
      .then(responseJson)
      .catch(handleError)
  ]

  const response = await Promise.race(promiseArray)
  controller.abort()

  return response
}
