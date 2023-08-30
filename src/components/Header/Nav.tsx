'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Page } from '.'
import styles from './Header.module.css'

interface NavProps {
  pages?: Page[]
}

export function Nav({ pages }: NavProps) {
  const pathname = usePathname()
  const paths = pathname.split('/')

  const createPageClass = (page: Page) => {
    const activePage = paths.some(path => page.link.includes(path) && path !== '') || page.link === pathname
    return clsx(styles.pageItem, activePage && styles.active)
  }

  return (
    <nav className={styles.headerNav}>
      <ul className={styles.pages}>
        {pages?.map(page => (
          <li key={page.link}>
            <Link href={page.link} className={createPageClass(page)}>
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
