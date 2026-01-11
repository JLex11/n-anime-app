export function debounceCallback<A extends any[], R>(
  fn: (...args: A) => Promise<R> | R,
  time: number
) {
  let timerId: NodeJS.Timeout
  let currentRequestId = 0

  return function debounced(...args: A): Promise<R> {
    if (timerId) clearTimeout(timerId)

    const requestId = ++currentRequestId

    return new Promise((resolve, reject) => {
      timerId = setTimeout(async () => {
        if (requestId !== currentRequestId) {
          reject(new Error('Debounced request cancelled'))
          return
        }

        try {
          const result = await fn(...args)
          if (requestId === currentRequestId) {
            resolve(result)
          }
        } catch (error) {
          if (requestId === currentRequestId) {
            reject(error)
          }
        }
      }, time)
    })
  }
}
