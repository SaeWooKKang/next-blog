import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import path from 'path';
import { File } from '../../common/util/fs';

export class PostService {
  static async markdownToHTML(markdown: string) {
    const result = await remark()
      .use(html, { sanitize: false })
      .use(remarkPrism)
      .process(markdown);

    return result.toString();
  }

  static getAllPostNames() {
    return File.getFileNamesInDirectory('__posts');
  }

  private static getPostFile(id: string) {
    const filePath = path.join('__posts', `${id}.md`);
    const fileContent = File.getFile(filePath, 'utf-8');

    return fileContent;
  }

  static async getPostHTML(id: string) {
    const { html: htmlLikes, meta } = await PostService.getParsedPost(id);
    const HTML = await PostService.markdownToHTML(htmlLikes);

    return { html: HTML, meta };
  }

  static async getParsedPost(id: string) {
    const md = this.getPostFile(id);
    const { data: meta, content } = matter(md);

    const parsedContent = { meta, html: content };

    return parsedContent;
  }

  private static sortByDescendingForFileName(a: any, b: any) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  static async getPostMetaList() {
    const posts = PostService.getAllPostNames()
      .map((fileName) => PostService.getParsedPost(fileName));

    const postMetas = await Promise.allSettled(posts)
      .then((res) => res.map((res: any) => res.value.meta))
      .then((res) => res.sort(PostService.sortByDescendingForFileName));

    return postMetas;
  }
}
