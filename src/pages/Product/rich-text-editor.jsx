import { React, useState, useImperativeHandle, forwardRef } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function RichTextEditor(props, ref) {
  const detail = props.detail

  let es

  if (detail) {
    const blocksFromHtml = htmlToDraft(detail)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    )
    es = EditorState.createWithContent(contentState)
  } else {
    es = EditorState.createEmpty()
  }

  const [editorState, setEditorState] = useState(es)

  const onEditorChange = (editorState) => {
    setEditorState(editorState)
  }

  useImperativeHandle(ref, () => ({
    getDetail: () => {
      return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
  }))

  return (
    <Editor
      editorState={editorState}
      editorStyle={{
        height: 250,
        border: '1px solid, #000',
        padding: '0 30px'
      }}
      onEditorStateChange={onEditorChange}
    ></Editor>
  )
}

export default forwardRef(RichTextEditor)
