import { React, useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/LinkButton'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default function Category() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [parentId, setParentId] = useState('0')
  const [parentName, setParentName] = useState('')
  const [showStatus, setShowStatus] = useState(0)
  const [categoryId, setCategoryId] = useState()

  let form
  let categoryName

  /* 获取分类列表 */
  const getCategories = async (reqId) => {
    setLoading(true)
    reqId = reqId || parentId
    const result = await reqCategories(reqId)
    setLoading(false)
    if (result.status === 200) {
      const categories = result.data.data
      if (reqId === '0') {
        setCategories(categories)
      } else {
        setSubCategories(categories)
      }
    } else {
      message.error('请求失败')
    }
  }

  /* 更新parentId和parentName以获得二级列表 */
  const showSubCategories = (category) => {
    setParentId(category._id)
    setParentName(category.name)
  }

  /* 由二级列表返回一级列表 */
  const showCategories = () => {
    setParentId('0')
    setParentName('')
    setSubCategories([])
  }

  /* 增加分类对话框 */
  const showAdd = () => {
    setShowStatus(1)
  }

  /* 修改分类对话框 */
  const showUpdate = (c) => {
    setCategoryId(c._id)
    console.log(c._id)
    setShowStatus(2)
  }

  const addCategory = async () => {
    //获得数据
    const { parentId: formParentId, category: formCategoryName } =
      form.getFieldsValue()

    //重置表单
    setShowStatus(0)
    form.resetFields()

    //添加数据
    const result = await reqAddCategory(formCategoryName, formParentId)
    console.log(result.status)
    if (result.status === 200) {
      if (parentId === formParentId) {
        getCategories()
      } else if (parentId === '0') {
        getCategories('0')
      }
    }
  }

  /* 更新分类 */
  const updateCategory = async () => {
    const { categoryName: formCategoryName } =
      form.getFieldsValue()

    setShowStatus(0)
    form.resetFields()

    const result = await reqUpdateCategory(categoryId, formCategoryName)
    if (result.status === 200) {
      getCategories()
    }
  }

  //数组中的值发生变化才会更新
  useEffect(() => {
    getCategories()
    console.log(parentName)
    // eslint-disable-next-line
  }, [parentId, parentName])

  /*   useEffect(()=>{
    getCategories()
  }, [parentId, parentName]) */

  //card左侧
  const title =
    parentId === '0' ? (
      '一级分类列表'
    ) : (
      <span>
        <LinkButton onClick={() => showCategories()}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    )

  //card的右侧
  const extra = (
    <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>
      添加
    </Button>
  )

  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name' //显示数据对应的属性名
    },
    {
      title: '操作',
      width: 300,
      render: (category) => (
        //返回需要显示的界面标签
        <span>
          <LinkButton onClick={()=>showUpdate(category)}>修改分类</LinkButton>
          {parentId === '0' ? (
            <LinkButton onClick={() => showSubCategories(category)}>
              查看子分类
            </LinkButton>
          ) : null}
        </span>
      )
    }
  ]

  return (
    <Card title={title} extra={extra}>
      <Table
        columns={columns}
        dataSource={parentId === '0' ? categories : subCategories}
        bordered
        rowKey="_id"
        pagination={{ defaultPageSize: 5 }}
        loading={loading}
      />
      <Modal
        title="添加分类"
        visible={showStatus === 1}
        onOk={addCategory}
        onCancel={() => setShowStatus(0)}
      >
        <AddForm
          categories={categories}
          parentId={parentId}
          setForm={(f) => (form = f)}
        ></AddForm>
      </Modal>
      <Modal
        title="更新分类"
        visible={showStatus === 2}
        onOk={updateCategory}
        onCancel={() => setShowStatus(0)}
      >
        <UpdateForm
          categoryName={categoryName}
          setForm={(f) => (form = f)}
        ></UpdateForm>
      </Modal>
    </Card>
  )
}
