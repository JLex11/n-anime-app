'use client'

import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useTransition } from 'react'
import LoadingIcon from '../Icons/LoadingIcon'
import styles from './EpisodeList.module.css'

export const ButtonMore = ({ limit }: { limit: number }) => {
	const [isPending, startTransition] = useTransition()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => router.prefetch(`?limit=${limit}`), [limit, router])

	useEffect(() => {
		const { current: button } = buttonRef
		return () => {
			if (searchParams.has('limit') || isPending) button?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [isPending, searchParams])

	const handleClick = () => {
		startTransition(() => {
			router.replace(`?limit=${limit}`, { scroll: false })
		})
	}

	const buttonClass = clsx(styles.listItem, styles.buttonMore, isPending && styles.loadingMore)

	return (
		<li>
			<button className={buttonClass} onClick={handleClick} ref={buttonRef} type='button'>
				{isPending ? (
					<div className='page-loader'>
						<LoadingIcon />
					</div>
				) : (
					<span>Cargar mas</span>
				)}
			</button>
		</li>
	)
}
