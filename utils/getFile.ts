import fs from 'fs';

export const getFile = (path: string) => fs.readFileSync(path, "utf-8");
