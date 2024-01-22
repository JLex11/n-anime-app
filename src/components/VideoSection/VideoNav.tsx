import { EpisodeVideo } from '@/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { VideoNavItem } from './VideoNavItem'
import styles from './VideoSection.module.css'

interface CSSProps extends React.CSSProperties {
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
  currentIframesData: EpisodeVideo[]
}

export function VideoNav({ currentIframesData }: VideoNavProps) {
  const [activeIframeOption, setActiveIframeOption] = useState<
    EpisodeVideo['server'] | undefined
  >(currentIframesData?.[0]?.server)
  const [indicatorProps, setIndicatorProps] = useState<CSSProps>({
    '--indicator-left': '0px',
    '--indicator-width': '0px',
    '--indicator-height': '0px'
  })

  const activeIframeRef = useRef<HTMLLIElement | null>(null)

  const handleActiveIframe = useCallback(
    ({ left, width, height }: handleActiveProps) => {
      setIndicatorProps({
        '--indicator-left': `${left}px`,
        '--indicator-width': `${width}px`,
        '--indicator-height': `${height}px`
      })
    },
    []
  )

  const setActiveDimensions = useCallback(
    (e: HTMLLIElement) => {
      const width = e.offsetWidth
      const height = e.offsetHeight
      const left = e.offsetLeft

      handleActiveIframe({ left, width, height })
    },
    [handleActiveIframe]
  )

  useEffect(() => {
    const activeIframe = activeIframeRef.current
    if (!activeIframe) return

    setActiveDimensions(activeIframe)
  }, [setActiveDimensions])

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
      {currentIframesData && (
        <ul className={styles.iframeNavOptions} onMouseLeave={handleMouseLeave}>
          {currentIframesData.map(iframe => (
            <VideoNavItem
              key={iframe.code}
              iframe={iframe}
              handleMouseEnter={handleMouseEnter}
              changeIframe={() => setActiveIframeOption(iframe.server)}
              isActive={iframe.server === activeIframeOption}
              activeIframeRef={
                iframe.server === activeIframeOption ? activeIframeRef : null
              }
            />
          ))}
        </ul>
      )}
      <div className={styles.hoverIndicator} />
    </nav>
  )
}
