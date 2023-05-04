import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Explorer } from '../../components/Explorer'
import { Directory } from '../../../domain/entities/Directory'
import { fileStorageInteractor } from '../../../adapters/FileStorageAdapter'
import { NavigatePersist } from '../../supports/Persistence'

export function ExplorerPage() {
  const { database, parentId } = useParams()
  const [folder, setFolder] = useState<Directory.FolderMetadata | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      if(parentId === undefined) {
        setFolder(null)
      }
      else {
        const folderContent = await fileStorageInteractor.fetchFolderMetadata(parentId)
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