import style from './index.module.scss'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { fileStorageInteractor } from '../../../adapters/FileStorageAdapter'
import { Directory } from '../../../domain/entities/Directory'
import ExtensionLanguageMap from '../../../constants/ExtensionLanguageMap'
import { useFileAdapter } from '../../../adapters/DirectoryAdapter'
import { FileStatus } from '../../../domain/repositories/DirectoryState'

export interface EditorAreaProps {
  files: Directory.FileMetadata['id'][]
  open: Directory.FileMetadata['id']
  openFile: (fileId: string) => void
  closeFile: (fileId: string) => void
}

export function EditorArea({ files, open, openFile, closeFile }: EditorAreaProps) {

  const { fetchFile, updateContent, fileContent, fileMetadata, fileStatus } = useFileAdapter({ id: open })

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
    <div className={style.container}>
      <div className={style.titleBar}>
        <div className={`${style.title} ${style.selected}`}>
          {fileMetadata?.name || 'Loading...'}
        </div>
      </div>
      {isFileReady && <Editor
        key={open}
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
