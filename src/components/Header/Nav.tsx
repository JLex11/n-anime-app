import styles from '@/styles/Header.module.css'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { Page } from './Header'

const Nav = ({ pages }: { pages: Page[] }) => {
  const pathname = usePathname()

  return (
    <nav className={styles.headerNav}>
      <ul className={styles.pages}>
        {pages?.map(page => {
          const pageClass = clsx(styles.pageItem, pathname === page.link && styles.active)

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

export default memo(Nav, (prevProps, nextProps) => prevProps.pages === nextProps.pages)
