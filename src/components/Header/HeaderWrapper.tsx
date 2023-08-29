'use client'

import { useScrolled } from '@/hooks/useScrolled'
import clsx from 'clsx'
import styles from './Header.module.css'

export type Page = {
  name: string
  link: string
}

interface Props {
  children: React.ReactNode
}

export const HeaderWrapper = ({ children }: Props) => {
  const scrolled = useScrolled(10)
  const headerClass = clsx(styles.header, scrolled && styles.scrolled)

  return <header className={headerClass}>{children}</header>
}
