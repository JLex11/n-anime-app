'use client'
import { viewHeight } from '@/utils/calculateClientViewport'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'

type Page = {
  name: string
  link: string
}

interface Props {
  pages?: Page[]
}

export default function Header({ pages }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY > viewHeight(80)
      if (s != scrolled) setScrolled(s)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.headerSection}>
          <div className={styles.logo}>
              <Image
                src='/Nika_Logo.svg'
                alt='logo: Nika dios del sol (one piece)'
                width={40}
                height={40}
              />
          </div>
          <nav className={styles.headerNav}>
            <ul className={styles.pages}>
              {pages && pages.map(page => (
                <li key={page.link}>
                  <Link href={page.link}>{page.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}