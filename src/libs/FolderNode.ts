import { ExplorerItemNode } from './ExplorerItemNode'
import { FileInterface, FileNode } from './FileNode'

export interface FolderInterface {
  type: 'folder',
  name: string,
  id: string,
  child: (FolderInterface | FileInterface)[]
}

export class FolderNode extends ExplorerItemNode {
  private ITEMS: (FolderNode | FileNode)[] = []

  constructor(name: string) {
    super(name)
  }

  public insert(item: FolderNode | FileNode): FolderNode {
    this.ITEMS.push(item)
    this.ITEMS.sort((a, b) => {
      if(a instanceof FolderNode) return -1
      if(b instanceof FolderNode) return -1
      return a.name.localeCompare(b.name)
    })
    return this
  }

  public removeItem(item: ExplorerItemNode) {
    this.ITEMS = this.ITEMS.filter(_item => _item != item)
  }

  public get items(): (FolderNode | FileNode)[] {
    return this.ITEMS
  }

}