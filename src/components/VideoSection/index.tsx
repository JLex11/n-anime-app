import { EpisodeVideo } from '@/types'
import styles from './VideoSection.module.css'
import { VideoSectionWrapper } from './VideoSectionWrapper'

export type IframeData = {
  SUB: EpisodeVideo[]
  DUB?: EpisodeVideo[]
}

interface Props {
  iframesData?: IframeData
  title?: string
}

export function VideoSection({ iframesData, title }: Props) {
  if (!iframesData) return null
  const defaultIframe = iframesData.SUB?.[0]

  return (
    <VideoSectionWrapper iframesData={iframesData} title={title}>
      <iframe
        className={styles.iframe}
        src={defaultIframe?.code}
        title={defaultIframe?.title}
        width={576}
        allowFullScreen
        loading='eager'
        name='episode-iframe-video'
      />
    </VideoSectionWrapper>
  )
}
