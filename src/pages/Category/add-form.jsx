import React from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

/* 添加分类的Form组件 */
function AddForm(props) {
  const { categories, parentId } = props
  const [form] = Form.useForm()
  props.setForm(form)

  return (
    <Form form={form}>
      <Item label="所属分类" rules={[]} name="parentId" initialValue={parentId}>
        <Select>
          <Option key="0" value="0">
            一级分类
          </Option>
          {categories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Item>
      <Item label="分类名称" name="category" initialValue={''}>
        <Input placeholder="请输入分类名称"></Input>
      </Item>
    </Form>
  )
}

AddForm.propTypes = {
  categories: PropTypes.array.isRequired,
  parentId: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired
}

export default AddForm
