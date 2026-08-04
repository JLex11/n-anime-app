'use client'

import { useEffect, useRef, useState } from 'react'
import RightArrowIcon from '../Icons/RightArrowIcon'
import styles from './LatestAnimesCarousel.module.css'

interface Props {
	children: React.ReactNode
}

interface EdgeState {
	canScrollStart: boolean
	canScrollEnd: boolean
}

export function LatestAnimesCarousel({ children }: Props) {
	const scrollerRef = useRef<HTMLDivElement>(null)
	const [edgeState, setEdgeState] = useState<EdgeState>({
		canScrollStart: false,
		canScrollEnd: false,
	})

	useEffect(() => {
		const scroller = scrollerRef.current
		if (!scroller) return

		const updateEdgeState = () => {
			const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
			const nextState = {
				canScrollStart: scroller.scrollLeft > 1,
				canScrollEnd: maxScrollLeft - scroller.scrollLeft > 1,
			}

			setEdgeState(previousState =>
				previousState.canScrollStart === nextState.canScrollStart && previousState.canScrollEnd === nextState.canScrollEnd
					? previousState
					: nextState
			)
		}

		updateEdgeState()
		scroller.addEventListener('scroll', updateEdgeState, { passive: true })

		const resizeObserver = new ResizeObserver(updateEdgeState)
		resizeObserver.observe(scroller)
		for (const child of scroller.children) resizeObserver.observe(child)

		return () => {
			scroller.removeEventListener('scroll', updateEdgeState)
			resizeObserver.disconnect()
		}
	}, [])

	const scrollByCard = (direction: -1 | 1) => {
		const scroller = scrollerRef.current
		const firstCard = scroller?.firstElementChild
		if (!(scroller && firstCard instanceof HTMLElement)) return

		const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap) || 0
		const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

		scroller.scrollBy({
			left: direction * (firstCard.getBoundingClientRect().width + gap),
			behavior,
		})
	}

	return (
		<div className={styles.viewport} data-can-scroll-start={edgeState.canScrollStart} data-can-scroll-end={edgeState.canScrollEnd}>
			<div id='latest-animes-scroller' ref={scrollerRef} className={styles.scroller} role='region' aria-label='Últimos animes'>
				{children}
			</div>
			<span className={`${styles.edge} ${styles.edgeStart}`} aria-hidden='true' />
			<span className={`${styles.edge} ${styles.edgeEnd}`} aria-hidden='true' />
			<button
				className={`${styles.arrow} ${styles.arrowStart}`}
				type='button'
				disabled={!edgeState.canScrollStart}
				aria-label='Ver animes anteriores'
				aria-controls='latest-animes-scroller'
				onClick={() => scrollByCard(-1)}
			>
				<RightArrowIcon width={20} />
			</button>
			<button
				className={`${styles.arrow} ${styles.arrowEnd}`}
				type='button'
				disabled={!edgeState.canScrollEnd}
				aria-label='Ver más animes'
				aria-controls='latest-animes-scroller'
				onClick={() => scrollByCard(1)}
			>
				<RightArrowIcon width={20} />
			</button>
		</div>
	)
}
