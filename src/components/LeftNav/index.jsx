import React, { useState } from 'react'
import { Menu } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'
import { Link, useLocation } from 'react-router-dom'
// import memoryUtils from '../../utils/memoryUtils'
import { useSelector } from 'react-redux'

const { SubMenu } = Menu

export default function LeftNav() {
  // eslint-disable-next-line
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  let path = location.pathname
  let openKey = null //默认打开的页
  const user = useSelector((state) => state.user)
  let menuSet = new Set(user.role.menus || [])

  if (path.indexOf('/product') === 0) {
    path = '/product'
  }

  const hasAuth = (item) => {
    // 1. 如果菜单项标识为公开
    // 2. 如果当前用户是 admin
    // 3. 如果菜单项的 key 在用户的 menus 中
    const key = item.key
    const set = menuSet
    if (item.isPublic || user.username === 'admin' || set.has(key)) {
      return true
    } else if (item.children)
      return !!item.children.find((child) => set.has(child.key))
  }

  const getMenuList = (menuList) => {
    return menuList.map((item) => {
      if (hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          )
        } else {
          if (item.children.find((cItem) => path.indexOf(cItem.key) === 0)) {
            openKey = item.key
          }
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {getMenuList(item.children)}
            </SubMenu>
          )
        }
      } else {
        return []
      }
    })
  }

  let menuNodes = getMenuList(menuList)

  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>商城后台</h1>
      </Link>
      <div>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
          // inlineCollapsed={collapsed}
        >
          {menuNodes}
        </Menu>
      </div>
    </div>
  )
}
