import React from 'react'
import { Form, Input } from 'antd'

const Item = Form.Item

export default function AddForm(props) {
  const [form] = Form.useForm()
  props.setForm(form)

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }
  }

  return (
    <Form form={form}>
      <Item
        label="角色名称"
        name="roleName"
        {...formItemLayout}
        initialValue=""
      >
        <Input type="text" placeholder="请输入角色名称" />
      </Item>
    </Form>
  )
}
