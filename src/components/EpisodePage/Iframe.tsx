import { EpisodeVideo } from '@/types'
import styles from './Episode.module.css'

interface Props {
  /* iframeRef: React.RefObject<HTMLIFrameElement>
  currentIframeData: EpisodeVideo */
  IframeData: EpisodeVideo
}

export function Iframe({ IframeData /* iframeRef, currentIframeData */ }: Props) {
  return (
    <iframe
      className={styles.iframe}
      src={IframeData?.code}
      title={IframeData?.title}
      width={576}
      allowFullScreen
      loading='eager'
      /* ref={iframeRef} */
      name='episode-iframe-video'
    />
  )
}
