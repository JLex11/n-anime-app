'use client'

import { signUp, signInWithOAuth } from '@/app/actions/auth'
import { OAuthButtons } from './OAuthButtons'
import styles from './Auth.module.css'
import { useState, useTransition } from 'react'
import Link from 'next/link'

export function RegisterForm() {
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async (formData: FormData) => {
		setError(null)
		startTransition(async () => {
			const result = await signUp(formData)
			if (result?.error) {
				setError(result.error)
			}
		})
	}

	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
				<h1 className={styles.title}>Crear Cuenta</h1>

				<OAuthButtons onOAuth={signInWithOAuth} disabled={isPending} />

				<div className={styles.divider}>
					<span>o regístrate con email</span>
				</div>

				<form action={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor="email">Correo electrónico</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							autoComplete="email"
							disabled={isPending}
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor="password">Contraseña</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="new-password"
							minLength={6}
							disabled={isPending}
						/>
					</div>

					{error && <div className={styles.error}>{error}</div>}

					<button
						type="submit"
						className={styles.submitButton}
						disabled={isPending}
					>
						{isPending ? 'Creando cuenta...' : 'Crear cuenta'}
					</button>
				</form>

				<p className={styles.footer}>
					¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
				</p>
			</div>
		</div>
	)
}
