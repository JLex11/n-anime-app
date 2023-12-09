import { APIRoutes } from '@/enums'

interface NextFetchInit extends RequestInit {
  next?: any
}

const responseJson = (response: Response) => response.json()

export const fetchData = async (apiPath: string, fetchConfig: NextFetchInit = {}) => {
  return fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig }).then(responseJson)
}
