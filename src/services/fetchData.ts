import { APIRoutes } from '@/enums'
import { cache } from 'react'

interface NextFetchInit extends RequestInit {
	next?: Record<string, unknown>
}

type FetchData = <T>(apiPath: string, fetchConfig?: NextFetchInit) => Promise<T | undefined>

export const fetchData: FetchData = async (apiPath, fetchConfig) => {
	if (!apiPath) throw new Error('apiPath is required')

	const url = `${APIRoutes.vercelBaseUrl}${apiPath}`
	const maxRetries = 3
	const retryDelay = 1000 // ms - Incrementado para dar tiempo a cold starts de Vercel

	const fetchWithRetry = async (attempt = 1): Promise<Response> => {
		try {
			const response = await fetch(url, {
				...fetchConfig,
				headers: {
					'Content-Type': 'application/json',
					...fetchConfig?.headers,
				},
			})

			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return response
		} catch (error) {
			if (attempt < maxRetries) {
				console.warn(`Retry ${attempt}/${maxRetries} for ${apiPath}:`, (error as Error).message)
				// Esperar un poco antes de reintentar
				await new Promise(resolve => setTimeout(resolve, retryDelay * attempt))
				return fetchWithRetry(attempt + 1)
			}
			throw error
		}
	}

	const fetchWithDeduping = cache(() => fetchWithRetry())

	try {
		const response = await fetchWithDeduping()
		return response.json()
	} catch (error) {
		console.error(`Failed to fetch ${apiPath} after ${maxRetries} attempts:`, error)
		return undefined
	}
}
