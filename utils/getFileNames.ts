import fs from 'fs';

export const getFileNames = (path: string) => {
  const files = fs.readdirSync(path);
  const fileNames = files.map(file => file.split('.')[0]);

  return fileNames;
}