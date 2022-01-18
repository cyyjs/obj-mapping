/*
 * @Author: cyy
 * @Date: 2022-01-18 11:49:16
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-18 12:13:06
 * @Description:
 */

/**
 * 获取number类型的数据
 */
export const number = (v: any) => +v || 0

/**
 * 获取string类型的数据
 */
export const string = (v: any) => String(v)

/**
* 获取布尔值类型的数据
*/
export const boolean = (v: any) => Boolean(v)

/**
 * 获取日期类型的数据
 */
export const date = (v: any) => new Date(v)
