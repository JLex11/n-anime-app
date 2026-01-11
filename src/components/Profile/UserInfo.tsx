import type { User } from '@supabase/supabase-js'

interface UserInfoProps {
	user: User
}

export function UserInfo({ user }: UserInfoProps) {
	return (
		<div
			style={{
				background: 'rgba(26, 26, 26, 0.9)',
				padding: '2rem',
				borderRadius: '12px',
				marginBottom: '2rem',
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
	)
}
