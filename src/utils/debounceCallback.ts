export function debounceCallback<A extends any[], R>(fn: (...args: A) => Promise<R> | R, time: number) {
  let timerId: NodeJS.Timeout

  return function debounced(...args: A): Promise<R> {
    if (timerId) clearTimeout(timerId)

    return new Promise(resolve => {
      timerId = setTimeout(() => resolve(fn(...args)), time)
    })
  }
}
