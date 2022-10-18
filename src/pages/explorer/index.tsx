import { useState } from 'react'
import { Explorer } from '../../components/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface ExplorerPageProps {
  workspace: FolderNode
}
export function ExplorerPage({ workspace }: ExplorerPageProps) {
  const [folder, setFolder] = useState(workspace)
  const [parents, setParents] = useState([workspace])

  return (
    <Explorer folder={folder} setFolder={setFolder} parents={parents} setParents={setParents} />
  )
}