import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { UserInfo } from './UserInfo'

export async function UserSection() {
	const user = await getUser()

	if (!user) {
		redirect('/login?redirect=/perfil')
	}

	return <UserInfo user={user} />
}
