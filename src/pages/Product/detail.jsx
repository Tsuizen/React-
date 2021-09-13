import { React, useState, useEffect } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { reqCategory } from '../../api'
import LinkButton from '../../components/LinkButton'
import './product.less'
import { BASE_IMG_PATH } from '../../utils/constants'
import { useHistory, useLocation } from 'react-router-dom'

export default function ProductDetail() {
  const [cName1, setCName1] = useState('') //一级分类名称
  const [cName2, setCName2] = useState('') //二级分类名称

  const location = useLocation()
  const history = useHistory()

  const { name, desc, price, imgs, detail } = location.state


  const getCategoryName = async () => {
  
    const { categoryId, pCategoryId } = location.state
  
    if (pCategoryId === '0') {
      
      const result = reqCategory(categoryId)
      const cName1 = result.data.name
      setCName1(cName1)
    } else {
      const results = await Promise.all([
        reqCategory(categoryId),
        reqCategory(pCategoryId)
      ])

    
      const result1 = results[0]
      const result2 = results[1]

      console.log(result1)
      const cName1 = result1.data.data.name
      const cName2 = result2.data.data.name

      setCName1(cName1)
      setCName2(cName2)
    }
  }

  const title = (
    <span>
      <LinkButton onClick={() => history.goBack()}>
        <ArrowLeftOutlined style={{ fontSize: 20 }} />
        &nbsp;&nbsp;商品详情
      </LinkButton>
    </span>
  )

  const imgStyle = {
    width: 150,
    height: 150,
    marginRight: 10,
    border: '1px solid black'
  }

  useEffect(() => {
    getCategoryName()
    // eslint-disable-next-line
  }, [])

  return (
    <Card title={title} className="product-detail">
      <List>
        <List.Item>
          <span className="left">商品名称:</span>
          <span>{name}</span>
        </List.Item>
        <List.Item>
          <span className="left">商品描述:</span>
          <span>{desc}</span>
        </List.Item>
        <List.Item>
          <span className="left">商品价格:</span>
          <span>{price}</span>
        </List.Item>
        <List.Item>
          <span className="left">所属分类:</span>
          <span>{cName1 + (cName2 ? '-->' + cName2 : '')}</span>
        </List.Item>
        <List.Item>
          <span className="left">商品图片:</span>
          <span>
            {imgs.map((img) => (
              <img src={BASE_IMG_PATH + img} alt="img" key={img} style={imgStyle} />
            ))}
          </span>
        </List.Item>
        <List.Item>
          <span className="left">商品详情:</span>
          <div dangerouslySetInnerHTML={{ __html: detail }}></div>
        </List.Item>
      </List>
    </Card>
  )
}
