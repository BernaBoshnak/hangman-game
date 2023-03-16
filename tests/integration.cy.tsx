import App from '../src/App'
import { Level } from '../src/word'
import { RouteHandler } from 'cypress/types/net-stubbing'

const startGame = (routeHandler: RouteHandler = { statusCode: 200 }) => {
  cy.intercept('/random-word/api.php*', routeHandler).as('getWord')

  return (difficulty: Level = 'easy') => {
    cy.mount(<App />)
    cy.findByRole('button', { name: new RegExp(difficulty, 'i') }).click()
  }
}

describe('words endpoint', () => {
  it('shows loading', () => {
    startGame({ delay: 200 })()
    cy.findByText(/loading/i)
    cy.wait('@getWord').then(() => {
      cy.findByText(/loading/i).should('not.exist')
    })
  })

  it('shows error when server responds with failure', () => {
    startGame({ statusCode: 500 })()

    cy.wait('@getWord').then(() => {
      cy.findByRole('alert').within(($node) => {
        cy.wrap($node)
          .invoke('text')
          .should('match', /oops, something went wrong\. try again/i)
      })
    })
  })

  describe('difficulty request parameters', () => {
    it('should request with the correct min and max length for easy difficulty', () => {
      startGame()()

      cy.wait('@getWord').then(({ request }) => {
        expect(request.query).to.deep.eq({ minLength: '3', maxLength: '5' })
      })
    })

    it('should request with the correct min and max length for normal difficulty', () => {
      startGame()('normal')

      cy.wait('@getWord').then(({ request }) => {
        expect(request.query).to.deep.eq({ minLength: '6', maxLength: '8' })
      })
    })

    it('should request with the correct min and max length for hard difficulty', () => {
      startGame()('hard')

      cy.wait('@getWord').then(({ request }) => {
        expect(request.query).to.deep.eq({ minLength: '9', maxLength: '15' })
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
      startGame({ body: { word } })()

      cy.wait('@getWord').then(() => {
        const pressedLetters = new Set(['S', 'O', 'N'])
        const bodyPartsCopy = [...bodyParts]

        pressLetters(word, pressedLetters, bodyPartsCopy)
        cy.wrap(bodyPartsCopy).should('have.length', 6)
        cy.findByText(/congratulations/i)
      })
    })

    it('should lose the game', () => {
      startGame({ body: { word } })()

      cy.wait('@getWord').then(() => {
        const pressedLetters = new Set(['B', 'M', 'R', 'O', 'N', 'A', 'P', 'K'])
        const bodyPartsCopy = [...bodyParts]

        pressLetters(word, pressedLetters, bodyPartsCopy)
        cy.wrap(bodyPartsCopy).should('have.length', 0)
        cy.findByText(/game over/i)
      })
    })
  })
})
