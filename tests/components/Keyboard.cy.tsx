import { useState } from 'react'
import Keyboard, {
  KeyboardLetter,
} from '../../src/components/Keyboard/Keyboard'

describe('<Keyboard />', () => {
  it('renders all keys', () => {
    const alphabet = Array.from({ length: 26 }, (_, i) => {
      return String.fromCharCode(i + 65)
    })

    cy.mount(
      <Keyboard
        onKeyClick={() => {}}
        pressedKeys={[]}
        setPressedKeys={() => []}
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

    it('does not allow to press keys (click) on disabled keyboard', () => {
      cy.mount(
        <Keyboard
          onKeyClick={keyClickStub}
          pressedKeys={[]}
          setPressedKeys={() => []}
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

    it('does not allow to press keys (keypress) on disabled keyboard', () => {
      let tempPressedKeys: KeyboardLetter[]

      const Wrapper = () => {
        const [pressedKeys, setPressedKeys] = useState<KeyboardLetter[]>([])
        tempPressedKeys = pressedKeys

        return (
          <Keyboard
            onKeyClick={() => {}}
            pressedKeys={pressedKeys}
            setPressedKeys={setPressedKeys}
            isKeyboardDisabled={false}
          />
        )
      }

      cy.mount(<Wrapper />)
      cy.findByTestId('keyboard').then(() => {
        const key = 'M'

        cy.document().trigger('keypress', { key: key })
        cy.document().trigger('keypress', { key: key })

        cy.wrap(null).should(() => {
          expect(tempPressedKeys).to.have.lengthOf(1)
          expect(tempPressedKeys[0]).to.equal(key)
        })
      })
    })

    it('allow to press keys on enabled keyboard', () => {
      cy.mount(
        <Keyboard
          onKeyClick={keyClickStub}
          pressedKeys={[]}
          setPressedKeys={() => []}
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
          setPressedKeys={() => []}
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
