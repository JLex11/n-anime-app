'use client'

import styles from '@/styles/Episode.module.css'
import { EpisodeVideo } from '@/types'

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
  currentIframeData: EpisodeVideo
}

export const Iframe = ({ iframeRef, currentIframeData }: Props) => {
  return (
    <iframe
      className={styles.iframe}
      src={currentIframeData?.code}
      title={currentIframeData?.title}
      width={720}
      allowFullScreen
      loading={'eager'}
      ref={iframeRef}
    />
  )
}
