'use client'

import { EpisodePageContext } from '@/app/animes/[animeId]/[episode]/PageContext'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import { useContext } from 'react'
import styles from '../Episode.module.css'

export interface Props {
  children: React.ReactNode
}

interface CSSProps extends React.CSSProperties {
  '--aside-height': string
}

export function AsideWrapper({ children }: Props) {
  const { videoSectionRef } = useContext(EpisodePageContext)
  const { blockSize } = useResizeObserver(videoSectionRef)

  const asideStyles: CSSProps = {
    '--aside-height': `${blockSize}px`
  }

  return (
    <aside className={styles.aside} style={asideStyles}>
      {children}
    </aside>
  )
}
