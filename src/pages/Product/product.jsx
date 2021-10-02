import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
import ProductHome from './home'

export default function Product() {
  return (
    <Switch>
      <Route exact path="/product" component={ProductHome} />
      <Route path="/product/add-update" component={ProductAddUpdate} />
      <Route path="/product/detail" component={ProductDetail} />
      <Redirect to="/product" />
    </Switch>
  )
}
