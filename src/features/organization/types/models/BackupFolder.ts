export interface BackupFolder {
  name: string;
  queryPermission: (o: { mode: 'readwrite' }) => Promise<string>;
  getFileHandle: (
    name: string,
    o: {
      create: boolean;
    },
  ) => Promise<{
    createWritable: () => Promise<{
      write: (v: Blob) => Promise<void>;
      close: () => Promise<void>;
    }>;
  }>;
}
