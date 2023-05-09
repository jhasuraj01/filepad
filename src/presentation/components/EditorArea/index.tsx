import style from './index.module.scss'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useEffect } from 'react'
// import { fileStorageInteractor } from '../../../adapters/FileStorageAdapter'
import { Directory } from '../../../domain/entities/Directory'
import ExtensionLanguageMap from '../../../constants/ExtensionLanguageMap'
import { useFileAdapter } from '../../../adapters/DirectoryAdapter'
import { FileStatus } from '../../../domain/repositories/DirectoryState'
import {CloseOutlined} from '@ant-design/icons'

export interface EditorAreaProps {
  files: Directory.FileMetadata[]
  open: Directory.FileMetadata
  openFile: (file: Directory.FileMetadata) => void
  closeFile: (file: Directory.FileMetadata) => void
  className?: string
}

export function EditorArea({ files, open, openFile, closeFile, className }: EditorAreaProps) {

  const { fetchFile, updateContent, fileContent, fileMetadata, fileStatus } = useFileAdapter(open)

  useEffect(fetchFile, [open])

  const handleEditorDidMount: OnMount = (editor) => {
    editor.focus()
  }

  const handleChange: OnChange = async (value) => {
    if(value) updateContent(value)
  }

  const isFileReady = fileContent && fileMetadata && fileStatus !== FileStatus.ContentLoading
  const extension = '.' + fileMetadata?.name?.split('.')?.reverse()[0] || ''

  return (
    <div className={`${className} ${style.container}`}>
      <div className={style.titleBar}>
        {
          files.map(file => (
            <div
              key={file.id}
              className={`${style.title} ${file.id === open.id && style.selected}`}
            >
              <span onClick={() => openFile(file)}>{file.name}</span>
              <span className={style.closeButton} onClick={() => closeFile(file)}><CloseOutlined /></span>
            </div>
          ))
        }
      </div>
      {isFileReady && <Editor
        key={open.id}
        defaultValue={fileContent.content}
        defaultLanguage={ExtensionLanguageMap[extension] || 'markdown'}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme='vs-dark'
        options={{wordWrap: 'on'}}
      />}
    </div>
  )
}
