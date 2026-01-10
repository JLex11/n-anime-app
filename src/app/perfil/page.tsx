import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { SkeletonBase } from '@/components/Skeletons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Mi Perfil - One Anime',
}

async function ProfileContent() {
	const user = await getUser()

	if (!user) {
		redirect('/login?redirect=/perfil')
	}

	return (
		<>
			<h1>Mi Perfil</h1>

			<div
				style={{
					background: 'rgba(26, 26, 26, 0.9)',
					padding: '2rem',
					borderRadius: '12px',
					marginTop: '2rem',
				}}
			>
				<div style={{ marginBottom: '1rem' }}>
					<strong>Email:</strong> {user.email}
				</div>
				<div style={{ marginBottom: '1rem' }}>
					<strong>ID:</strong> {user.id}
				</div>
				<div>
					<strong>Registrado:</strong>{' '}
					{new Date(user.created_at).toLocaleDateString('es-ES')}
				</div>
			</div>
		</>
	)
}

function ProfileSkeleton() {
	return (
		<div
			style={{
				background: 'rgba(26, 26, 26, 0.9)',
				padding: '2rem',
				borderRadius: '12px',
				marginTop: '2rem',
			}}
		>
			<SkeletonBase width='150px' height='1.2rem' style={{ marginBottom: '1rem' }} />
			<SkeletonBase width='200px' height='1.2rem' style={{ marginBottom: '1rem' }} />
			<SkeletonBase width='180px' height='1.2rem' />
		</div>
	)
}

export default async function ProfilePage() {
	return (
		<main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
			<Suspense fallback={<ProfileSkeleton />}>
				<ProfileContent />
			</Suspense>
		</main>
	)
}
