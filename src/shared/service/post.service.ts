import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import path from 'path';
import { File } from '../../common/util/fs';

export class PostService {
  private static async markdownToHTML(markdown: string) {
    const result = await remark()
      .use(html, { sanitize: false })
      .use(remarkPrism)
      .process(markdown);

    return result.toString();
  }

  private static getPostFile(id: string) {
    const filePath = path.join('__posts', `${id}.md`);
    const fileContent = File.getFile(filePath, 'utf-8');

    return fileContent;
  }

  private static parsePost(id: string) {
    const md = this.getPostFile(id);
    const { data: meta, content } = matter(md);

    const parsedContent = { meta, html: content };

    return parsedContent;
  }

  private static sortByDescendingForFileName(a: any, b: any) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  public static getAllPostNames() {
    return File.getFileNamesInDirectory('__posts');
  }

  public static async getHTML(id: string) {
    const { html: htmlLikes, meta } = PostService.parsePost(id);
    const HTML = await PostService.markdownToHTML(htmlLikes);

    return { html: HTML, meta };
  }

  public static async getMetaList() {
    const postsMetaList = PostService.getAllPostNames()
      .map((fileName) => PostService.parsePost(fileName))
      .map((post) => post.meta)
      .sort(PostService.sortByDescendingForFileName);

    return postsMetaList;
  }
}
