import styles from './Header.module.css'
import { NavLink } from './NavLink'
import type { Page } from './types'

interface NavProps {
	pages: Page[]
}

export function Nav({ pages }: NavProps) {
	return (
		<nav className={styles.headerNav}>
			{pages && (
				<ul className={styles.pages}>
					{pages.map(page => (
						<li key={page.link}>
							<NavLink page={page} />
						</li>
					))}
				</ul>
			)}
		</nav>
	)
}
