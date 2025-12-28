import { getUser } from '@/app/actions/auth'
import { RegisterForm } from '@/components/Auth/RegisterForm'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Registrarse - One Anime',
	description: 'Crea una cuenta para guardar tus animes favoritos',
}

export default async function RegisterPage() {
	const user = await getUser()

	if (user) {
		redirect('/')
	}

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
			<RegisterForm />
		</main>
	)
}
