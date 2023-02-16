const getWordFromApi = async (minLength?: number, maxLength?: number) => {
  const api = process.env.REACT_APP_WORDS_ENDPOINT
  const { signal } = new AbortController()
  const queryParams: Partial<Record<'minLength' | 'maxLength', string>> = {}

  if (minLength !== undefined) {
    queryParams.minLength = minLength.toString()
  }

  if (maxLength !== undefined) {
    queryParams.maxLength = maxLength.toString()
  }

  type WordResponse = {
    word: string | null
    ok: boolean
  }

  const query = new URLSearchParams(queryParams).toString()
  const response = await fetch(`${api}${query ? '?' : ''}${query}`, { signal })
  const data = (await response.json()) as WordResponse

  return data.word
}

export default getWordFromApi
