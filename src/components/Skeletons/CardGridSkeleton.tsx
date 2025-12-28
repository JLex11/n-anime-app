import { SkeletonBase } from './SkeletonBase'
import styles from './CardGridSkeleton.module.css'

interface CardGridSkeletonProps {
	count?: number
	width?: string
	height?: string
	hasPill?: boolean
}

export function CardGridSkeleton({
	count = 20,
	width = '230px',
	height = '190px',
	hasPill = false
}: CardGridSkeletonProps) {
	return (
		<div
			className={styles.grid}
			style={
				{
					'--card-width': width,
					'--card-height': height
				} as React.CSSProperties
			}
		>
			{Array.from({ length: count }).map((_, i) => (
				<article key={i} className={styles.card}>
					<div className={styles.cardInner}>
						<div className={styles.content}>
							{hasPill && <SkeletonBase variant='text' className={styles.pill} />}
							<SkeletonBase variant='text' className={styles.title} />
						</div>
					</div>
				</article>
			))}
		</div>
	)
}
