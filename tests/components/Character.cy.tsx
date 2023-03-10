import Character from '../../src/components/Character/Character'

describe('<Character />', () => {
  it('renders all character elements', () => {
    cy.mount(<Character progress={6} />)

    cy.findAllByTestId('body-part').should('have.length', 6)
  })

  it('renders the head', () => {
    cy.mount(<Character progress={1} />)

    cy.findByText(/head/i)
  })

  it('renders the body', () => {
    cy.mount(<Character progress={2} />)

    cy.findByText(/body/i)
  })

  it('renders the left arm', () => {
    cy.mount(<Character progress={3} />)

    cy.findByText(/left arm/i)
  })

  it('renders the right arm', () => {
    cy.mount(<Character progress={4} />)

    cy.findByText(/right arm/i)
  })

  it('renders the left leg', () => {
    cy.mount(<Character progress={5} />)

    cy.findByText(/left leg/i)
  })

  it('renders the right leg', () => {
    cy.mount(<Character progress={6} />)

    cy.findByText(/right leg/i)
  })
})
