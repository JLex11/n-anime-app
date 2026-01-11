'use client'

import LoadingIcon from '@/components/Icons/LoadingIcon'
import styles from './Comments.module.css'

interface Props {
	onClick: () => void
	isLoading: boolean
	label: string
}

export function LoadMoreButton({ onClick, isLoading, label }: Props) {
	return (
		<div className={styles.loadMoreContainer}>
			<button
				onClick={onClick}
				disabled={isLoading}
				className={styles.loadMoreButton}
				type="button"
			>
				{isLoading ? (
					<>
						<LoadingIcon width={16} />
						<span>Cargando...</span>
					</>
				) : (
					label
				)}
			</button>
		</div>
	)
}
