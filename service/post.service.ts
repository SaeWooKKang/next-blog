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
export const getPostMetas = async () => {
  const posts = getPostNames().map(fileNames => getPost(fileNames))
  const posts_meta = await Promise.allSettled(posts)
    .then(res => res.map((res: any) => res.value.meta))
    .then(res => res.sort(sortByDescendingForFileName));
  return posts_meta;
}
export const sortByDescendingForFileName = (a: any, b: any) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}