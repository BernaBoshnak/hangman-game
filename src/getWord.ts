import { getNounList } from './services/firebase/nounList'

export const getFilteredRandomWord = async (
  minLength?: number,
  maxLength?: number,
) => {
  const words = await getNounList()

  if (!words) {
    console.error('Noun list is not available.')
    return null
  }

  let filteredWords = words
  if (minLength !== undefined) {
    filteredWords = filteredWords.filter((word) => word.length >= minLength)
  }

  if (maxLength !== undefined) {
    filteredWords = filteredWords.filter((word) => word.length <= maxLength)
  }

  if (filteredWords.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * filteredWords.length)
  return filteredWords[randomIndex]
}

export default getFilteredRandomWord
