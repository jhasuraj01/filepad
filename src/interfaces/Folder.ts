import { FileInterface } from './File'

export interface FolderInterface {
  type: 'folder',
  name: string,
  child: (FolderInterface | FileInterface)[]
}