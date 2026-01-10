import { SkeletonBase } from '../Skeletons'
import styles from './Auth.module.css'

export function AuthSkeleton() {
	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
				<SkeletonBase width='150px' height='2rem' style={{ margin: '0 auto 1.5rem auto' }} />

				<div className={styles.oauthButtons}>
					<SkeletonBase height='2.8rem' style={{ borderRadius: '8px' }} />
					<SkeletonBase height='2.8rem' style={{ borderRadius: '8px' }} />
				</div>

				<div className={styles.divider}>
					<SkeletonBase width='120px' height='0.875rem' style={{ margin: '0 auto' }} />
				</div>

				<div className={styles.form}>
					<div className={styles.inputGroup}>
						<SkeletonBase width='80px' height='0.9rem' />
						<SkeletonBase height='2.8rem' style={{ borderRadius: '8px' }} />
					</div>
					<div className={styles.inputGroup}>
						<SkeletonBase width='80px' height='0.9rem' />
						<SkeletonBase height='2.8rem' style={{ borderRadius: '8px' }} />
					</div>
					<SkeletonBase height='3rem' style={{ borderRadius: '8px', marginTop: '0.5rem' }} />
				</div>

				<div className={styles.footer}>
					<SkeletonBase width='180px' height='0.9rem' style={{ margin: '0 auto' }} />
				</div>
			</div>
		</div>
	)
}
