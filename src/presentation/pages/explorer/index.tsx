import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Explorer } from '../../components/Explorer'
import { FolderMetadata } from '../../../domain/entities/DirectoryNode'
import { fileStorageInteractor, rootFolder } from '../../../adapters/FileStorageAdapter'
import { NavigatePersist } from '../../supports/Persistence'

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