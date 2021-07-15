import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './index.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

/* 登陆路由组件 */
export default function Login() {
  const history = useHistory()

  //如果用户已经登陆
  const user = memoryUtils.user
  if (user._id) {
    console.log('test')
    return <Redirect to="/" />
  }

  //提交ajax请求
  const onFinish = async (values, err) => {
    const { username, password } = values
    try {
      const response = await reqLogin(username, password)
      const result = response.data

      if (result.status === 0) {
        message.success('登陆成功')

        const user = result.data
        memoryUtils.user = user //保存在内存中
        storageUtils.saveUser(user) //保存在local中

        history.replace('/')
        //跳转到管理界面
      } else {
        message.error(result.msg)
      }
    } catch {
      console.log('请求失败', err)
    }
  }

  const onFinishFailed = (err) => {
    console.log(err)
  }

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="login" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登陆</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '用户名不能为空' },
              { max: 12, message: '用户名不能多于12个字符' },
              { min: 4, message: '用户名不能少于4个字符' },
              {
                pattern: /^[0-9a-zA-Z]+$/,
                message: '用户名必须是英文，数字或下划线'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '密码不能为空' },
              { max: 12, message: '密码不能多于12个字符' },
              { min: 3, message: '密码不能少于4个字符' },
              {
                pattern: /^[0-9a-zA-Z]+$/,
                message: '密码必须是英文，数字或下划线'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
