import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import store from './redux/store'

//读取local中保存的user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
