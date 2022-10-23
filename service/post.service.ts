import { getFile, getFileNames } from '../utils/fs';
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkPrism from "remark-prism";

export const markdownToHTML = async (markdown: string) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkPrism)
    .process(markdown);
  
  return result.value;
}
export const getPostNames = () => {
  return getFileNames('__posts');
}
const getPostFile = (id: string) => {
  return getFile(`__posts/${ id }.md`, 'utf-8');
}
export const getPost = async (id: string) => {
  const md = getPostFile(id);
  const { content, data: meta } = matter(md);
  const HTML = await markdownToHTML(content);

  return { meta, html: HTML };
}
export const sortByDescendingForFileName = (name1: string, name2: string)  => {
  const plusOrMinus = Number(name2.split('_')[0]) - Number(name1.split('_')[0]);
  return plusOrMinus;
};