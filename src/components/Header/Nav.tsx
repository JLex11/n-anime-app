import { Page } from '.'
import styles from './Header.module.css'
import { NavLink } from './NavLink'

interface NavProps {
  pages: Page[]
}

export function Nav({ pages }: NavProps) {
  return (
    <nav className={styles.headerNav}>
      <ul className={styles.pages}>
        {pages?.map(page => (
          <li key={page.link}>
            <NavLink page={page} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
