import { Directory } from '../entities/Directory'

export interface DownloadManager {
  downloadTextFile(file: Directory.FileType): Promise<void>
}