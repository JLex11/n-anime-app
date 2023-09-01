'use client'

import { EpisodePageContext } from '@/app/animes/[animeId]/[episode]/PageContext'
import { EpisodeVideo } from '@/types'
import { useContext, useRef, useState } from 'react'
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

export function VideoSectionWrapper({ iframesData, children }: Props) {
  const [currentIframeData, setCurrentIframeData] = useState(iframesData.SUB?.[0])

  const { videoSectionRef } = useContext(EpisodePageContext)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleIframeChange = (episodeVideo: EpisodeVideo) => {
    setCurrentIframeData(episodeVideo)
  }

  return (
    <section className={styles.videoContainer} ref={videoSectionRef}>
      {children}
      <VideoNav handleIframeChange={handleIframeChange} iframesData={iframesData} />
      {currentIframeData && <Iframe iframeRef={iframeRef} currentIframeData={currentIframeData} />}
    </section>
  )
}
