import { DownloadManager } from '../domain/repositories/DownloadManager'
import { downloadFile } from './libs/downloadFile'

const downloader: DownloadManager = {
  async downloadTextFile(file) {
    downloadFile(file.name, file.content)
  },
}

export const useDownloadManager = () => {
  return downloader
}