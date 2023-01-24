function classnames(...args: unknown[]) {
  const result: string[] = []

  for (const arg of args) {
    if (typeof arg === 'string') {
      result.push(arg)
    }
  }

  return result.join(' ')
}

export { classnames }
