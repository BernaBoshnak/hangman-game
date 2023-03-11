import { classnames } from '../../src/utils/classnames'

describe('classnames util', () => {
  it('returns an empty string when called with no arguments', () => {
    expect(classnames()).to.eq('')
  })

  it('returns the provided string argument', () => {
    expect(classnames('col-1', 'col-2')).to.eq('col-1 col-2')
  })

  it('returns the class names conditionally from provided object', () => {
    expect(classnames({ 'col-1': true, 'col-2': false })).to.eq('col-1')
  })
})
