import { APIRoutes } from '@/enums'
import { cache } from 'react'

interface NextFetchInit extends RequestInit {
	next?: Record<string, unknown>
}

type FetchData = <T>(apiPath: string, fetchConfig?: NextFetchInit) => Promise<T | undefined>

export const fetchData: FetchData = async (apiPath, fetchConfig) => {
	if (!apiPath) throw new Error('apiPath is required')

	const fetchWithDeduping = cache(() => fetch(`${APIRoutes.vercelBaseUrl}${apiPath}`, { ...fetchConfig }))

	const promiseArray = [fetchWithDeduping()]

	return Promise.any(promiseArray).then(async response => {
		if (!response.ok) {
			throw new Error(response.statusText)
		}

		return response.json()
	})
}
