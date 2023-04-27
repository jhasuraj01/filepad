import style from './index.module.scss'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fileStorageInteractor } from '../../../application/FileStorageInteractor'
import { DirectoryNodeType, FileType } from '../../../domain/entities/DirectoryNode'
import ExtensionLanguageMap from '../../../domain/entities/ExtensionLanguageMap'

export function EditorArea() {

  const { fileId, database } = useParams()
  const [file, setFile] = useState<FileType>({
    name: 'temp',
    extension: '.md',
    type: DirectoryNodeType.file,
    parentId: 'root',
    database: database || 'default',
    id: fileId || String(Date.now()),
    content: '',
    backupContent: '',
    createdAt: Date.now(),
    editedAt: Date.now()
  })

  console.log({ fileId, database })

  useEffect(() => {
    if(fileId === undefined || database === undefined) return
    (async () => {
      const file = await fileStorageInteractor.fetchFile({ id: fileId, database: database })
      setFile(file)
      console.log(file)
    })()
  }, [fileId, database])

  const handleEditorDidMount: OnMount = (editor) => {
    editor.focus()
  }

  const handleChange: OnChange = async (value) => {
    if(file === undefined || value == undefined) return
    file.content = value
    await fileStorageInteractor.saveFile(file)
  }

  return (
    <div className={style.container}>
      <div className={style.titleBar}>
        <div className={`${style.title} ${style.selected}`}>
          {file.name}
        </div>
      </div>
      <Editor
        key={file.id}
        defaultValue={file.content}
        defaultLanguage={ExtensionLanguageMap[file.extension] || 'plaintext'}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme='vs-dark'
      />
    </div>
  )
}
