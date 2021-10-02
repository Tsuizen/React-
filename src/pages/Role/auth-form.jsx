import React, { useState, useImperativeHandle } from 'react'
import { Form, Tree, Input } from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item

function AuthForm(props, ref) {
  const menus = props.role.menus
  const { role } = props

  const [prevProps, setPrevProps] = useState(null)
  const [checkedKeys, setCheckedKeys] = useState(menus)

  if (props !== prevProps) {
    setCheckedKeys(menus)
    setPrevProps(props)
  }

  useImperativeHandle(ref, () => ({
    getMenus: () => checkedKeys
  }))

  // eslint-disable-next-line
  const getMenus = () => checkedKeys

  const getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push({
        title: item.title,
        key: item.key,
        children: item.children ? item.children : null
      })
      return pre
    }, [])
  }

  //选中某个node时的回调
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys)
  }

  const treeNodes = getTreeNodes(menuList)

  const formItemLayout = {
    labelCol: { span: 4 }, // 左侧 label 的宽度
    wrapperCol: { span: 15 } // 右侧包裹的宽度
  }

  return (
    <Form>
      <Item label="角色名称" {...formItemLayout}>
        <Input value={role.name} disabled />
      </Item>
      <Tree
        checkable
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={treeNodes}
      />
    </Form>
  )
}

export default React.forwardRef(AuthForm)
