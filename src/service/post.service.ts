import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import { getFile, getFileNames } from '../utils/fs';

export const markdownToHTML = async (markdown: string) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkPrism)
    .process(markdown);

  return result.value;
};
export const getPostNames = () => getFileNames('__posts');
const getPostFile = (id: string) => getFile(`__posts/${id}.md`, 'utf-8');
export const getPost = async (id: string) => {
  const md = getPostFile(id);
  const { content, data: meta } = matter(md);
  const HTML = await markdownToHTML(content);

  return { meta, html: HTML };
};
export const sortByDescendingForFileName = (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime();

export const getPostMetas = async () => {
  const posts = getPostNames().map((fileNames) => getPost(fileNames));
  const postMetas = await Promise.allSettled(posts)
    .then((res) => res.map((res: any) => res.value.meta))
    .then((res) => res.sort(sortByDescendingForFileName));
  return postMetas;
};
