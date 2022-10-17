import { getFileNames } from '../utils/getFileNames';
import { getFile } from '../utils/getFile';
import { markdownToHTML } from '../utils/markdownToHTML';
import matter from "gray-matter";

const getPostFile = (id: string) => {
  return getFile(`__posts/${ id }.md`);
}
export const getPostNames = () => {
  return getFileNames('__posts');
}
export const getPost = (id: string) => {
  const md = getPostFile(id);
  const { content, data: meta } = matter(md);
  const HTML = markdownToHTML(content);

  return { meta, html: HTML };
}
