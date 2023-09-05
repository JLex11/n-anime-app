import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

export const userIsMobile = (headers: ReadonlyHeaders) => {
  const userAgent = headers.get('User-Agent')
  return Boolean(userAgent?.includes('Mobile'))
}
