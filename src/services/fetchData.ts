import { getAnimeApiBaseUrl } from '@/constants'
import { cache } from 'react'

interface NextFetchInit extends RequestInit {
	next?: Record<string, unknown>
}

type FetchData = <T>(apiPath: string, fetchConfig?: NextFetchInit) => Promise<T | undefined>

function getFetchRuntimeConfig() {
	const isBuildPhase =
		process.env.NEXT_PHASE === 'phase-production-build' ||
		process.env.npm_lifecycle_event === 'build'

	return {
		maxRetries: isBuildPhase ? 1 : 3,
		retryDelayMs: isBuildPhase ? 250 : 1000,
		timeoutMs: isBuildPhase ? 4000 : 8000,
	}
}

export const fetchData: FetchData = async (apiPath, fetchConfig) => {
	if (!apiPath) throw new Error('apiPath is required')

	const { maxRetries, retryDelayMs, timeoutMs } = getFetchRuntimeConfig()
	const url = `${getAnimeApiBaseUrl()}${apiPath}`

	const fetchWithRetry = async (attempt = 1): Promise<Response> => {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

		try {
			const response = await fetch(url, {
				...fetchConfig,
				signal: fetchConfig?.signal || controller.signal,
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
				await new Promise(resolve => setTimeout(resolve, retryDelayMs * attempt))
				return fetchWithRetry(attempt + 1)
			}
			throw error
		} finally {
			clearTimeout(timeoutId)
		}
	}

	const fetchWithDeduping = cache(() => fetchWithRetry())

	try {
		const response = await fetchWithDeduping()
		return response.json()
	} catch (error) {
		console.warn(`Failed to fetch ${apiPath} after ${maxRetries} attempts:`, error)
		return undefined
	}
}
