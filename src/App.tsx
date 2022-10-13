import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { EditorArea } from './components/EditorArea'
import style from './App.module.scss'
import { FolderInterface } from './interfaces/Folder'
import { Folder } from './features/folder/Folder'
import { Route, Routes, Navigate } from 'react-router-dom'

const folder: FolderInterface = {
  type: 'folder',
  name: 'Root',
  child: [
    {
      type: 'file',
      name: 'myfile.txt',
    },
    {
      type: 'folder',
      name: 'subfolder',
      child: [
        {
          type: 'file',
          name: 'file1.txt',
        },
        {
          type: 'file',
          name: 'file2.txt',
        },
        {
          type: 'file',
          name: 'file3.txt',
        },
        {
          type: 'folder',
          name: 'subfolder',
          child: [
            {
              type: 'file',
              name: 'file1.txt',
            },
            {
              type: 'file',
              name: 'file2.txt',
            },
            {
              type: 'file',
              name: 'file3.txt',
            },
          ],
        },
      ],
    },
  ],
}

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <Routes>
        <Route path='/' element={<Navigate to="/files" />} />
        <Route path='/files' element={<SubNav title='Files'><Folder folder={folder} /></SubNav>} />
        <Route path='/search' element={<SubNav title='Search'>Search</SubNav>} />
        <Route path='/settings' element={<SubNav title='Settings'>Settings</SubNav>} />
      </Routes>
      <EditorArea />
    </div>
  )
}

export default App
