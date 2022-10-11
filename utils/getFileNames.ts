import fs from 'fs';

export const getFileNames = () => {
  const files = fs.readdirSync('__posts');
  const fileNames = files.map(file => file.split('.')[0]);

  return fileNames;
}