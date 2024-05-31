import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import path from 'path';
import { File } from '../../common/util/fs';

type ParsedContent = {
  meta: Record<string, unknown>;
  html: string;
};

const cache: Record<string, ParsedContent> = {};

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

  static async getPost(id: string) {
    if (cache[id]) {
      return cache[id];
    }

    const md = this.getPostFile(id);
    const { content, data: meta } = matter(md);
    const HTML = await this.markdownToHTML(content);

    const parsedContent = { meta, html: HTML };

    cache[id] = parsedContent;

    return parsedContent;
  }

  private static sortByDescendingForFileName(a: any, b: any) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  static async getPostMetaList() {
    const posts = PostService.getAllPostNames()
      .map((fileName) => PostService.getPost(fileName));

    const postMetas = await Promise.allSettled(posts)
      .then((res) => res.map((res: any) => res.value.meta))
      .then((res) => res.sort(PostService.sortByDescendingForFileName));

    return postMetas;
  }
}
