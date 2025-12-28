import { autoCompleteHotKeys } from '@/enums'
import { SearchLauncher } from '../Autocomplete/SearchLauncher'
import { ShortcutLetter } from '../Common/ShortcutLetter'
import { UserMenu } from '../Auth/UserMenu'
import styles from './Header.module.css'
import { Suspense } from 'react'
import UserIcon from '../Icons/UserIcon'

export const Tools = () => {
	return (
		<div className={styles.tools}>
			<SearchLauncher className={styles.searchButton}>
				<span>Buscar</span>
				<ShortcutLetter letters={autoCompleteHotKeys.LAUNCH} />
			</SearchLauncher>
			<Suspense fallback={<UserIcon />}>
				<UserMenu />
			</Suspense>
		</div>
	)
}
