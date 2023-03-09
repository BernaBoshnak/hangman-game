import DifficultyButtons from '../../src/components/DifficultyButtons'

describe('<DifficultyButtons />', () => {
  it('renders game difficulty buttons', () => {
    cy.mount(<DifficultyButtons difficultyLevelClick={() => {}} />)

    cy.findByRole('button', { name: 'Easy' })
    cy.findByRole('button', { name: 'Normal' })
    cy.findByRole('button', { name: 'Hard' })
  })
})
