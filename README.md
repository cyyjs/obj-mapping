## ompjs

Object data mapping tool library.
## Install

```bash
yarn add ompjs
```

## Usage

```js
import Mapping from 'ompjs'

const source = {
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

// {
//   e: 1,
//   f: '4',
//   g: true,
//   h: '2022-01-17T16:00:00.000Z'
// }
```

### Custom Pipeline

```js
import Mapping from 'ompjs'

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

// {
//  e: 'abcDef'
// }
```

### Multiple Pipeline

```js
import Mapping from 'ompjs'

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
// {
//  month: 1
// }
```