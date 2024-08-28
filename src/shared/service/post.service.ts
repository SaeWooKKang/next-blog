import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import path from 'path';
import { z } from 'zod';
import { File } from '../../common/util/fs';

const metaDataSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  thumbnail: z.string().optional(),
  slug: z.string(),
  keyword: z.string(),
});

export type PostMeta = z.infer<typeof metaDataSchema> & { url: string };

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

    try {
      const parsedContent = { meta: metaDataSchema.parse(meta), html: content };

      return parsedContent;
    } catch (error) {
      throw new Error(`ID: ${id}의 메타 데이터 파싱에 실패했습니다. ${error}`);
    }
  }

  private static sortByDescendingForFileName(a:PostMeta, b: PostMeta) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  private static getAllPostNames() {
    return File.getFileNamesInDirectory('__posts');
  }

  public static getAllPaths() {
    return PostService.getAllPostNames().map(((postName) => postName.replaceAll(' ', '-')));
  }

  public static async getHTML(id: string) {
    const parsedPostId = id.replaceAll('-', ' ');

    const { html: htmlLikes, meta } = PostService.parsePost(parsedPostId);
    const HTML = await PostService.markdownToHTML(htmlLikes);

    return { html: HTML, meta };
  }

  public static async getMetaList() {
    const postsMetaList = PostService.getAllPostNames()
      .map((fileName) => PostService.parsePost(fileName))
      .map(({ meta }) => ({ ...meta, url: `${meta.title.replaceAll(' ', '-')}` }))
      .sort(PostService.sortByDescendingForFileName);

    return postsMetaList;
  }
}
