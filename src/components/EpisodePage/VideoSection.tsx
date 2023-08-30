import { EpisodeVideo } from '@/types'
import { toCap } from '@/utils/textConverts'
import styles from './Episode.module.css'
import { VideoSectionWrapper } from './VideoSectionWrapper'

export type IframeData = {
  SUB?: EpisodeVideo[]
  DUB?: EpisodeVideo[]
}

interface Props {
  iframesData: IframeData
  title?: string
}

export const VideoSection = ({ iframesData, title }: Props) => {
  return (
    <VideoSectionWrapper iframesData={iframesData}>
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
    </VideoSectionWrapper>
  )
}
