import { EpisodeVideo } from '@/types'
import AdsIcon from '../Icons/AdsIcon'
import styles from './Episode.module.css'

interface VideoNavItemProps {
  iframe: EpisodeVideo
  handleMouseEnter: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  handleButtonClick: (e: React.MouseEvent<HTMLLIElement>) => void
  isActive: boolean
  activeIframeRef: React.MutableRefObject<HTMLLIElement | null>
}

export const VideoNavItem = ({ iframe, handleMouseEnter, handleButtonClick, isActive, activeIframeRef }: VideoNavItemProps) => {
  return (
    <li
      className={styles.iframeOption}
      onMouseEnter={handleMouseEnter}
      onClick={handleButtonClick}
      ref={isActive ? activeIframeRef : null}
      id={iframe.server}
    >
      <button>{iframe.title}</button>
      {iframe.ads > 0 && (
        <span className={styles.adIcon}>
          <AdsIcon width={18} />
        </span>
      )}
    </li>
  )
}
