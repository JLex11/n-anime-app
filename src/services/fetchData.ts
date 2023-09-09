import { APIRoutes } from '@/enums'

const responseJson = (response: Response) => response.json()

export const fetchData = async (apiPath: string, fetchConfig?: RequestInit) => {
  const promiseArray = [
    fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, fetchConfig).then(responseJson),
    fetch(`${APIRoutes.fl0BaseUrl}${apiPath}`, fetchConfig).then(responseJson)
  ]

  return await Promise.race(promiseArray)
}
