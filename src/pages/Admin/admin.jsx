import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/Header'
import LeftNav from '../../components/LeftNav'
import Category from '../Category/category'
import Home from '../Home/home'
import Product from '../Product/product'
import Bar from '../Charts/bar'
import Pie from '../Charts/pie'
import Line from '../Charts/line'
import Role from '../Role/role'
import User from '../User/user'

const { Footer, Sider, Content } = Layout

export default function Admin() {
  const user = memoryUtils.user
  if (user) console.log('内存中有user：' + user)
  //如果内存中没有user=>当前没有登陆
  if (!user) {
    //自动跳转到登陆
    return <Redirect to="/login" />
  }
  return (
    <>
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: 20, backgroundColor: 'white' }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/Line" component={Line} />
              <Route path="/charts/Pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'gray' }}>Footer</Footer>
        </Layout>
      </Layout>
    </>
  )
}
