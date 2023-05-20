import styles from '@/styles/Episode.module.css'
import { EpisodeVideo } from '@/types'
import Link from 'next/link'
import AdsIcon from '../Icons/AdsIcon'

interface Props {
  iframesData: EpisodeVideo[]
  iframeId: string
}

export const IframeToggle = ({ iframesData, iframeId }: Props) => {
  return (
    <ul className={styles.iframeToggle}>
      {iframesData?.map(iframe => (
        <li key={iframe.code} className={styles.iframeOption}>
          <Link href={iframe.code} target={iframeId} rel='preload'>
            {iframe.title}
            {iframe.ads > 0 && (
              <span className={styles.adIcon}>
                <AdsIcon width={18} />
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
