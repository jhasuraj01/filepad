import { useParams } from 'react-router-dom'
import { Explorer, ExplorerProps } from '../../components/Explorer'
import { FileNode } from '../../libs/FileNode'
import { FolderNode } from '../../libs/FolderNode'

export interface ExplorerPageProps {
  workspace: (FolderNode | FileNode)[]
}

export function ExplorerPage({ workspace }: ExplorerPageProps) {
  const { '*': pathname } = useParams()
  const paths = pathname?.split('/') || []

  let currentWorkSpace = workspace

  const directory: ExplorerProps['directory'] = [
    {
      name: 'Explorer',
      path: '/explorer'
    }
  ]

  let abspath = ''

  paths.forEach(folder => {
    for (let i = 0; i < currentWorkSpace.length; i++) {
      const item = currentWorkSpace[i]
      if(item instanceof FolderNode && folder == item.id) {
        currentWorkSpace = item.items
        directory.push({
          name: item.name,
          path: abspath + item.id
        })
        abspath += item.id + '/'
        break
      }
    }
  })

  return (
    <Explorer workspace={currentWorkSpace} directory={directory} />
  )
}