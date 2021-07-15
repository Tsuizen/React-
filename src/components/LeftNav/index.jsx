import React, { useState } from 'react'
import { Menu } from 'antd'
import { PieChartOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

import './index.less'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

export default function LeftNav() {
  // eslint-disable-next-line
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </Link>
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={collapsed}
        >
          <Menu.Item key="home" icon={<PieChartOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="category" icon={<PieChartOutlined />}>
              <Link to="/category">品类管理</Link>
            </Menu.Item>
            <Menu.Item key="product" icon={<PieChartOutlined />}>
              <Link to="/product">商品管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="user" icon={<UserOutlined />} title="用户">
            <Link to="/user">用户</Link>
          </Menu.Item>
          <Menu.Item key="role" icon={<UserOutlined />} title="角色">
            <Link to="/role">角色</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}
