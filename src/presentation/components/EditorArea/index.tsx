import style from './index.module.scss'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fileStorageInteractor } from '../../../adapters/FileStorageAdapter'
import { Directory } from '../../../domain/entities/Directory'
import ExtensionLanguageMap from '../../../constants/ExtensionLanguageMap'

export function EditorArea() {

  const { fileId, database } = useParams()
  const [file, setFile] = useState<Directory.FileType>({
    name: 'temp',
    type: Directory.NodeType.file,
    parentId: 'root',
    id: fileId || String(Date.now()),
    content: '',
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
        defaultLanguage={/*ExtensionLanguageMap[file.extension] ||*/ 'plaintext'}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme='vs-dark'
      />
    </div>
  )
}
