'use client'

import { useCallback } from 'react'
import { flushSync } from 'react-dom'

/**
 * Hook to use the View Transitions API safely.
 */
export function useViewTransition() {
	const startTransition = useCallback((callback: () => void) => {
		if (!document.startViewTransition) {
			callback()
			return
		}

		document.startViewTransition(() => {
			flushSync(() => {
				callback()
			})
		})
	}, [])

	return { startTransition }
}
