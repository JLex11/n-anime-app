import type { EpisodeVideo } from '@/types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { VideoNavItem } from './VideoNavItem'
import styles from './VideoSection.module.css'

interface CSSProps extends React.CSSProperties {
	'--indicator-left'?: `${number}px`
	'--indicator-width'?: `${number}px`
	'--indicator-height'?: `${number}px`
}

interface handleActiveProps {
	left: number
	width: number
	height: number
}

interface VideoNavProps {
	currentIframesData: EpisodeVideo[]
}

export function VideoNav({ currentIframesData }: VideoNavProps) {
	const [activeIframeOption, setActiveIframeOption] = useState<EpisodeVideo['server'] | undefined>(
		currentIframesData?.[0]?.server
	)
	const [indicatorProps, setIndicatorProps] = useState<CSSProps>({})

	const activeIframeRef = useRef<HTMLLIElement | null>(null)

	const handleActiveIframe = useCallback(({ left, width, height }: handleActiveProps) => {
		setIndicatorProps({
			'--indicator-left': `${left}px`,
			'--indicator-width': `${width}px`,
			'--indicator-height': `${height}px`,
		})
	}, [])

	const setActiveDimensions = useCallback(
		(element: HTMLElement) => {
			const { offsetWidth: width, offsetHeight: height, offsetLeft: left } = element
			handleActiveIframe({ left, width, height })
		},
		[handleActiveIframe]
	)

	useEffect(() => {
		if (activeIframeRef.current) setActiveDimensions(activeIframeRef.current)
	}, [setActiveDimensions])

	const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const target = e.currentTarget as HTMLLIElement
		setActiveDimensions(target)
	}

	const handleMouseLeave = useCallback(() => {
		if (activeIframeRef.current) setActiveDimensions(activeIframeRef.current)
	}, [setActiveDimensions])

	const uniqueIframesData = useMemo(
		() => currentIframesData.filter((iframe, index, self) => index === self.findIndex(i => i.code === iframe.code)),
		[currentIframesData]
	)

	return (
		<nav className={styles.iframeNav} style={indicatorProps}>
			{uniqueIframesData && (
				<ul className={styles.iframeNavOptions} onMouseLeave={handleMouseLeave}>
					{uniqueIframesData.map(iframe => (
						<VideoNavItem
							key={iframe.code}
							iframe={iframe}
							handleMouseEnter={handleMouseEnter}
							changeIframe={() => setActiveIframeOption(iframe.server)}
							isActive={iframe.server === activeIframeOption}
							activeIframeRef={iframe.server === activeIframeOption ? activeIframeRef : null}
						/>
					))}
				</ul>
			)}
			<div className={styles.hoverIndicator} />
		</nav>
	)
}
