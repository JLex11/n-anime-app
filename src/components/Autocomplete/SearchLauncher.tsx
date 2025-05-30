'use client'

import { autoCompleteHotKeys } from '@/enums'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const Autocomplete = dynamic(() => import('.').then(mod => mod.Autocomplete))

interface Props {
	className?: string
	children?: React.ReactNode
}

export function SearchLauncher({ className: cssClass, children }: Props) {
	const [autocompleteLaunched, setAutocompleteLaunched] = useState(false)

	const handleToggleSearch = () => {
		console.log('handleToggleSearch')
		setAutocompleteLaunched(!autocompleteLaunched)
	}
	const handleCloseAutocomplete = () => setAutocompleteLaunched(false)

	const hotkeysOptions = {
		preventDefault: true,
		enableOnFormTags: true,
	}

	useHotkeys(autoCompleteHotKeys.LAUNCH, handleToggleSearch, hotkeysOptions)
	useHotkeys(autoCompleteHotKeys.OUT, handleCloseAutocomplete, hotkeysOptions)

	return (
		<>
			<button onClick={() => setAutocompleteLaunched(true)} className={cssClass} type='button'>
				{children}
			</button>
			{autocompleteLaunched && <Autocomplete handleLaunchAutocomplete={setAutocompleteLaunched} />}
		</>
	)
}
