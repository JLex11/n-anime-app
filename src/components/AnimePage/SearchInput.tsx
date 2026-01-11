'use client'

import { useDebounce } from '@/hooks/useDebounce'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './Anime.module.css'

interface InputProps {
	query: string
}

export function SearchInput({ query }: InputProps) {
	const router = useRouter()
	const [localValue, setLocalValue] = useState(query || '')
	const debouncedValue = useDebounce(localValue, 300)

	useEffect(() => {
		if (!debouncedValue) return

		const params = new URLSearchParams(window.location.search)
		params.set('query', debouncedValue)
		router.replace(`?${params.toString()}`)
	}, [debouncedValue, router])

	const inputContainerClass = clsx(styles.inputContainer, localValue.length > 0 && styles.active)

	return (
		<div className={inputContainerClass}>
			<input
				key={query}
				className={styles.inputSearch}
				type='search'
				defaultValue={query || ''}
				onChange={(e) => setLocalValue(e.target.value)}
			/>
		</div>
	)
}
