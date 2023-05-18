import style from './index.module.scss'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useEffect } from 'react'
import { Directory } from '../../../domain/entities/Directory'
import ExtensionLanguageMap from '../../../constants/ExtensionLanguageMap'
import { useFileAdapter } from '../../../adapters/DirectoryAdapter'
import { FileStatus } from '../../../domain/repositories/DirectoryState'

export interface MonacoEditorProps {
  // files: Directory.FileMetadata[]
  fileMetadata: Directory.FileMetadata
  className?: string
}

export function MonacoEditorWrapper({ fileMetadata, className }: MonacoEditorProps) {

  const { fetchFile, updateContent, fileContent, fileStatus } = useFileAdapter(fileMetadata)

  useEffect(fetchFile, [fileMetadata.id])

  const handleEditorDidMount: OnMount = (editor) => {
    editor.focus()
  }

  const handleChange: OnChange = async (value) => {
    if(value) updateContent(value)
  }

  const isFileReady = fileContent && fileMetadata && fileStatus !== FileStatus.ContentLoading
  const extension = '.' + fileMetadata?.name?.split('.')?.reverse()[0] || ''

  return (
    <div className={`${className || ''} ${style.container}`}>
      {isFileReady && <Editor
        key={fileMetadata.id}
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
