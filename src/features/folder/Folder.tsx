import { FileInterface } from '../../interfaces/File'
import { FolderInterface } from '../../interfaces/Folder'
import style from './Folder.module.scss'

interface FolderProps {
  folder: FolderInterface
}
interface FileProps {
  file: FileInterface
}
interface FilesAndFoldersProps {
  filesAndFolders: (FileInterface | FolderInterface)[]
}

export function FilesAndFolders({ filesAndFolders }: FilesAndFoldersProps) {
  return <>{
    filesAndFolders.map(f => {
      if(f.type == 'file')
        return <File key={f.name} file={f} />
      else
        return <Folder key={f.name} folder={f}/>
    })
  }</>
}

export function File({ file }: FileProps) {
  return <div className={style.file}>{file.name}</div>
}

export function Folder({ folder }: FolderProps) {
  return (
    <div className={style.folder}>
      <div className={style.name}>{folder.name}</div>
      <div className={style.child}>
        <FilesAndFolders filesAndFolders={folder.child} />
      </div>
    </div>
  )
}