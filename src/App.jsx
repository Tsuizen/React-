import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/Login/index'
import Admin from './pages/Admin/index'

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
