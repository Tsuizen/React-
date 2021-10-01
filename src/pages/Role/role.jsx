import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Card, Modal, message } from 'antd'

import { formateDate } from '../../utils/dateUtils'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'

export default function Role() {
  const [roles, setRoles] = useState([]) //所有角色的列表
  const [role, setRole] = useState({}) //选中的role
  const [isShowAdd, setIsShowAdd] = useState(false) //是否添加显示界面
  const [isShowAuth, setIsShowAuth] = useState(false) //是否显示设置权限界面
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const authRef = useRef()

  let form

  const [count, setCount] = useState(0)
  const addCount = () => {
    setCount(count + 1)
    console.log(count)
  }

  const getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 200) {
      setRoles(result.data.data)
    }
  }

  const onRow = (record) => {
    return {
      onClick: (event) => {
        setRole(record)
        setSelectedRowKeys([record._id])
      }
    }
  }

  const addRole = async () => {
    const { roleName } = form.getFieldsValue()
    form.resetFields()
    setIsShowAdd(false)

    const result = await reqAddRole(roleName)
    if (result.status === 200) {
      message.success('添加成功')
      getRoles()
    }
  }

  const updateRole = async () => {
    setIsShowAuth(false)
    const menus = authRef.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username

    const result = await reqUpdateRole(role)
    if (result.status === 200) {
      message.success('设置角色权限成功')
      setRoles([...roles])
    }
  }

  const title = (
    <span>
      <Button type="primary" onClick={() => setIsShowAdd(true)}>
        创建角色
      </Button>
      &nbsp;&nbsp;
      <Button
        type="primary"
        disabled={!role._id}
        onClick={() => setIsShowAuth(true)}
      >
        设置角色权限
      </Button>
    </span>
  )

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (create_time) => formateDate(create_time)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: formateDate
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    }
  ]

  useEffect(() => {
    getRoles()
    // eslint-disable-next-line
  }, [])

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
    for (let i in roles) {
      if (roles[i]._id === selectedRowKeys[0]) {
        setRole(roles[i])
      }
    }
  }

  const rowSelection = {
    onChange: onSelectChange,
    selectedRowKeys
  }

  return (
    <Card title={title}>
      <button onClick={() => addCount()}>add</button>
      <Table
        bordered
        rowKey="_id"
        dataSource={roles}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        rowSelection={{ type: 'radio', ...rowSelection }}
        onRow={onRow}
      />
      <Modal
        title="添加角色"
        visible={isShowAdd}
        onOk={addRole}
        onCancel={() => {
          setIsShowAdd(false)
          form.resetFields()
        }}
      >
        <AddForm setForm={(f) => (form = f)} />
      </Modal>
      <Modal
        title="设置角色权限"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => {
          setIsShowAuth(false)
        }}
      >
        <AuthForm ref={authRef} role={role} />
      </Modal>
    </Card>
  )
}
