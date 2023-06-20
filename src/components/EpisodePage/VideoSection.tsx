'use client'

import { EpisodeVideo } from '@/types'
import { toCap } from '@/utils/textConverts'
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
  title?: string
}

export const VideoSection = ({ iframesData, title }: Props) => {
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
      <header className={styles.videoHeader}>
        <h1 className={styles.videoTitle}>{title}</h1>
        <select name='languaje' id='languaje_select' className={styles.languajeSelect}>
          {Object.keys(iframesData).map(lang => (
            <option value={lang} key={lang}>
              {toCap(lang)}
            </option>
          ))}
        </select>
      </header>
      <VideoNav handleIframeChange={handleIframeChange} iframesData={iframesData} />
      {currentIframeData && <Iframe iframeRef={iframeRef} currentIframeData={currentIframeData} />}
    </section>
  )
}
