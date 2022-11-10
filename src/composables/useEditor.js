export function useEditor(message, action) {
  const toolbarConfig = {} 
  const editorRef = shallowRef()
  const editorConfig = { 
    placeholder: '在这里输入内容...',
    autoFocus: false,
    readOnly: false,
    MENU_CONF: {}
  }
  // 行高
  editorConfig.MENU_CONF['lineHeight'] = {
    lineHeightList: ['0.5', '0.75', '1', '1.25', '1.5', '2']
  }
  // 上传图片
  editorConfig.MENU_CONF['uploadImage'] = {
    server: action,
    fieldName: 'file',
    maxFileSize: 256000,
    maxNumberOfFiles: 10,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
    customInsert(res, insertFn) {
      if(res.code === 20000) insertFn(import.meta.env.VITE_APP_URL + res.data.url, '图片', '')
      if(res.code !== 20000) message.error(res.msg)
    },
    onError(file, err, res) {
      if(file.size > 256000) {
        message.error('图片大小不得超过250KB')
        return
      }
      message.error(`${file.name} 上传出错`)
    }
  }

  const handleCreated = (editor) => {
    editorRef.value = editor
  }
  
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  return { 
    toolbarConfig, 
    editorRef, 
    editorConfig,
    handleCreated,
  }
}