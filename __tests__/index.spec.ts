import { mapping as mappingFn, usePipeline} from '../src/index'

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
    const result = mappingFn(obj, mapping)
    expect(result).toEqual({
      e: 1,
      f: '4',
      g: true,
      h: new Date('2022/01/18')
    })
  })
})

describe('array mapping is ok', () => {
  test('mapping', () => {
    const obj = [{
      a: '1',
      b: 4,
      c: '2',
      d: '2022/01/18'
    }, {
      a: '2',
      b: 8,
      c: 0,
      d: '2022/01/19'
    }]
    const mapping = {
      e: 'a|number',
      f: 'b|string',
      g: 'c|boolean',
      h: 'd|date'
    }
    const result = mappingFn(obj, mapping)
    expect(result).toEqual([{
      e: 1,
      f: '4',
      g: true,
      h: new Date('2022/01/18')
    }, {
      e: 2,
      f: '8',
      g: false,
      h: new Date('2022/01/19')
    }])
  })
})


describe('custom pipeline is ok', () => {
  test('custom pipeline', () => {
    usePipeline({
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
    const result = mappingFn(obj, mapping)
    expect(result).toEqual({
      e: 'abcDef'
    })
  })
})

describe('multiple pipeline is ok', () => {
  test('multiple pipeline', () => {
    usePipeline({
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
    const result = mappingFn(obj, mapping)
    expect(result).toEqual({
      month: 1
    })
  })
})