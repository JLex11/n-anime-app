export const resolveAllPromises = async (
  promises: { name: string; promise: Promise<any> }[]
) => {
  const resolvePromises = await Promise.allSettled(
    promises.map(async promise => {
      return {
        name: promise.name,
        promise: await promise.promise
      }
    })
  )

  const fulfilledPromises = resolvePromises
    .filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled'
    )
    .map(({ value }) => value)

  const rejectedPromises = resolvePromises.filter(
    (result): result is PromiseRejectedResult => result.status === 'rejected'
  )

  return {
    fulfilledPromises,
    rejectedPromises
  }
}
