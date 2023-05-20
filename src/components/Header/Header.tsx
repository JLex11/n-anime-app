'use client'
import { useScrolled } from '@/hooks/useScrolled'
import styles from '@/styles/Header.module.css'
import clsx from 'clsx'
import Image from 'next/image'
import Nav from './Nav'
import Tools from './Tools'

export type Page = {
  name: string
  link: string
}

interface Props {
  pages?: Page[]
}

export default function Header({ pages }: Props) {
  const scrolled = useScrolled(20)

  const headerClass = clsx(styles.header, scrolled && styles.scrolled)

  return (
    <header className={headerClass}>
      <div className={styles.headerContainer}>
        <div className={styles.headerSection}>
          <div className={styles.logo}>
            <Image src='/Nika_Logo.svg' alt='logo: Nika dios del sol (one piece)' width={40} height={40} priority={true} />
          </div>
          {pages && <Nav pages={pages} />}
          <Tools />
        </div>
      </div>
    </header>
  )
}
