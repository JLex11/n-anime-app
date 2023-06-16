import styles from '@/styles/Header.module.css'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Page } from './Header'

interface NavProps {
  pages?: Page[]
}

export const Nav = ({ pages }: NavProps) => {
  const pathname = usePathname()
  const paths = pathname.split('/')

  return (
    <nav className={styles.headerNav}>
      <ul className={styles.pages}>
        {pages?.map(page => {
          const activePage = paths.some(path => page.link.includes(path) && path !== '') || page.link === pathname
          const pageClass = clsx(styles.pageItem, activePage && styles.active)

          return (
            <li key={page.link} className={pageClass}>
              <Link href={page.link}>{page.name}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
