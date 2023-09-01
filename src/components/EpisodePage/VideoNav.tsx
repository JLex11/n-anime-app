import { EpisodeVideo } from '@/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Episode.module.css'
import { VideoNavItem } from './VideoNavItem'
import { IframeData } from './VideoSection'

interface CSSProperties extends React.CSSProperties {
  '--indicator-left'?: `${number}px`
  '--indicator-width'?: `${number}px`
  '--indicator-height'?: `${number}px`
}

interface handleActiveProps {
  left: number
  width: number
  height: number
}

interface VideoNavProps {
  iframesData: IframeData
  handleIframeChange: (episodeVideo: EpisodeVideo) => void
}

export function VideoNav({ iframesData, handleIframeChange }: VideoNavProps) {
  const [indicatorProps, setIndicatorProps] = useState<CSSProperties>({
    '--indicator-left': '0px',
    '--indicator-width': '0px',
    '--indicator-height': '0px'
  })

  const activeIframeRef = useRef<HTMLLIElement | null>(null)

  const handleActiveIframe = ({ left, width, height }: handleActiveProps) => {
    setIndicatorProps({
      '--indicator-left': `${left}px`,
      '--indicator-width': `${width}px`,
      '--indicator-height': `${height}px`
    })
  }

  const setActiveDimensions = useCallback((e: HTMLLIElement) => {
    const width = e.offsetWidth
    const height = e.offsetHeight
    const left = e.offsetLeft

    handleActiveIframe({ left, width, height })
  }, [])

  useEffect(() => {
    const activeIframe = activeIframeRef.current
    if (!activeIframe) return

    setActiveDimensions(activeIframe)
  }, [activeIframeRef, setActiveDimensions])

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLLIElement
    setActiveDimensions(target)
  }

  const handleMouseLeave = () => {
    const activeIframe = activeIframeRef.current
    if (!activeIframe) return
    setActiveDimensions(activeIframe)
  }

  return (
    <nav className={styles.iframeNav} style={indicatorProps}>
      {iframesData.SUB && (
        <ul className={styles.iframeNavOptions} onMouseLeave={handleMouseLeave}>
          {iframesData.SUB.map((iframe, i) => (
            <VideoNavItem
              key={iframe.code}
              iframe={iframe}
              handleMouseEnter={handleMouseEnter}
              changeIframe={handleIframeChange}
              isActive={i === 0}
              activeIframeRef={activeIframeRef}
            />
          ))}
        </ul>
      )}
      <div className={styles.hoverIndicator}></div>
    </nav>
  )
}
