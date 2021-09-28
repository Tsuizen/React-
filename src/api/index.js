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
        resolve(weather)
      } else {
        alert('获取天气信息失败')
      }
    })
  })
}

/* 获取一级/二级分类列表 */
export const reqCategories = (parentId) =>
  ajax(BASE + '/manage/category/list', { parentId })

/* 添加分类 */
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')

/* 更新分类 */
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

/* 获取商品分页列表 */
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + '/manage/product/list', { pageNum, pageSize })

/* 根据 ID/Name 搜索商品分页列表  */
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType
}) =>
  ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
  })

/* 更新商品上架状态 */
export const reqUpdateProductStatus = (productId, status) =>
  ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')

/* 跟据分类Id获取分类 */
export const reqCategory = (categoryId) =>
  ajax('/manage/category/info', { categoryId })

export const reqAddOrUpdateProduct = (product) =>
  ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'post')

/* 删除图片 */
export const reqDeleteImg = (name) =>
  ajax('/manage/img/delete', { name }, 'post')

/* 添加角色 */
export const reqAddRole = (roleName) =>
  ajax('/manage/role/add', { roleName }, 'POST')

/* 获取角色列表 */
export const reqRoles = () => ajax('/manage/role/list')

/* 更新角色 */
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')
