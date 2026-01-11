import { Suspense } from 'react'
import type { Metadata } from 'next'
import { UserSection } from '@/components/Profile/UserSection'
import { ContinueWatchingSection } from '@/components/Profile/ContinueWatchingSection'
import { FavoritesSection } from '@/components/Profile/FavoritesSection'
import { SkeletonBase, CardGridSkeleton } from '@/components/Skeletons'
import styles from '@/components/Profile/Profile.module.css'

export const metadata: Metadata = {
	title: 'Mi Perfil - One Anime',
}

function UserSectionSkeleton() {
	return (
		<div
			style={{
				background: 'rgba(26, 26, 26, 0.9)',
				padding: '2rem',
				borderRadius: '12px',
				marginBottom: '2rem',
			}}
		>
			<SkeletonBase width='200px' height='1.2rem' style={{ marginBottom: '1rem' }} />
			<SkeletonBase width='150px' height='1.2rem' style={{ marginBottom: '1rem' }} />
			<SkeletonBase width='180px' height='1.2rem' />
		</div>
	)
}

function ContinueWatchingSkeleton() {
	return (
		<div style={{ marginBottom: '3rem' }}>
			<SkeletonBase width='200px' height='1.5rem' style={{ marginBottom: '1.5rem' }} />
			{Array.from({ length: 3 }).map((_, i) => (
				<div
					key={i}
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
		</div>
	)
}

function FavoritesSkeleton() {
	return (
		<div>
			<SkeletonBase width='200px' height='1.5rem' style={{ marginBottom: '1.5rem' }} />
			<CardGridSkeleton count={4} width='14rem' height='250px' />
		</div>
	)
}

export default function ProfilePage() {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Mi Perfil</h1>

			<Suspense fallback={<UserSectionSkeleton />}>
				<UserSection />
			</Suspense>

			<Suspense fallback={<ContinueWatchingSkeleton />}>
				<ContinueWatchingSection />
			</Suspense>

			<Suspense fallback={<FavoritesSkeleton />}>
				<FavoritesSection />
			</Suspense>
		</main>
	)
}
