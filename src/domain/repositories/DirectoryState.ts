import type { Directory } from "../entities/Directory"

export enum FileStatus {
  Creating = 'Creating',
  ContentLoading = 'ContentLoading',
  ContentLoaded = 'Default',
  ChangesUnsaved = 'ChangesUnsaved',
  ChangesSaving = 'ChangesSaving',
  ChangesSaved = 'Default',
  Deleting = 'Deleting',
  Default = 'Default',
}

export enum FolderStatus {
  Creating = 'Creating',
  Default = 'Default',
  ContentLoading = 'ContentLoading',
  Deleting = 'Deleting',
}

export interface DirectoryState {
  setFileContent(file: Directory.FileContent): void
  setFileMetadata(file: Directory.FileMetadata): void
  setFolderMetadata(folder: Directory.FolderMetadata): void

  setFileStatus(file: Pick<Directory.Node, "id">, status: FileStatus): void
  setFolderStatus(file: Pick<Directory.Node, "id">, status: FolderStatus): void

  deleteFileContent(file: Pick<Directory.Node, "id">): void
  deleteFileMetadata(file: Pick<Directory.Node, "id">): void
  deleteFolderMetadata(folder: Pick<Directory.Node, "id">): void
}