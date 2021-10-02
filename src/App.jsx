import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/Login/login'
import Admin from './pages/Admin/admin'

export default function App() {
  return (
    <>
      {/* 只匹配一个 */}
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </>
  )
}
