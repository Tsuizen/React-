import React from 'react'
import { Form, Input, Select } from 'antd'

const Item = Form.Item
const Option = Select.Option

export default function UserForm(props) {
  const [form] = Form.useForm()
  props.setForm(form)
  const { user, roles } = props
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }

  return (
    <Form {...formItemLayout} form={form}>
      

      <Item label="用户名" name="username" initialValue={user.username}>
        <Input type="text" placeholder="请输入用户名" />
      </Item>

      {!user._id ? (
        <Item label="密码" name="password">
          <Input placeholder="请输入密码" type="password" />
        </Item>
      ) : null}

      <Item label="手机" name="phone" initialValue={user.phone}>
        <Input type="phone" placeholder="请输入手机号" />
      </Item>

      <Item label="邮箱" name="email" initialValue={user.email}>
        <Input type="email" placeholder="请输入邮箱" />
      </Item>

      <Item label="角色" name="role_id" initialValue={user.role_id}>
        <Select placeholder="请选择角色">
          {roles.map((role) => (
            <Option key={role._id} value={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Item>
    </Form>
  )
}
