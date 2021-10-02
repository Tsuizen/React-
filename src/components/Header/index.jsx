import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import LinkButton from '../LinkButton'

import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

import './index.less'

export default function Header() {
  const [weather, setWeather] = useState()
  const [sysTime, setSysTime] = useState(formateDate(Date.now()))
  const history = useHistory()
  const location = useLocation()
  const username = memoryUtils.user.username

  let path = location.pathname
  //异步请求获取天气信息
  const getWeather = async () => {
    const weather = await reqWeather()
    setWeather(weather)
  }

  //动态获取标题

  const getTitle = (path) => {
    let title
    menuList.forEach((menu) => {
      if (menu.key === path) {
        title = menu.title
      } else if (menu.children) {
        menu.children.forEach((item) => {
          if (path.indexOf(item.key) === 0) {
            title = item.title
          }
        })
      }
    })
    return title
  }

  //每秒刷新一次sysTime
  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(formateDate(Date.now()))
    }, 1000)
    getWeather()
    return () => clearInterval(timer)
  }, [])

  //登出
  const logout = () => {
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        history.replace('/login')
      },
      onCancel: () => {
        console.log('cancel')
      }
    })
  }

  const title = getTitle(path)

  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎，{username}</span>
        <LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{sysTime}</span>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  )
}
