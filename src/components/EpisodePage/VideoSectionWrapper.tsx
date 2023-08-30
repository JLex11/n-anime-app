'use client'

import { EpisodeVideo } from '@/types'
import { useRef, useState } from 'react'
import styles from './Episode.module.css'
import { Iframe } from './Iframe'
import { VideoNav } from './VideoNav'

export type IframeData = {
  SUB?: EpisodeVideo[]
  DUB?: EpisodeVideo[]
}

interface Props {
  iframesData: IframeData
  children: React.ReactNode
}

export const VideoSectionWrapper = ({ iframesData, children }: Props) => {
  const [currentIframeData, setCurrentIframeData] = useState(iframesData.SUB?.[0])

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleIframeChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLLIElement
    const iframe = iframesData.SUB?.find(iframe => iframe.server === target.id)

    if (iframe) {
      iframeRef.current?.setAttribute('src', iframe.code)
    }
  }

  return (
    <section className={styles.videoContainer}>
      {children}
      <VideoNav handleIframeChange={handleIframeChange} iframesData={iframesData} />
      {currentIframeData && <Iframe iframeRef={iframeRef} currentIframeData={currentIframeData} />}
    </section>
  )
}
