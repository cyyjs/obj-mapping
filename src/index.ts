/*
 * @Author: cyy
 * @Date: 2022-01-14 16:02:34
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-18 16:47:10
 * @Description:
 */
import { get as _get } from 'lodash'
import * as defaultPipeline from './pipeline'
type Obj = Record<string, any>
type Pipeline = Record<string, Function>
let pipeline: Pipeline = defaultPipeline

export const usePipeline = (newPipeline: Pipeline) => {
  pipeline = { ...pipeline, ...newPipeline }
}

export const mappingItem = (data: Obj = {}, mapping: Obj = {}) => {
  const newItem: Obj = {}
  Object.keys(mapping).forEach(key => {
    const value = mapping[key]
    if (typeof value === 'function') {
      newItem[key] = value(data, newItem)
    } else if (typeof value === 'string') {
      const values = value.replace(/\s/g, '').split('|')
      const v = _get(data, values[0])
      if (values.length === 1) {
        newItem[key] = v
      } else {
        newItem[key] = values.slice(1).reduce((acc, cur) => {
          return pipeline[cur](acc)
        }, v)
      }
    } else {
      newItem[key] = value
    }
  })
  return newItem
}

export const mapping = (data: Obj | Obj[] = [], mapping: Obj = {}) => {
  if (Array.isArray(data)) {
    return data.map(item => mappingItem(item, mapping))
  } else {
    return mappingItem(data, mapping)
  }
}

// class Mapping {
//   pipeline: Pipeline
//   constructor (pipeline: Pipeline = {}) {
//     this.pipeline = merge(defaultPipeline, pipeline)
//   }

//   use (pipeline: Pipeline) {
//     this.pipeline = merge(this.pipeline, pipeline)
//   }

//   /**
//  * 数据映射处理
//  * @param {Object} item 要mapping的数据对象
//  * @param {Object} mapping 数据映射
//  */
//   static mappingItem (data: Obj = {}, mapping: Obj = {}) {
//     const newItem: Obj = {}
//     Object.keys(mapping).forEach(key => {
//       const value = mapping[key]
//       if (typeof value === 'function') {
//         newItem[key] = value(data, newItem)
//       } else if (typeof value === 'string') {
//         const values = value.replace(/\s/g, '').split('|')
//         const v = _get(data, values[0])
//         if (values.length === 1) {
//           newItem[key] = v
//         } else {
//           newItem[key] = values.slice(1).reduce((acc, cur) => {
//             return this.pipeline[cur](acc)
//           }, v)
//         }
//       } else {
//         newItem[key] = value
//       }
//     })
//     return newItem
//   }

//   /**
//    * 数据映射处理
//    * @param {Array|Object} data 原始数据
//    * @param {Object} mapping 数据映射关系
//    */
//   static mapping (data: Obj | Obj[] = [], mapping: Obj = {}) {
//     if (Array.isArray(data)) {
//       return data.map(item => this.mappingItem(item, mapping))
//     } else {
//       return this.mappingItem(data, mapping)
//     }
//   }
// }

// export default Mapping
