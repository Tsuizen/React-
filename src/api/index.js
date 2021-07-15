/* 包含所有请求接口函数的模块 */
import ajax from './ajax'
/* export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
} */

const BASE = ''

export const reqLogin = (username, password) =>
  ajax(BASE + '/login', { username, password }, 'POST')

export const reqAddUser = (username, password) =>
  ajax(BASE + '/manage/user/add', { username, password }, 'POST')
