import { FileNode, FileInterface } from './FileNode'
import { FolderNode, FolderInterface } from './FolderNode'

export class DirectoryTree {
  private workspace: FolderInterface
  private root: FolderNode

  constructor(workspace: FolderInterface) {
    this.workspace = workspace
    this.root = this.folder(workspace, null)
  }

  public get tree() {
    return this.root
  }

  private folder(folder: FolderInterface, parent: FolderNode | null) {
    const node = new FolderNode(folder.name).setID(folder.id).setParent(parent)
    folder.child.forEach(item => {
      if(item.type == 'file') {
        node.insert(this.file(item, parent))
      }
      else {
        node.insert(this.folder(item, parent))
      }
    })

    return node
  }

  private file(file: FileInterface, parent: FolderNode | null) {
    const root = new FileNode(file.name).setID(file.id).setParent(parent)
    return root
  }
}