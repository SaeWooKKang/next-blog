import fs from 'fs';

export class File {
  static getFile(path: fs.PathLike, option: BufferEncoding) {
    return fs.readFileSync(path, option);
  }

  static getFileNamesInDirectory(path: fs.PathLike) {
    const files = fs.readdirSync(path);
    const fileNameWithoutExtension = files.map((file) => file.split('.')[0]);

    return fileNameWithoutExtension;
  }
}
