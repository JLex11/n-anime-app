import { useEffect, useRef, useState } from 'react'
import styles from './Episode.module.css'
import { VideoNavItem } from './VideoNavItem'
import { IframeData } from './VideoSection'

interface CSSProperties extends React.CSSProperties {
  '--indicator-left'?: `${number}px`
  '--indicator-width'?: `${number}px`
}

interface handleActiveProps {
  left: number
  width: number
}

interface VideoNavProps {
  iframesData: IframeData
  handleIframeChange: (e: React.MouseEvent<HTMLLIElement>) => void
}

export const VideoNav = ({ iframesData, handleIframeChange }: VideoNavProps) => {
  const [indicatorProps, setIndicatorProps] = useState<CSSProperties>({
    '--indicator-left': '0px',
    '--indicator-width': '0px',
  })

  const activeIframeRef = useRef<HTMLLIElement | null>(null)

  const handleActiveIframe = ({ left, width }: handleActiveProps) => {
    setIndicatorProps({
      '--indicator-left': `${left}px`,
      '--indicator-width': `${width}px`,
    })
  }

  useEffect(() => {
    const activeIframe = activeIframeRef.current
    if (!activeIframe) return

    const width = activeIframe.offsetWidth
    const left = activeIframe.offsetLeft

    handleActiveIframe({ left, width })
  }, [activeIframeRef])

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLLIElement

    const width = target.offsetWidth
    const left = target.offsetLeft

    handleActiveIframe({ left, width })
  }

  const handleMouseLeave = () => {
    const activeIframe = activeIframeRef.current
    if (!activeIframe) return

    const width = activeIframe.offsetWidth
    const left = activeIframe.offsetLeft

    handleActiveIframe({ left, width })
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLLIElement>) => {
    handleIframeChange(e)
    activeIframeRef.current = e.currentTarget as HTMLLIElement
    console.log(activeIframeRef.current)
  }

  return (
    <nav className={styles.iframeNav} style={indicatorProps}>
      <ul className={styles.iframeNavOptions} onMouseLeave={handleMouseLeave}>
        {iframesData?.SUB?.map((iframe, i) => {
          return (
            <VideoNavItem
              key={iframe.code}
              iframe={iframe}
              handleMouseEnter={handleMouseEnter}
              handleButtonClick={handleButtonClick}
              isActive={i === 0}
              activeIframeRef={activeIframeRef}
            />
          )
        })}
      </ul>
      <div className={styles.hoverIndicator}></div>
    </nav>
  )
}
