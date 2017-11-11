import {sayHello, sayHelloLater} from '../src/closures'

jest.spyOn(global.console, 'log')
jest.useFakeTimers()

describe('closures', () => {
    it('sayHello', () => {
        sayHello('Jest')
        expect(console.log).toHaveBeenLastCalledWith('Hello Jest')
    })
    it.skip('sayHelloLater', () => {
        sayHelloLater('Lazy Jest')
        expect(console.log).toHaveBeenLastCalledWith('Hello Dr. Lazy Jest')
    })
})
