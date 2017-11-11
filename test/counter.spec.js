import counter from '../src/reducers/counter'

const INCREMENT_ACTION = {type:'INCREMENT'}

describe('counter', () => {
    it('initial state', () => {
        let state = counter()
        expect(state).toBe(0)
    })
    it('increments', () => {
        let state = counter()
        state = counter(state, INCREMENT_ACTION)
        state = counter(state, INCREMENT_ACTION)
        state = counter(state, INCREMENT_ACTION)
        expect(state).toBe(3)
    })
})
