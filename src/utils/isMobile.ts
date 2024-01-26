export const userIsMobile = (headers: IterableIterator<[string, string]>) => {
  const userAgent = [...headers].find(([key]) => key === 'user-agent')?.[1]
  return Boolean(userAgent?.includes('Mobile'))
}
