import { db } from '../../src/services/api/firebase-config'
import * as firestore from '../../src/services/firebase/firestore'
import { getNounList } from '../../src/services/firebase/nounList'
import { NounListDoc } from '../../src/services/api/response/nounList'

describe('getNounList', () => {
  it('should return words from noun_list collection', async () => {
    const fakeDocRef = { key: 'value' }
    const fakeData: NounListDoc = { words: ['apple', 'banana', 'cherry'] }

    cy.stub(firestore, 'doc').as('doc').returns(fakeDocRef)
    cy.stub(firestore, 'getDoc')
      .as('getDoc')
      .resolves({
        exists: cy.stub().returns(true),
        data: cy.stub().returns(fakeData),
      })

    const result = await getNounList()
    console.log(result)
    cy.get('@doc').should('be.calledOnceWith', db, 'noun_list', 'doc1')
    cy.get('@getDoc').should('be.calledOnceWith', fakeDocRef)

    expect(result).to.deep.equal(fakeData.words)
  })
})
