import { getUser } from '@/app/actions/auth'
import { RegisterForm } from '@/components/Auth/RegisterForm'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Registrarse - One Anime',
	description: 'Crea una cuenta para guardar tus animes favoritos',
}

async function RegisterContent() {
	const user = await getUser()

	if (user) {
		redirect('/')
	}

	return <RegisterForm />
}

export default async function RegisterPage() {
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
			<Suspense fallback={<div>Cargando...</div>}>
				<RegisterContent />
			</Suspense>
		</main>
	)
}
