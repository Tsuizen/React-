import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { useForm } from 'antd/lib/form/Form'

const Item = Form.Item

function UpdateForm(props) {
  const [form] = Form.useForm()
  const {categoryName} = props

  props.setForm(form)

  return (
    <Form form={form}>
      <Item name="categoryName" initialValue={categoryName}>
        <Input placeholder="请输入分类名称" />
      </Item>
    </Form>
  )
}

useForm.propTypes = {
  categories: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired
}

export default UpdateForm
