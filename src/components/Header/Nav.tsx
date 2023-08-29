'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Page } from '.'
import styles from './Header.module.css'

interface NavProps {
  pages?: Page[]
}

export const Nav = ({ pages }: NavProps) => {
  const pathname = usePathname()
  const paths = pathname.split('/')

  return (
    <nav className={styles.headerNav}>
      <ul className={styles.pages}>
        {pages &&
          pages.map(page => {
            const activePage = paths.some(path => page.link.includes(path) && path !== '') || page.link === pathname
            const pageClass = clsx(styles.pageItem, activePage && styles.active)

            return (
              <li key={page.link}>
                <Link href={page.link} className={pageClass}>
                  {page.name}
                </Link>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
