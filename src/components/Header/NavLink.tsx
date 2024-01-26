'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Page } from '.'
import styles from './Header.module.css'

interface NavLinkProps {
  page: Page
}

export function NavLink({ page }: NavLinkProps) {
  const pathname = usePathname()

  const activePage = page.link === pathname
  const linkClass = clsx(styles.pageItem, activePage && styles.active)

  return (
    <Link href={page.link} className={linkClass}>
      {page.name}
    </Link>
  )
}
