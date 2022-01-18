import Mapping from '../src/index'

describe('mapping is ok', () => {
  test('mapping', () => {
    const obj = {
      a: '1',
      b: 4,
      c: '2',
      d: '2022/01/18'
    }
    const mapping = {
      e: 'a|number',
      f: 'b|string',
      g: 'c|boolean',
      h: 'd|date'
    }
    const result = Mapping.mapping(obj, mapping)
    expect(result).toEqual({
      e: 1,
      f: '4',
      g: true,
      h: new Date('2022/01/18')
    })
  })
})

describe('custom pipeline is ok', () => {
  test('custom pipeline', () => {
    Mapping.use({
      camel: (v:string)=> {
        return v.replace(/\_(\w)/g, (all, letter) => {
          return letter.toUpperCase()
        })
      }
    })
    const obj = {
      a: 'abc_def'
    }
    const mapping = {
      e: 'a|camel',
    }
    const result = Mapping.mapping(obj, mapping)
    expect(result).toEqual({
      e: 'abcDef'
    })
  })
})

describe('multiple pipeline is ok', () => {
  test('multiple pipeline', () => {
    Mapping.use({
      month: (v:Date)=> {
        return v.getMonth() + 1
      }
    })
    const obj = {
      a: '2022/01/18'
    }
    const mapping = {
      month: 'a|date|month',
    }
    const result = Mapping.mapping(obj, mapping)
    expect(result).toEqual({
      month: 1
    })
  })
})