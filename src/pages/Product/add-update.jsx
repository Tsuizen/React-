import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Form, Card, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import LinkButton from '../../components/LinkButton'

import TextArea from 'rc-textarea'
import { reqAddOrUpdateProduct, reqCategories } from '../../api'

const Item = Form.Item

export default function ProductAddUpdate(props) {
  const [options, setOptions] = useState([])
  const location = useLocation()
  const [form] = Form.useForm()
  const history = useHistory()

  let product = location.state
  product = product || {}
  let isUpdate = !!product
  let { categoryId, pCategoryId } = product

  // 级联列表显示的数组
  const categoryIds = []

  if (isUpdate) {
    if (pCategoryId === '0') {
      categoryIds.push(categoryId)
    } else {
      categoryIds.push(pCategoryId)
      categoryIds.push(categoryId)
    }
  }

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

  /*
    选择某个分类项时的回调
    加载对应的二级分类显示
  */
  const loadData = async (selectedOptions) => {
    console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1]
    console.log('target', targetOption)
    targetOption.loading = true
    const subCategories = await getCategories(targetOption.value)
    targetOption.loadding = false

    console.log(subCategories)
    if (subCategories && subCategories.length > 0) {
      // 有子分类
      // 生成一个二级的 options
      const cOptions = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))

      // 添加为对应的 option 的 children(子 options)
      targetOption.children = cOptions
    } else {
      // 没有子分类
      targetOption.isLeaf = true
      console.log('没有子分类')
    }
    setOptions([...options])
  }

  const getCategories = async (parentId) => {
    const result = await reqCategories(parentId)
    if (result.status === 200) {
      const categories = result.data.data
      if (parentId === '0') {
        initOptions(categories)
      } else {
        return categories
      }
    }
  }

  const initOptions = async (cateogoies) => {
    const optionList = cateogoies.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))

    if (isUpdate && product.pCategoryId !== '0') {
      const subCategories = await getCategories(product.pCategoryId)

      if (subCategories && subCategories.length > 0) {
        const cOptions = subCategories.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: true
        }))

        const targetOption = optionList.find(
          (option) => option.value === product.pCategoryId
        )

        targetOption.children = cOptions
      }
    }
    setOptions(optionList)
  }

  const validatePrice = (rule, value, callback) => {
    value = value * 1
    if (value > 0) {
      callback()
    } else {
      callback('价格必须是大于0的数值')
    }
  }

  const submit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { name, desc, price, category } = values
        console.log('@',values)
        let pCategoryId = ''
        let categoryId = ''
      
        if (category.length === 1) {
          //一级级联
          pCategoryId = '0'
          categoryId = category[0]
        } else {
          pCategoryId = category[0]
          categoryId = category[1]
        }

        const product_submit = { name, desc, price, pCategoryId, categoryId }

        if (isUpdate) {
          product_submit._id = product._id
        }

        const result = await reqAddOrUpdateProduct(product_submit)
      
        if (result.data.status === 0) {
          message.success('保存成功')
          history.goBack()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getCategories('0')
    console.log(product.price)
    // eslint-disable-next-line
  }, [])

  return (
    <Card tilte={title}>
      <Form form={form}>
        <Item
          name="name"
          label="商品名称"
          initialValue={product.name}
          {...formItemLayout}
          rules={[{ required: true }, { message: '商品名称必须输入' }]}
        >
          <Input placeholder="请输入商品名称" />
        </Item>
        <Item
          name="desc"
          initialValue={product.desc}
          label="商品描述"
          {...formItemLayout}
          rules={[{ required: true }, { message: '商品描述必须输入' }]}
        >
          <TextArea placeholder="请输入商品描述" />
        </Item>
        <Item
          name="price"
          initialValue={product.price}
          label="商品价格"
          {...formItemLayout}
          rules={[{ required: true }, { validator: validatePrice }]}
        >
          <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
        </Item>
        <Item
          name="category"
          label="商品分类"
          {...formItemLayout}
          rules={[{ required: true }]}
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
