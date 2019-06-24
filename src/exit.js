export const registerProcessExitCallback = (callback) => {
  let unhandledRejections = []

  const unhandledRejectionCallback = (error, promise) => {
    unhandledRejections = [...unhandledRejections, { error, promise }]
  }

  const rejectionHandledCallback = (promise) => {
    unhandledRejections = unhandledRejections.filter(
      (unhandledRejection) => unhandledRejection.promise === promise,
    )
  }

  const exitCallback = () => {
    process.removeListener("exit", exitCallback)
    process.removeListener("unhandledRejection", unhandledRejectionCallback)
    process.removeListener("rejectionHandled", rejectionHandledCallback)
    callback({ unhandledRejectionArray: unhandledRejections.map(({ error }) => error) })
  }

  process.on("unhandledRejection", unhandledRejectionCallback)
  process.on("rejectionHandled", rejectionHandledCallback)
  process.on("exit", exitCallback)

  return () => {
    process.removeListener("exit", exitCallback)
    process.removeListener("unhandledRejection", unhandledRejectionCallback)
    process.removeListener("rejectionHandled", rejectionHandledCallback)
  }
}
