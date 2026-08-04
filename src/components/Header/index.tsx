import { APP_ROUTES } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import styles from './Header.module.css'
import { HeaderWrapper } from './HeaderWrapper'
import { Nav } from './Nav'
import { Tools } from './Tools'
import type { Page } from './types'

interface Props {
	pages?: Page[]
}

function NavFallback({ pages }: { pages: Page[] }) {
	return (
		<nav className={styles.headerNav}>
			<ul className={styles.pages}>
				{pages.map(page => (
					<li key={page.link}>
						<Link href={page.link} className={styles.pageItem}>
							{page.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export function Header({ pages = APP_ROUTES }: Props) {
	return (
		<HeaderWrapper>
			<div className={styles.headerContainer}>
				<div className={styles.headerSection}>
					<div className={styles.logo}>
						<Image
							src='/Nika_Logo.svg'
							alt='logo: Nika dios del sol (one piece)'
							width={40}
							height={40}
							priority={true}
							loading='eager'
						/>
					</div>
					<Suspense fallback={<NavFallback pages={pages} />}>
						<Nav pages={pages} />
					</Suspense>
					<Tools />
				</div>
			</div>
		</HeaderWrapper>
	)
}
