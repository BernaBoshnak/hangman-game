import GameOver from '../../src/components/GameOver/GameOver'

describe('<GameOver />', () => {
  it('displays congrats message when the player wins', () => {
    cy.mount(<GameOver isWon reset={() => {}} />)

    cy.findByText(/congratulations/i)
  })

  it('displays losing message when the player loses', () => {
    cy.mount(<GameOver isWon={false} reset={() => {}} />)

    cy.findByText(/game over/i)
  })
})
