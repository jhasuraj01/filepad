import { FolderNode } from './FolderNode'

export class ExplorerItemNode {
  protected NAME: string
  protected ID: string
  protected PARENT: FolderNode | null

  constructor(name: string) {
    this.NAME = name
    this.ID = String(Math.random())
    this.PARENT = null
  }

  public setName(name: string) {
    this.NAME = name
    return this
  }
  public set name(_name: string) { this.setName(_name) }
  public get name() { return this.NAME }

  public setID(id: string | number) {
    this.ID = String(id)
    return this
  }
  public set id(_id: string) { this.setID(_id) }
  public get id() { return this.ID }

  public get pathname() {
    return this.name.split(' ').join('-').toLocaleLowerCase()
  }

  public setParent(parent: FolderNode | null) {
    this.PARENT = parent
    return this
  }
  public set parent(_parent: FolderNode | null) { this.setParent(_parent) }
  public get parent() { return this.PARENT }

  public removeSelf() {
    this.parent?.removeItem(this)
    return this
  }
}