import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MESSAGW,
  RESET_USER
} from './action-type'

import storageUtils from '../utils/storageUtils'
import { reqLogin } from '../api/index'
import memoryUtils from '../utils/memoryUtils'

/* 设置头部标题的action */
export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  data: headTitle
})

/* 接收用户的action */
export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

/* 展示错误信息的action */
export const showErrorMessage = (error) => ({ type: SHOW_ERROR_MESSAGW, error })

/* 登出的action */
export const logout = () => {
  storageUtils.removeUser()
  return { type: RESET_USER }
}

/* 登陆的action */
export const login = (username, password) => async (dispatch) => {
  const result = await reqLogin(username, password)
  if (result.status === 0) {
    const user = result.data
    storageUtils.saveUser(user)
    dispatch(receiveUser(user))
  } else {
    const msg = result.msg
    dispatch(showErrorMessage(msg))
  }
}
