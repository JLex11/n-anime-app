import { EpisodeVideo } from '@/types'
import styles from './Episode.module.css'

interface Props {
  IframeData: EpisodeVideo
}

export function Iframe({ IframeData }: Props) {
  return (
    <iframe
      className={styles.iframe}
      src={IframeData?.code}
      title={IframeData?.title}
      width={576}
      allowFullScreen
      loading='eager'
      name='episode-iframe-video'
    />
  )
}
