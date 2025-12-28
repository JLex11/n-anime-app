import { getUser } from '@/app/actions/auth'
import { LoginForm } from '@/components/Auth/LoginForm'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Iniciar Sesión - One Anime',
	description:
		'Inicia sesión para guardar tus animes favoritos y continuar viendo',
}

interface PageProps {
	searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: PageProps) {
	const user = await getUser()

	if (user) {
		redirect('/')
	}

	const { redirect: redirectTo } = await searchParams

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
			<LoginForm redirectTo={redirectTo} />
		</main>
	)
}
