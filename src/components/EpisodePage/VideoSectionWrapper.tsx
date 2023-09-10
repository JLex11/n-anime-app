'use client'

import { EpisodePageContext } from '@/app/animes/[animeId]/[episode]/PageContext'
import { VideoLangs, VideoList } from '@/types'
import { toCap } from '@/utils/textConverts'
import { useContext, useState } from 'react'
import styles from './Episode.module.css'
import { VideoNav } from './VideoNav'

interface Props {
  iframesData: VideoList
  title?: string
  children: React.ReactNode
}

export function VideoSectionWrapper({ iframesData, title, children }: Props) {
  const [currentIframeLang, setCurrentIframeLang] = useState<VideoLangs>('SUB')
  const { handleVideoSectionRef } = useContext(EpisodePageContext)

  const iframeLangs = Object.keys(iframesData) as VideoLangs[]

  return (
    <section className={styles.videoContainer} ref={handleVideoSectionRef}>
      <header className={styles.videoHeader}>
        <h1 className={styles.videoTitle}>{title}</h1>
        {iframeLangs.length > 1 && (
          <select name='languaje' className={styles.languajeSelect} onChange={e => setCurrentIframeLang(e.target.value as VideoLangs)}>
            {iframeLangs.map(lang => (
              <option value={lang} key={lang}>
                {toCap(lang)}
              </option>
            ))}
          </select>
        )}
      </header>
      {<VideoNav currentIframesData={iframesData[currentIframeLang] || []} />}
      {children}
    </section>
  )
}
