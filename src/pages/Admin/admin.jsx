import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'

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
// import storageUtils from '../../utils/storageUtils'

const { Footer, Sider, Content } = Layout

export default function Admin() {
  const user = useSelector((state) => state.user)
  //如果内存中没有user=>当前没有登陆
  if (!user._id) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Layout style={{ minHeight: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content
            style={{
              margin: '20px 20px 0',
              backgroundColor: 'white',
              overflow: 'initial'
            }}
          >
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
          <Footer style={{ textAlign: 'center', color: 'gray' }}>
            推荐使用谷歌浏览器， 可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}
