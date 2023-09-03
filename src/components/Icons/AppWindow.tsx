interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function AppWindow({ width = 24, height, strokeWidth = 1, className: cssClass }: Props) {
  return (
    <svg
      className={cssClass}
      width={width}
      height={height || width}
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
      <path d='M6 8h.01' />
      <path d='M9 8h.01' />
    </svg>
  )
}
