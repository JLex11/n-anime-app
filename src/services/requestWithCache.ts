import NodeCache from 'node-cache'

interface RequestCacheInit extends RequestInit {
  ttl?: number
}

interface Params {
  url: string
  params?: RequestCacheInit
}

type FetchResponse = unknown

const cacheDefaultConfig = { stdTTL: 7200, useClones: false }
const cache = new NodeCache(cacheDefaultConfig)

export const requestWithCache = async ({ url, params = {} }: Params) => {
  const cacheKey = JSON.stringify({ url, params })

  const cachePromise = new Promise<FetchResponse>(resolve => {
    const cacheResource = cache.get(cacheKey)

    if (cacheResource) {
      console.log(`From cache: ${cacheKey}`)
      resolve(cacheResource)
    }
  })

  const responsePromise = fetch(url, params).then(async response => {
    if (!url) return

    try {
      const resource = await response.json()
      cache.set(cacheKey, resource, params?.ttl ?? cacheDefaultConfig.stdTTL)
      return resource
    } catch (e) {
      console.log({ url })
      return
    }
  })

  return await Promise.race([cachePromise, responsePromise])
}

// old inside function code
/* const cachedResponse = cache.get(url)
  if (cachedResponse) return cachedResponse

  const response = await fetch(url, params)
  if (!response?.ok) {
    console.log('failed to fetch', { url, params })
    return null
  }

  const data = await response.json()
  cache.set(url, data)

  return data */