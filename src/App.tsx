import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { EditorArea } from './components/EditorArea'
import style from './App.module.scss'
import { FolderInterface } from './interfaces/Folder'
import { Folder } from './features/folder/Folder'

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
      <SubNav>
        <Folder folder={folder} />
      </SubNav>
      <EditorArea />
    </div>
  )
}

export default App
