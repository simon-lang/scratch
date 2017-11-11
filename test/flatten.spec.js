import {flatten} from '../src/flatten'

describe('flatten', () => {
    it('deep', () => {
        const actual = flatten([1, [2, [3, [4]], 5]])
        expect(actual).toEqual([1, 2, 3, 4, 5])
    })
})
