import { CardGridSkeleton, SkeletonBase } from '@/components/Skeletons'
import styles from '@/components/Profile/Profile.module.css'

export default function ProfileLoading() {
	return (
		<main className={styles.main} aria-busy='true'>
			<SkeletonBase width='180px' height='2.2rem' style={{ marginBottom: '0.5rem' }} />

			<section className={styles.section}>
				<SkeletonBase width='200px' height='1.5rem' style={{ marginBottom: '1.5rem' }} />
				<div
					style={{
						background: 'rgba(26, 26, 26, 0.9)',
						padding: '2rem',
						borderRadius: '12px',
					}}
				>
					<SkeletonBase width='200px' height='1.2rem' style={{ marginBottom: '1rem' }} />
					<SkeletonBase width='150px' height='1.2rem' style={{ marginBottom: '1rem' }} />
					<SkeletonBase width='180px' height='1.2rem' />
				</div>
			</section>

			<section className={styles.section}>
				<SkeletonBase width='200px' height='1.5rem' style={{ marginBottom: '1.5rem' }} />
				{['continue-1', 'continue-2', 'continue-3'].map(itemKey => (
					<div
						key={itemKey}
						style={{
							background: 'rgba(26, 26, 26, 0.9)',
							padding: '1.5rem',
							borderRadius: '8px',
							marginBottom: '1rem',
						}}
					>
						<SkeletonBase width='60%' height='1.2rem' style={{ marginBottom: '1rem' }} />
						<SkeletonBase width='100%' height='6px' style={{ marginTop: '1rem' }} />
					</div>
				))}
			</section>

			<section className={styles.section}>
				<SkeletonBase width='200px' height='1.5rem' style={{ marginBottom: '1.5rem' }} />
				<CardGridSkeleton count={4} width='14rem' height='250px' />
			</section>

			<section className={styles.section}>
				<SkeletonBase width='200px' height='1.5rem' style={{ marginBottom: '1.5rem' }} />
				{['comment-1', 'comment-2', 'comment-3'].map(itemKey => (
					<SkeletonBase key={itemKey} height='150px' style={{ marginBottom: '1.5rem', borderRadius: '12px' }} />
				))}
			</section>
		</main>
	)
}
