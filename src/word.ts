export type Level = 'easy' | 'normal' | 'hard'

const getWordLengths = (difficulty: Level) => {
  switch (difficulty) {
    case 'easy':
      return { minLength: 3, maxLength: 5 }
    case 'normal':
      return { minLength: 6, maxLength: 8 }
    case 'hard':
      return { minLength: 9, maxLength: 15 }
  }
}

export default getWordLengths
