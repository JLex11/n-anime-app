import { getUser } from '@/app/actions/auth'
import { LoginForm } from '@/components/Auth/LoginForm'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthSkeleton } from '@/components/Auth/AuthSkeleton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Iniciar Sesión - One Anime',
	description:
		'Inicia sesión para guardar tus animes favoritos y continuar viendo',
}

interface PageProps {
	searchParams: Promise<{ redirect?: string }>
}

async function LoginContent({ searchParams }: PageProps) {
	const user = await getUser()

	if (user) {
		redirect('/')
	}

	const { redirect: redirectTo } = await searchParams

	return <LoginForm redirectTo={redirectTo} />
}

export default async function LoginPage({ searchParams }: PageProps) {
	return (
		<main
			style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '2rem',
			}}
		>
			<Suspense fallback={<AuthSkeleton />}>
				<LoginContent searchParams={searchParams} />
			</Suspense>
		</main>
	)
}
