import fs from 'fs';

type Option = Parameters<typeof fs.readFileSync>['1'];

export class File {
  static getFile(path: fs.PathLike, option: Option) {
    return fs.readFileSync(path, option);
  }

  static getFileNamesInDirectory(path: fs.PathLike) {
    const files = fs.readdirSync(path);
    const fileNameWithoutExtension = files.map((file) => file.split('.')[0]);

    return fileNameWithoutExtension;
  }
}
