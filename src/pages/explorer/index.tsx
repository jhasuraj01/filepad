import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Explorer, ExplorerProps } from '../../components/Explorer'
import { FolderMetadata } from '../../entities/DirectoryNode'
import { fileStorageInteractor, rootFolder } from '../../interactor/FileStorageInteractor'
import { FileNode } from '../../libs/FileNode'
import { FolderNode } from '../../libs/FolderNode'
import { NavigatePersist } from '../../supports/Persistence'

export interface ExplorerPageProps {
  workspace: (FolderNode | FileNode)[]
}

export function ExplorerPage() {
  const { database, parentId } = useParams()
  const [folder, setFolder] = useState<FolderMetadata>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      if(database === undefined || parentId === undefined) {
        setFolder(rootFolder)
      }
      else {
        const folderContent = await fileStorageInteractor.fetchFolderMetadata(parentId, database)
        setFolder(folderContent)
      }
      setLoading(false)
    })()
  }, [parentId, database])

  // const paths = pathname?.split('/') || []

  // const directory: ExplorerProps['directory'] = [
  // {
  // name: 'Devices',
  // path: '/explorer'
  // }
  // ]

  // let abspath = ''

  // paths.forEach(folder => {
  //   for (let i = 0; i < currentWorkSpace.length; i++) {
  //     const item = currentWorkSpace[i]
  //     if(item instanceof FolderNode && folder == item.pathname) {
  //       currentWorkSpace = item.items
  //       directory.push({
  //         name: item.name,
  //         path: abspath + item.pathname
  //       })
  //       abspath += item.pathname + '/'
  //       break
  //     }
  //   }
  // })

  if(folder === undefined) {
    if(loading === false)
      return <NavigatePersist to='/404' />
    else
      return <div>Loading...</div>
  }

  return (
    <Explorer workspace={folder} />
  )
}