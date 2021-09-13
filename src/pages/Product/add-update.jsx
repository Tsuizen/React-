import { React, useState,  useForm } from 'react'
import { Form, Card, Input, Cascader, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import LinkButton from '../../components/LinkButton'

import TextArea from 'rc-textarea'

const Item = Form.Item

export default function ProductAddUpdate(props) {
  const [options, setOptions] = useState([])

  const [form] = useForm()

  let isUpdate
  let product
  let { categoryId, pCategoryId } = product
  let loadData

  const title = (
    <span>
      <LinkButton>
        <ArrowLeftOutlined style={{ fontSize: 20 }} />
      </LinkButton>
      <LinkButton>{isUpdate ? '修改商品' : '添加商品'}</LinkButton>
    </span>
  )

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 }
  }

  const submit = () => {}

  return (
    <Card tilte={title}>
      <Form form={form}>
        <Item
          label="商品名称"
          {...formItemLayout}
          rules={[{ required: true }, { message: '商品名称必须输入' }]}
        >
          <Input placeholder="请输入商品名称" />
        </Item>
        <Item
          label="商品描述"
          {...formItemLayout}
          rules={[{ required: true }, { message: '商品描述必须输入' }]}
        >
          <TextArea placeholder="请输入商品描述" autosize />
        </Item>
        <Item
          label="商品价格"
          {...formItemLayout}
          rules={[{ required: true }, { message: '商品价格必须输入' }]}
        >
          <Input
            type="number"
            placeholder="请输入商品价格"
            addonAfter="元"
          ></Input>
        </Item>
        <Item
          label="商品分类"
          {...formItemLayout}
          rules={[{ required: true }, { message: '商品分类必须输入' }]}
        >
          <Cascader options={options} loadData={loadData} />
        </Item>
        <Item label="商品图片" {...formItemLayout}></Item>
        <Item
          label="商品详情"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
        ></Item>
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      </Form>
    </Card>
  )
}
