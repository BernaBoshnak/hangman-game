import * as nounListService from '../src/services/firebase/nounList'
import { getFilteredRandomWord } from '../src/getWord'
import { NounListDoc } from '../src/services/api/response/nounList'

describe('getFilteredRandomWord', () => {
  const fakeWords: NounListDoc['words'] = [
    'apple',
    'banana',
    'cherry',
    'kiwi',
    'grape',
  ]

  beforeEach(() => {
    cy.stub(nounListService, 'getNounList')
      .as('getNounList')
      .resolves(fakeWords)
  })

  it('should return a random word when noun list is available', async () => {
    const result = await getFilteredRandomWord()

    expect(fakeWords).to.include(result)
  })

  it('should filter words by minimum length', async () => {
    const result = await getFilteredRandomWord(5) // filter by words with length >= 5

    expect(result).to.be.oneOf(['apple', 'banana', 'cherry', 'grape'])
  })

  it('should filter words by maximum length', async () => {
    const result = await getFilteredRandomWord(undefined, 5) // filter by words with length <= 5

    expect(result).to.be.oneOf(['apple', 'kiwi', 'grape'])
  })

  it('should return null when no words match the filters', async () => {
    const result = await getFilteredRandomWord(10, 3) // Filter words longer than 10 and shorter than 3

    expect(result).to.be.null
  })
})
