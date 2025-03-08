import type { EpisodeVideo } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import AdsIcon from '../Icons/AdsIcon'
import styles from './VideoSection.module.css'

interface VideoNavItemProps {
	iframe: EpisodeVideo
	handleMouseEnter: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
	changeIframe: () => void
	isActive: boolean
	activeIframeRef: React.MutableRefObject<HTMLLIElement | null> | null
}

export const VideoNavItem = ({
	iframe,
	handleMouseEnter,
	changeIframe,
	isActive,
	activeIframeRef,
}: VideoNavItemProps) => {
	const NavItemClass = clsx(styles.iframeOption, isActive && styles.iframeOptionActive)

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<li className={NavItemClass} onMouseEnter={handleMouseEnter} onClick={changeIframe} ref={activeIframeRef}>
			<Link href={iframe.code} target='episode-iframe-video'>
				<span>{iframe.title}</span>
			</Link>
			{Boolean(iframe.ads) && (
				<span className={styles.adIcon}>
					<AdsIcon width={18} />
				</span>
			)}
		</li>
	)
}
