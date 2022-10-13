import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { EditorArea } from './components/EditorArea'
import style from './App.module.scss'
import { FolderInterface } from './interfaces/Folder'
import { Folder } from './features/folder/Folder'
import { Route, Routes } from 'react-router-dom'

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
        <Route path='/' element={<SubNav><Folder folder={folder} /></SubNav>} />
        <Route path='/search' element={<SubNav>Search</SubNav>} />
        <Route path='/settings' element={<SubNav>Settings</SubNav>} />
        <Route path='*' element={<SubNav> </SubNav>} />
      </Routes>
      <EditorArea />
    </div>
  )
}

export default App
