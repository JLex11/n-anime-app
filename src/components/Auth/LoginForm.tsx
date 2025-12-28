'use client'

import { signIn, signInWithOAuth } from '@/app/actions/auth'
import { OAuthButtons } from './OAuthButtons'
import styles from './Auth.module.css'
import { useActionState } from 'react'
import Link from 'next/link'

interface Props {
	redirectTo?: string
}

export function LoginForm({ redirectTo }: Props) {
	const [state, formAction, isPending] = useActionState(signIn, null)

	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
				<h1 className={styles.title}>Iniciar Sesión</h1>

				<OAuthButtons onOAuth={signInWithOAuth} disabled={isPending} />

				<div className={styles.divider}>
					<span>o continúa con email</span>
				</div>

				<form action={formAction} className={styles.form}>
					{redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

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
							autoComplete="current-password"
							disabled={isPending}
						/>
					</div>

					{state?.error && <div className={styles.error}>{state.error}</div>}

					<button
						type="submit"
						className={styles.submitButton}
						disabled={isPending}
					>
						{isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
					</button>
				</form>

				<p className={styles.footer}>
					¿No tienes cuenta? <Link href="/register">Regístrate aquí</Link>
				</p>
			</div>
		</div>
	)
}
