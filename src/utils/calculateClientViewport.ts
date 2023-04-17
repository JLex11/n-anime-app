/* export const viewHeight = (percent: number) => {
  if (typeof window === 'undefined') return 0

  const documentHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  return (percent * documentHeight) / 100
}

export const viewWidth = (percent: number) => {
  if (typeof window === 'undefined') return 0

  const documentWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )

  return (percent * documentWidth) / 100
}

// -------------------- */

export enum ViewportSize {
  Width = 'Width',
  Height = 'Height',
}

export const viewWidth = (percent: number) => viewSize(percent, ViewportSize.Width)

export const viewHeight = (percent: number) => viewSize(percent, ViewportSize.Height)

const viewSize = (percent: number, size: ViewportSize) => {
  if (typeof window === 'undefined') return 0

  const documentSize = Math.max(
    document.documentElement[`client${size}`],
    window[`inner${size}`] || 0
  )

  return (percent * documentSize) / 100
}