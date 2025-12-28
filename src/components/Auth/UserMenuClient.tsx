'use client'

import { signOut } from '@/app/actions/auth'
import { useState, useRef, useEffect } from 'react'
import UserIcon from '../Icons/UserIcon'
import Link from 'next/link'
import styles from './Auth.module.css'
import type { User } from '@supabase/supabase-js'

interface Props {
	user: User
}

export function UserMenuClient({ user }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleSignOut = async () => {
		await signOut()
	}

	return (
		<div className={styles.userMenuContainer} ref={menuRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={styles.userMenuButton}
				aria-label="Menú de usuario"
				type="button"
			>
				<UserIcon />
				<span>{user.email?.split('@')[0]}</span>
			</button>

			{isOpen && (
				<div className={styles.userMenuDropdown}>
					<div className={styles.userMenuHeader}>
						<span>{user.email}</span>
					</div>

					<div className={styles.userMenuLinks}>
						<Link href="/perfil" onClick={() => setIsOpen(false)}>
							Mi Perfil
						</Link>
						<Link href="/favoritos" onClick={() => setIsOpen(false)}>
							Mis Favoritos
						</Link>
						<Link href="/mi-lista" onClick={() => setIsOpen(false)}>
							Continuar Viendo
						</Link>
					</div>

					<div className={styles.userMenuFooter}>
						<button onClick={handleSignOut} type="button">
							Cerrar Sesión
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
