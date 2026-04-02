'use client'

import { autoCompleteHotKeys } from '@/enums'
import { Suspense, lazy, startTransition, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

let autocompleteModulePromise: Promise<typeof import('.')> | null = null

const loadAutocompleteModule = () => {
	autocompleteModulePromise ??= import('.')
	return autocompleteModulePromise
}

const Autocomplete = lazy(async () => {
	const mod = await loadAutocompleteModule()
	return { default: mod.Autocomplete }
})

interface Props {
	className?: string
	children?: React.ReactNode
}

export function SearchLauncher({ className: cssClass, children }: Props) {
	const [autocompleteLaunched, setAutocompleteLaunched] = useState(false)
	const isMountedRef = useRef(true)

	useEffect(() => {
		isMountedRef.current = true

		return () => {
			isMountedRef.current = false
		}
	}, [])

	useEffect(() => {
		const preloadAutocomplete = () => {
			void loadAutocompleteModule()
		}
		const scheduleIdlePreload = window.requestIdleCallback

		if (typeof scheduleIdlePreload === 'function') {
			const idleCallbackId = scheduleIdlePreload(preloadAutocomplete)
			return () => window.cancelIdleCallback(idleCallbackId)
		}

		const timeoutId = window.setTimeout(preloadAutocomplete, 250)
		return () => window.clearTimeout(timeoutId)
	}, [])

	const handlePreloadAutocomplete = () => {
		void loadAutocompleteModule()
	}

	const handleOpenAutocomplete = async () => {
		await loadAutocompleteModule()

		if (!isMountedRef.current) return

		startTransition(() => {
			setAutocompleteLaunched(true)
		})
	}

	const handleToggleSearch = async () => {
		if (autocompleteLaunched) {
			setAutocompleteLaunched(false)
			return
		}

		await handleOpenAutocomplete()
	}

	const handleCloseAutocomplete = () => setAutocompleteLaunched(false)

	const hotkeysOptions = {
		preventDefault: true,
		enableOnFormTags: true,
	}

	useHotkeys(autoCompleteHotKeys.LAUNCH, () => void handleToggleSearch(), hotkeysOptions)
	useHotkeys(autoCompleteHotKeys.OUT, handleCloseAutocomplete, hotkeysOptions)

	return (
		<>
			<button
				onClick={() => {
					void handleOpenAutocomplete()
				}}
				onPointerDown={handlePreloadAutocomplete}
				onMouseEnter={handlePreloadAutocomplete}
				onFocus={handlePreloadAutocomplete}
				className={cssClass}
				type='button'
			>
				{children}
			</button>
			{autocompleteLaunched && (
				<Suspense fallback={null}>
					<Autocomplete handleLaunchAutocomplete={setAutocompleteLaunched} />
				</Suspense>
			)}
		</>
	)
}
