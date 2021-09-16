import { React, useState, useEffect } from 'react'
import { Card, Select, Button, Input, Table, message } from 'antd'

import {
  reqProducts,
  reqSearchProducts,
  reqUpdateProductStatus
} from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/LinkButton'
import { useHistory } from 'react-router-dom'

const Option = Select.Option

export default function ProductHome() {
  const [total, setTotal] = useState(0) //商品总数量
  const [products, setProducts] = useState([]) //当前页列表数据
  const [searchType, setSearchType] = useState('productName') //搜索类型
  const [searchName, setSearchName] = useState('') //搜索关键字
  const [loding, setLoding] = useState(false) //加载状态
 
  let curPageNum = 1

  let history = useHistory()

  const getProducts = async (pageNum) => {
    let result
    curPageNum = pageNum

    setLoding(true)
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      })
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    setLoding(false)

    if (result.status === 200) {
      let { total, list } = result.data.data
      setTotal(total)
      setProducts(list)
    }
  }

  const updateProductStatus = async (productId, status) => {
    const result = await reqUpdateProductStatus(productId, status)

    if (result.status === 200) {
      message.success('更新成功')
      getProducts(curPageNum || 1)
    }
  }

  const title = (
    <span>
      <Select
        value={searchType}
        style={{ width: 150 }}
        onChange={(value) => setSearchType(value)}
      >
        <Option value="productName" key="productName">
          按名称搜索
        </Option>
        <Option value="productDesc" key="productDesc">
          按描述搜索
        </Option>
      </Select>
      <Input
        placeholder="关键字"
        style={{ width: 150, marginLeft: 10, marginRight: 10 }}
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <Button type="primary" onClick={() => getProducts(1)}>
        搜索
      </Button>
    </span>
  )
  const extra = <Button type="primary"></Button>

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => <span>¥{price}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status, product) => {
        let btnText = '下架'
        let statusText = '在售'

        if (status === 2) {
          btnText = '上架'
          statusText = '已下架'
        }

        status = status === 1 ? 2 : 1

        return (
          <span>
            <Button
              type="primary"
              onClick={() => updateProductStatus(product._id, status)}
            >
              {btnText}
            </Button>
            <span>{statusText}</span>
          </span>
        )
      }
    },
    {
      title: '操作',
      width: 100,
      render: (product) => (
        <span>
          <LinkButton onClick={() => history.push('/product/detail', product)}>
            详情
          </LinkButton>
          &nbsp;&nbsp;&nbsp;
          <LinkButton
            onClick={() => history.push('/product/add-update', product)}
          >
            修改
          </LinkButton>
        </span>
      )
    }
  ]

  useEffect(() => {
    getProducts(1)
    // eslint-disable-next-line
  }, [])

  return (
    <Card title={title} extra={extra}>
      <Table
        loading={loding}
        border
        rowKey="_id"
        columns={columns}
        dataSource={products}
        pagination={{
          total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: getProducts
        }}
      />
    </Card>
  )
}
