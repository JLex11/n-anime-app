export function debouncePromise(fn, time) {
  let timerId = undefined
  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    return new Promise(resolve => {
      timerId = setTimeout(() => resolve(fn(...args)), time)
    })
  }
}
