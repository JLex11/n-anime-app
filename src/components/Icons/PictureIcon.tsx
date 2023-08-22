interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function PictureIcon({ width = 24, height, strokeWidth = 1.5, className: cssClass }: Props) {
  return (
    <svg
      className={cssClass}
      width={width}
      height={height || width}
      viewBox={`0 0 ${width} ${height || width}`}
      strokeWidth={strokeWidth}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M15 8h.01'></path>
      <path d='M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z'></path>
      <path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5'></path>
      <path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3'></path>
    </svg>
  )
}
