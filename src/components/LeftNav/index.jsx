import React, { useState } from 'react'
import { Menu } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'
import { Link, useLocation } from 'react-router-dom'

const { SubMenu } = Menu

export default function LeftNav() {
  // eslint-disable-next-line
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  let path = location.pathname
  let openKey = null

  if (path.indexOf('/product') === 0) {
    path = '/product'
  }
  
  const getMenuList = (menuList) => {
    return menuList.map((item) => {
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
    })
  }

  let menuNodes = getMenuList(menuList)

  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
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
