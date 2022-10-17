import { ExplorerItemNode } from './ExplorerItemNode'
import { FolderNode } from './FolderNode'

export interface FileInterface {
  type: 'file',
  name: string,
  id: string,
  parent?: FolderNode
}

export class FileNode extends ExplorerItemNode {
  protected data = ''

  constructor(name: string) {
    super(name)
  }

  public setData(data: string): FileNode {
    this.data = data
    return this
  }
  public get content(): string { return this.data }
  public set content(data: string) { this.setData(data) }
}