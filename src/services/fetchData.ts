import { APIRoutes } from '@/enums'

interface NextFetchInit extends RequestInit {
	next?: Record<string, unknown>
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchData = async <T>(
	apiPath: string,
	fetchConfig: NextFetchInit = {}
): Promise<T | undefined> => {
	if (!apiPath) throw new Error('apiPath is required')

	const promiseArray = [
		fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig }),
		fetch(`${APIRoutes.renderBaseUrl}${apiPath}`, { ...fetchConfig }).then(async response => {
			await wait(100)
			if (!response.ok) throw new Error(response.statusText)
			return response.json()
		}),
	]

	return Promise.any(promiseArray)
		.then(async response => {
			if (!response.ok) {
				throw new Error(response.statusText)
			}

			return response.json()
		})
		.catch(error => {
			console.warn(error.message)
		})
}
