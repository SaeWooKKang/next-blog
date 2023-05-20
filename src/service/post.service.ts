import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import { File } from '../utils/fs';

export class PostService {
  static async markdownToHTML(markdown: string) {
    const result = await remark()
      .use(html, { sanitize: false })
      .use(remarkPrism)
      .process(markdown);

    return result.value;
  }

  static getAllPostNames() {
    return File.getFileNamesInDirectory('__posts');
  }

  private static getPostFile(id: string) {
    return File.getFile(`__posts/${id}.md`, 'utf-8');
  }

  static async getPost(id: string) {
    const md = this.getPostFile(id);
    const { content, data: meta } = matter(md);
    const HTML = await this.markdownToHTML(content);

    return { meta, html: HTML };
  }

  private static sortByDescendingForFileName(a: any, b: any) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  static async getPostMetas() {
    const posts = PostService.getAllPostNames().map((fileNames) => PostService.getPost(fileNames));
    const postMetas = await Promise.allSettled(posts)
      .then((res) => res.map((res: any) => res.value.meta))
      .then((res) => res.sort(PostService.sortByDescendingForFileName));
    return postMetas;
  }
}
