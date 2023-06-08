import styles from '@/styles/Header.module.css'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Page } from './Header'

interface CSSProperties extends React.CSSProperties {
  '--indicator-top'?: string
  '--indicator-left'?: string
  '--indicator-width'?: string
  '--indicator-height'?: string
}

interface handleActiveProps {
  top: number
  left: number
  width: number
  height: number
}

export const Nav = ({ pages }: { pages: Page[] }) => {
  const [indicatorProps, setIndicatorProps] = useState<CSSProperties>({
    '--indicator-left': '0px',
    '--indicator-width': '0px',
    '--indicator-height': '0px',
  })

  const activePageRef = useRef<HTMLLIElement | null>(null)
  const pathname = usePathname()

  const handleActivePage = ({ top, left, width, height }: handleActiveProps) => {
    setIndicatorProps({
      '--indicator-top': `${top}px`,
      '--indicator-left': `${left}px`,
      '--indicator-width': `${width}px`,
      '--indicator-height': `${height}px`,
    })
  }

  useEffect(() => {
    const activePage = activePageRef.current
    if (!activePage) return

    const { top, left, width, height } = activePage.getBoundingClientRect()
    handleActivePage({ top, left, width, height })
  }, [activePageRef, pathname])

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement
    const { top, left, width, height } = target.getBoundingClientRect()

    handleActivePage({ top, left, width, height })
  }

  const handleMouseLeave = () => {
    const activePage = activePageRef.current
    if (!activePage) return

    const { top, left, width, height } = activePage.getBoundingClientRect()
    handleActivePage({ top, left, width, height })
  }

  return (
    <nav className={styles.headerNav} style={indicatorProps}>
      <ul className={styles.pages} onMouseLeave={handleMouseLeave}>
        {pages?.map(page => {
          const activePage = pathname.includes(page.link) || (page.link === '/' && pathname === '/')
          const pageClass = clsx(styles.pageItem, activePage && styles.active)

          return (
            <li key={page.link} className={pageClass} onMouseEnter={handleMouseEnter} ref={activePage ? activePageRef : null}>
              <Link href={page.link}>{page.name}</Link>
            </li>
          )
        })}
      </ul>
      <div className={styles.hoverIndicator}></div>
    </nav>
  )
}
