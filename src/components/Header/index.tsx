import Image from 'next/image'
import styles from './Header.module.css'
import { HeaderWrapper } from './HeaderWrapper'
import { Nav } from './Nav'
import { Tools } from './Tools'

export type Page = {
  name: string
  link: string
}

interface Props {
  pages?: Page[]
}

export function Header({ pages }: Props) {
  return (
    <HeaderWrapper>
      <div className={styles.headerContainer}>
        <div className={styles.headerSection}>
          <div className={styles.logo}>
            <Image src='/Nika_Logo.svg' alt='logo: Nika dios del sol (one piece)' width={40} height={40} priority={true} />
          </div>
          {pages && <Nav pages={pages} />}
          <Tools />
        </div>
      </div>
    </HeaderWrapper>
  )
}
