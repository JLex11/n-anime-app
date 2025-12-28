import { SkeletonBase } from './SkeletonBase'
import styles from './CarouselHeroSkeleton.module.css'

export function CarouselHeroSkeleton() {
	return (
		<div className={styles.container}>
			<div className={styles.carouselArea}>
				<SkeletonBase height='100%' />
			</div>
			<div className={styles.navigation}>
				{Array.from({ length: 5 }).map((_, i) => (
					<SkeletonBase key={i} variant='circle' width='3.3rem' height='3.9rem' />
				))}
			</div>
		</div>
	)
}
