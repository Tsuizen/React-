import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'


const Item = Form.Item

function UpdateForm(props) {
  const [form] = Form.useForm()
  const { categoryName } = props
  props.setForm(form)

  return (
    <Form form={form}>
      <Item name="categoryName" initialValue={categoryName}>
        <Input placeholder="请输入分类名称" />
      </Item>
    </Form>
  )
}

Form.useForm.propTypes = {
  categories: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired
}

export default UpdateForm
