export enum ViewportSize {
  Width = 'Width',
  Height = 'Height'
}

export const viewWidth = (percent: number) =>
  viewSize(percent, ViewportSize.Width)

export const viewHeight = (percent: number) =>
  viewSize(percent, ViewportSize.Height)

const viewSize = (percent: number, size: ViewportSize) => {
  if (typeof window === 'undefined') return 0
  const documentSize = Math.max(
    document.documentElement[`client${size}`],
    window[`inner${size}`] || 0
  )
  return (percent * documentSize) / 100
}
