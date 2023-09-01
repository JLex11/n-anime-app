import { EpisodeVideo } from '@/types'
import clsx from 'clsx'
import AdsIcon from '../Icons/AdsIcon'
import styles from './Episode.module.css'

interface VideoNavItemProps {
  iframe: EpisodeVideo
  handleMouseEnter: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  changeIframe: (episodeVideo: EpisodeVideo) => void
  isActive: boolean
  activeIframeRef: React.MutableRefObject<HTMLLIElement | null>
}

export const VideoNavItem = ({ iframe, handleMouseEnter, changeIframe, isActive, activeIframeRef }: VideoNavItemProps) => {
  const NavItemClass = clsx(styles.iframeOption, isActive && styles.iframeOptionActive)

  return (
    <li
      className={NavItemClass}
      onMouseEnter={handleMouseEnter}
      onClick={() => changeIframe(iframe)}
      ref={isActive ? activeIframeRef : null}
    >
      <button>{iframe.title}</button>
      {Boolean(iframe.ads) && (
        <span className={styles.adIcon}>
          <AdsIcon width={18} />
        </span>
      )}
    </li>
  )
}
