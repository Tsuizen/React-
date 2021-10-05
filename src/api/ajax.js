/* 
能发送异步ajax请求的函数模块
封装axiox库
函数的返回值是promise对象
1.优化：统一处理请求异常
在外层抱一个自己创建的promise对象
在请求出错时，不reject，而是显示错误提示
*/
import axios from 'axios'
import { message } from 'antd'

export default async function ajax(url, data = {}, type = 'GET') {
  let response
  try {
    if (type === 'GET') {
      response = await axios.get(url, {
        params: data //指定请求参数
      })
    } else {
      response = await axios.post(url, data)
    }
    return response.data
  } catch (error) {
    message.error('error')
  }
}

// export default function ajax(url, data = {}, type = 'GET') {
//   return new Promise((resolve, reject) => {
//     // 1.ajax异步请求

//     let promise
//     if (type === 'GET') {
//       promise = axios.get(url, {
//         params: data //指定请求参数
//       })
//     } else {
//       promise = axios.post(url, data)
//     }

//     promise
//       .then((response) => {
//         // 2.如果成功了，调用resolve
//         resolve(response)
//       })
//       .catch((error) => {
//         // 3.如果失败了，不调用reject，而是提示异常信息
//         message.error('请求出错了：' + error.message)
//       })
//   })
// }
//请求登陆接口
// ajax('/login', {username: 'Tom', password: '12345'}, 'POST').then()
//添加用户信息
// ajax('/manage/add', {username: 'Tom', password: '12345'}, 'POST').then()
