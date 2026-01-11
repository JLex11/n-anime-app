'use client'

import { updateWatchProgress } from '@/app/actions/watch-progress'
import { useEffect, useRef, useState } from 'react'

interface WatchProgressTrackerProps {
	animeId: string
	episodeNumber: number
	initialProgressSeconds?: number
}

const HEARTBEAT_INTERVAL = 30000 // 30 seconds
const ESTIMATED_DURATION = 24 * 60 // 24 minutes in seconds

export function WatchProgressTracker({
	animeId,
	episodeNumber,
	initialProgressSeconds = 0,
}: WatchProgressTrackerProps) {
	// Ref to store the current progress so we can update it in the interval
	const currentProgressRef = useRef(initialProgressSeconds)
	// State to track if the user has interacted with the iframe (clicked play)
	const [hasStarted, setHasStarted] = useState(false)

	useEffect(() => {
		// Update ref if prop changes (e.g. navigation)
		currentProgressRef.current = initialProgressSeconds
	}, [initialProgressSeconds])

	// Listener for focus loss (iframe click detection)
	useEffect(() => {
		const handleBlur = () => {
			// If the active element is an iframe, assume user clicked it
			if (document.activeElement instanceof HTMLIFrameElement) {
				setHasStarted(true)
			}
		}

		window.addEventListener('blur', handleBlur)
		return () => window.removeEventListener('blur', handleBlur)
	}, [])

	useEffect(() => {
		if (!hasStarted) return

		const episodeId = `${animeId}-${episodeNumber}`

		const interval = setInterval(async () => {
			// Increment progress by the interval time (in seconds)
			currentProgressRef.current += HEARTBEAT_INTERVAL / 1000

			// Cap at estimated duration to avoid weird data (>100%)
			if (currentProgressRef.current > ESTIMATED_DURATION) {
				currentProgressRef.current = ESTIMATED_DURATION
			}

			await updateWatchProgress(
				animeId,
				episodeNumber,
				episodeId,
				currentProgressRef.current,
				ESTIMATED_DURATION
			)
		}, HEARTBEAT_INTERVAL)

		return () => clearInterval(interval)
	}, [animeId, episodeNumber, hasStarted])

	return null
}
