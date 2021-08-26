/* 包含所有请求接口函数的模块 */
import ajax from './ajax'
import jsonp from 'jsonp'
/* export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
} */

const BASE = ''

/* 登陆 */
export const reqLogin = (username, password) =>
  ajax(BASE + '/login', { username, password }, 'POST')

/* 添加用户 */
export const reqAddUser = (username, password) =>
  ajax(BASE + '/manage/user/add', { username, password }, 'POST')

/* 天气查询 */
export const reqWeather = () => {
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=440111&key=8f1309cf4295f8214246d2697b43f7b2`
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'callback' }, (error, response) => {
      if (!error && response.status === '1') {
        const weather = response.lives[0].weather
        console.log(weather);
        resolve(weather)
      } else {
        alert('获取天气信息失败')
      }
    })
  })
}