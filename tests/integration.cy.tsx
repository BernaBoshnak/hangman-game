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
})
