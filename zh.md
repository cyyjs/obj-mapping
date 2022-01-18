## ompjs

`Json`数据字段映射转换工具库，支持自定义`管道`操作。

## 安装

```bash
yarn add ompjs
```

## 使用

```js
import { mapping as mappingFn, usePipeline} from 'ompjs'

const source = [{
  a: '1',
  b: 4,
  c: '2',
  d: '2022/01/18'
}]

const mapping = {
  e: 'a|number',
  f: 'b|string',
  g: 'c|boolean',
  h: 'd|date'
}

const result = mappingFn(obj, mapping)

// [{
//   e: 1,
//   f: '4',
//   g: true,
//   h: '2022-01-17T16:00:00.000Z'
// }]
```

### 自定义管道函数

```js
import { mapping as mappingFn, usePipeline} from 'ompjs'

usePipeline({
  // 转驼峰
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

// {
//  e: 'abcDef'
// }
```

### 使用多个管道函数

```js
import { mapping as mappingFn, usePipeline} from 'ompjs'

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
// {
//  month: 1
// }
```