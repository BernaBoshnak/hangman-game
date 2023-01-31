export type Level = 'easy' | 'normal' | 'hard'

const getRandomWordByDifficulty = (level: Level, words: string[]): string | undefined => {
  let filteredWords: typeof words = []

  switch (level) {
    case 'easy':
      filteredWords = words.filter(({ length }) => length < 6)
      break
    case 'normal':
      filteredWords = words.filter(({ length }) => length > 5 && length < 9)
      break
    case 'hard':
      filteredWords = words.filter(({ length }) => length > 8)
      break
  }
  const randomIndex = Math.floor(Math.random() * filteredWords.length)

  return filteredWords[randomIndex]
}

export default getRandomWordByDifficulty
