import Word from '../../src/components/Word'

describe('<Word />', () => {
  it('renders the word letters placeholders', () => {
    cy.mount(
      <Word word="HELLO" pressedKeys={[]} shouldUnlockAllLetters={false} />,
    )

    cy.findAllByTestId('word-letter').should('have.length', 5)
  })

  it('shows pressed keys if they exist in the word', () => {
    cy.mount(
      <Word
        word="HELLO"
        pressedKeys={['H', 'L']}
        shouldUnlockAllLetters={false}
      />,
    )

    cy.findAllByTestId('word-letter').as('letters')
    cy.get('@letters').its(0).should('have.text', 'H')
    cy.get('@letters').its(2).should('have.text', 'L')
    cy.get('@letters').its(3).should('have.text', 'L')
  })

  it('does not show not matching pressed key within a word', () => {
    const pressedKey = 'R'

    cy.mount(
      <Word
        word="HELLO"
        pressedKeys={[pressedKey]}
        shouldUnlockAllLetters={false}
      />,
    )

    cy.findByText(pressedKey).should('not.exist')
  })

  it('unlocks all letters', () => {
    const word = 'HELLO'

    cy.mount(<Word word={word} pressedKeys={[]} shouldUnlockAllLetters />)

    cy.findAllByTestId('word-letter').each(($el, index) => {
      const letter = Array.from(word)[index]
      cy.wrap($el).should('have.text', letter)
    })
  })
})
