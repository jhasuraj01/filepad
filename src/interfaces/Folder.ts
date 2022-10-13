import { FileInterface } from './File'

export interface FolderInterface {
  type: 'folder',
  name: string,
  id: string,
  child: (FolderInterface | FileInterface)[]
}