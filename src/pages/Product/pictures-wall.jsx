import { forwardRef, React, useState, useImperativeHandle } from 'react'
import { Upload, Modal, message } from 'antd'
import { useLocation } from 'react-router'
import { PlusOutlined } from '@ant-design/icons'

import { BASE_IMG_PATH, UPLOAD_IMG_NAME } from '../../utils/constants'
import { reqDeleteImg } from '../../api/index'

/* 
  管理商品图片的组件
*/
function PicturesWall(props, ref) {
  const location = useLocation()
  const imgs = location.state.imgs

  let initFileList = []
  if (imgs && imgs.length > 0) {
    // 只有一句且返回的是一个对象，大括号会被认为是函数体的大括号报错，应该用圆括号包起来
    initFileList = imgs.map((img, index) => ({
      uid: -index,
      name: img,
      status: 'done', //loading: 上传中, done: 上传完成, remove: 删除
      url: BASE_IMG_PATH + img
    }))
  }

  const [previewVisible, setPreviewVisible] = useState(false) //是否显示大图预览
  const [previewImage, setPreviewImage] = useState('') //大图的url
  const [fileList, setFileList] = useState(initFileList) //所有需要显示的图片信息对象的数组

  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  )

  useImperativeHandle(ref, () => ({
    getImgs: () => fileList.map((file) => file.name)
  }))

  const handleCancel = () => {
    setPreviewVisible(false)
  }

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewVisible(true)
  }

  const handleChange = async ({ file, fileList }) => {
    if (file.status === 'done') {
      const result = file.response

      if (result.status === 0) {
        message.success('上传成功了')
        const { name, url } = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传失败了')
      }
    } else if (file.status === 'removed') {
      const result = await reqDeleteImg(file.name)
      console.log(result)
      if (result.status === 0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }

    setFileList(fileList)
  }

  return (
    <div>
      <Upload
        action="/manage/img/upload"
        accept="image/*"
        name={UPLOAD_IMG_NAME}
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100px' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default forwardRef(PicturesWall)
