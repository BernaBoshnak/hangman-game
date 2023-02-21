type Args = (string | Record<string, boolean>)[]

function classnames(...args: Args) {
  const result: string[] = []

  for (const arg of args) {
    if (typeof arg === 'string') {
      result.push(arg)
    }

    if (typeof arg === 'object' && arg) {
      for (const [className, condition] of Object.entries(arg)) {
        if (condition) {
          result.push(className)
        }
      }
    }
  }

  return result.join(' ')
}

export { classnames }
