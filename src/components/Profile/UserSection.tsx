import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { UserInfo } from './UserInfo'

interface Props {
	user?: User
}

export function UserSection({ user }: Props) {
	if (user) {
		return <UserInfo user={user} />
	}

	return <UserSectionContent />
}

async function UserSectionContent() {
	const user = await getUser()

	if (!user) {
		redirect('/login?redirect=/perfil')
	}

	return <UserInfo user={user as User} />
}
