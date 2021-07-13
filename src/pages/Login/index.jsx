import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './index.less'
import logo from './images/logo.png'

/* 登陆路由组件 */
export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
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
              { min: 4, message: '密码不能少于4个字符' },
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
