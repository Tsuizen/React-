import React from 'react'
import { Button, message } from 'antd'

export default function App() {

  const handleClick = () => {
    message.success('成功了')
  }

  return (
    <div>
      <Button type="primary" onClick={handleClick}>Primary</Button>
    </div>
  )
}
