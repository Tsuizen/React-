import React, { useState, useEffect } from 'react'
import { message, Modal, Card, Button, Table } from 'antd'

import { reqAddOrUpdateUser, reqUsers, reqDeleteUser } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/LinkButton'
import UserForm from './user-form'

let form

export default function User() {
  const [isShow, setIsShow] = useState(false)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [user, setUser] = useState({})
  console.log('test')
  const getUsers = async () => {
    const results = await reqUsers()
    if (results.status === 200) {
      const { users: users_tmp, roles: roles_tmp } = results.data.data
      setUsers(users_tmp)
      setRoles(roles_tmp)
    }
  }

  const showAddUser = () => {
    setUser({})
    setIsShow(true)
  }

  const showUpdate = (user) => {
    setUser(user)
    setIsShow(true)
  }

  const clickDelete = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 200) {
          message.success('删除成功')
          getUsers()
        }
      }
    })
  }

  const AddOrUpdateUser = async () => {
    const user_tmp = form.getFieldsValue()
    setIsShow(false)
    form.resetFields()

    if (user_tmp) {
      user_tmp._id = user._id
    }

    const result = await reqAddOrUpdateUser(user_tmp)
    if (result.status === 200) {
      getUsers()
    }
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [user])

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      tilte: '注册时间',
      dataIndex: 'create_time',
      render: formateDate
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (value) => {
        for (let i in roles) {
          if (roles[i]._id === value) return roles[i].name
        }
      }
    },
    {
      tilte: '操作',
      render: (user) => (
        <span>
          <LinkButton onClick={() => showUpdate(user)}>修改</LinkButton>
          <LinkButton onClick={() => clickDelete(user)}>删除</LinkButton>
        </span>
      )
    }
  ]

  const title = (
    <Button type="primary" onClick={showAddUser}>
      创建用户
    </Button>
  )

  return (
    <Card title={title}>
      <Table
        columns={columns}
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        rowKey="_id"
        bordered
        dataSource={users}
      />
      <Modal
        title={user._id ? '修改用户' : '添加用户'}
        visible={isShow}
        onCancel={() => setIsShow(false)}
        // 添加destoryOnClose可以解决在关闭后initValue值不变的问题
        destroyOnClose
        onOk={AddOrUpdateUser}
      >
        <UserForm user={user} roles={roles} setForm={(f) => (form = f)} />
      </Modal>
    </Card>
  )
}
