
import joinClassNames from '.'

describe('joinClassNames', () => {
    it('should generate the correct URL with values and params', () => {
        const firstClass = 'Container'
        const secondClass = 'List'
        const expectClass = 'Container List'
        expect(joinClassNames(firstClass, secondClass)).toEqual(expectClass)
    })
})