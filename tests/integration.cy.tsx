import App from '../src/App'
import { Level } from '../src/utils/word'
import * as nounListService from '../src/services/firebase/nounList'
import { Word, NounListDoc } from '../src/services/api/response/nounList'
import { getFilteredRandomWord } from './../src/getWord'

const fakeWords: NounListDoc['words'] = [
  'apple',
  'accomplishment',
  'banana',
  'pear',
]

const startGame = (mockWords: string[]) => {
  cy.stub(nounListService, 'getNounList')
    .as('getNounList')
    .callsFake(
      () => new Promise((resolve) => setTimeout(() => resolve(mockWords), 500)),
    )

  return (difficulty: Level = 'easy') => {
    cy.mount(<App />)
    cy.findByRole('button', { name: new RegExp(difficulty, 'i') }).click()
  }
}

describe('fetching words and game interactions with Firestore', () => {
  it.only('shows loading', () => {
    startGame(fakeWords)()
    cy.findByText(/loading/i)
    cy.get('@getNounList').then(() => {
      cy.findByText(/loading/i).should('not.exist')
    })
  })

  it('shows error when no words are available', () => {
    startGame([])()

    cy.findByRole('alert').within(($node) => {
      cy.wrap($node)
        .invoke('text')
        .should('match', /oops, something went wrong\. try again/i)
    })
  })

  describe('difficulty request parameters', () => {
    it('should request with the correct min and max length for easy difficulty', () => {
      startGame(fakeWords)()

      cy.wrap(getFilteredRandomWord(3, 5)).then((word) => {
        expect(word).to.be.a('string')
        const safeWord = word as Word
        expect(safeWord.length).to.be.within(3, 5)
      })
    })

    it('should request with the correct min and max length for normal difficulty', () => {
      startGame(fakeWords)('normal')

      cy.wrap(getFilteredRandomWord(6, 8)).then((word) => {
        expect(word).to.be.a('string')
        const safeWord = word as Word
        expect(safeWord.length).to.be.within(6, 8)
      })
    })

    it('should request with the correct min and max length for hard difficulty', () => {
      startGame(fakeWords)('hard')

      cy.wrap(getFilteredRandomWord(9, 15)).then((word) => {
        expect(word).to.be.a('string')
        const safeWord = word as Word
        expect(safeWord.length).to.be.within(9, 15)
      })
    })
  })

  describe('Keyboard', () => {
    it('should display single body part when pressing a given key N times', () => {
      startGame(['SOON'])()

      cy.findByTestId('keyboard').then(() => {
        const key = 'M'
        cy.document().trigger('keypress', { key: key })
        cy.document().trigger('keypress', { key: key })
      })

      cy.findByTestId('body-parts').within(() => {
        cy.findAllByTestId('body-text').should('have.length', 1)
      })
    })
  })

  describe('gameplay', () => {
    const word = 'SOON'
    const bodyParts = [
      /head/i,
      /body/i,
      /left arm/i,
      /right arm/i,
      /left leg/i,
      /right leg/i,
    ] as const

    const pressLetters = (
      word: string,
      pressedLetters: Set<string>,
      bodyParts: RegExp[],
    ) => {
      cy.findAllByTestId('word-letter').as('letters')

      pressedLetters.forEach((pressedLetter) => {
        // keyboard click
        cy.findByTestId(`letter-${pressedLetter}`).click()

        // get occurence indexes in the word
        const occurrenceIndexes: number[] = []

        for (let i = 0; i < word.length; i++) {
          if (word[i] === pressedLetter) {
            occurrenceIndexes.push(i)
          }
        }

        if (occurrenceIndexes.length) {
          // letter exists
          occurrenceIndexes.forEach((index) => {
            cy.get('@letters').eq(index).should('have.text', pressedLetter)
          })
          cy.findByTestId('body-parts').within(() => {
            cy.findByText(bodyParts[0]).should('not.exist')
          })
        } else {
          // letter does not exist
          cy.get('@letters').should('not.have.text', pressedLetter)
          cy.findByTestId('body-parts').within(() => {
            cy.findByText(bodyParts.splice(0, 1)[0])
          })
        }
      })
    }

    afterEach(() => {
      cy.findByText(/play again/i).click()
      cy.findByRole('button', { name: 'Easy' })
      cy.findByRole('button', { name: 'Normal' })
      cy.findByRole('button', { name: 'Hard' })
    })

    it('should win the game', () => {
      startGame([word])()

      const pressedLetters = new Set(['S', 'O', 'N'])
      const bodyPartsCopy = [...bodyParts]

      pressLetters(word, pressedLetters, bodyPartsCopy)
      cy.wrap(bodyPartsCopy).should('have.length', 6)
      cy.findByText(/congratulations/i)
    })

    it('should lose the game', () => {
      startGame([word])()

      const pressedLetters = new Set(['B', 'M', 'R', 'O', 'N', 'A', 'P', 'K'])
      const bodyPartsCopy = [...bodyParts]

      pressLetters(word, pressedLetters, bodyPartsCopy)
      cy.wrap(bodyPartsCopy).should('have.length', 0)
      cy.findByText(/game over/i)
    })
  })
})
