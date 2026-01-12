import { getUser } from '@/app/actions/auth'
import { UserMenuClient } from './UserMenuClient'
import Link from 'next/link'
import UserIcon from '../Icons/UserIcon'

export async function UserMenu() {
	const user = await getUser()

	if (!user) {
		return (
			<Link
				href="/login"
				style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textWrap: 'nowrap' }}
			>
				<UserIcon />
				<span>Iniciar sesión</span>
			</Link>
		)
	}

	return <UserMenuClient user={user} />
}
