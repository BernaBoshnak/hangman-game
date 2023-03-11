import Keyboard from '../../src/components/Keyboard/Keyboard'

describe('<Keyboard />', () => {
  it('renders all keys', () => {
    const alphabet = Array.from({ length: 26 }, (_, i) => {
      return String.fromCharCode(i + 65)
    })

    cy.mount(
      <Keyboard
        onKeyClick={() => {}}
        pressedKeys={[]}
        isKeyboardDisabled={false}
      />,
    )

    alphabet.forEach((letter) => {
      cy.get('button').contains(new RegExp(letter, 'i'))
    })
  })

  describe('typing on enabled/disabled keyboard', () => {
    let keyClickStub: ReturnType<typeof cy.stub>

    beforeEach(() => {
      keyClickStub = cy.stub().as('clickStub')
    })

    it('does not allow to press keys on disabled keyboard', () => {
      cy.mount(
        <Keyboard
          onKeyClick={keyClickStub}
          pressedKeys={[]}
          isKeyboardDisabled={true}
        />,
      )

      cy.findByTestId(/letter-b/i).as('keyboard-btn')
      cy.get('@keyboard-btn')
        .should('have.prop', 'nodeName', 'BUTTON')
        .and('be.disabled')
      cy.get('@keyboard-btn').click({ force: true })
      cy.get('@clickStub').should('have.not.been.called')
    })

    it('allow to press keys on enabled keyboard', () => {
      cy.mount(
        <Keyboard
          onKeyClick={keyClickStub}
          pressedKeys={[]}
          isKeyboardDisabled={false}
        />,
      )

      cy.findByTestId(/letter-b/i).as('keyboard-btn')
      cy.get('@keyboard-btn')
        .should('have.prop', 'nodeName', 'BUTTON')
        .and('not.be.disabled')
      cy.get('@keyboard-btn').click()
      cy.get('@clickStub').should('have.been.calledOnce')
    })
  })

  describe('pressed key is the actual key', () => {
    let keyClickStub: ReturnType<typeof cy.stub>

    beforeEach(() => {
      keyClickStub = cy.stub().as('clickStub')

      cy.mount(
        <Keyboard
          onKeyClick={keyClickStub}
          pressedKeys={[]}
          isKeyboardDisabled={false}
        />,
      )
    })

    afterEach(() => {
      cy.get('@clickStub').should('have.been.calledWith', 'B')
    })

    it('should click the button and trigger the keyboard event', () => {
      cy.findByTestId(/letter-b/i).as('keyboard-btn')
      cy.get('@keyboard-btn').should('have.prop', 'nodeName', 'BUTTON')
      cy.get('@keyboard-btn').click()
    })

    it('should press a key and trigger the keyboard event', () => {
      cy.findByTestId(/letter-b/i).as('keyboard-btn')
      cy.get('@keyboard-btn').should('have.prop', 'nodeName', 'BUTTON')
      cy.get('@keyboard-btn').type('b')
    })
  })
})
