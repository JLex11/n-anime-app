'use client'

import { EpisodePageContext } from '@/app/animes/[animeId]/[episode]/PageContext'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import { useContext } from 'react'
import styles from '../Episode.module.css'

export interface Props {
  children: React.ReactNode
}

interface CSSProperties extends React.CSSProperties {
  '--aside-height': string
}

export function AsideWrapper({ children }: Props) {
  const { videoSectionRef } = useContext(EpisodePageContext)
  const { blockSize } = useResizeObserver(videoSectionRef?.current)

  const asideStyles: CSSProperties = {
    '--aside-height': `${blockSize || 250}px`
  }

  return (
    <aside className={styles.aside} style={asideStyles}>
      {children}
    </aside>
  )
}
