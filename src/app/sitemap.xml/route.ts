import type { MetadataRoute } from 'next';
import { PostService } from '../../shared/service/post.service';

interface CustomSitemapItem extends Omit<MetadataRoute.Sitemap[number], 'lastModified'> {
  lastModified: Date
}

type CustomSitemap = CustomSitemapItem[];

const createSitemapXML = (list: CustomSitemap) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${list
    .map(
      (item) => `
          <url>
            <loc>${item.url}</loc>
            <lastmod>${item.lastModified.toISOString()}</lastmod>
            <changefreq>${item.changeFrequency}</changefreq>
            <priority>${item.priority}</priority>
          </url>
        `,
    )
    .join('')}
  </urlset>
  `;

/**
 * @issue https://github.com/vercel/next.js/discussions/59019
 */
export async function GET() {
  const postsMetaList = await PostService.getMetaList();

  const postSiteMapList = postsMetaList.map((postMeta) => ({
    url: `https://saewoo.site/posts/${postMeta.url}`,
    lastModified: new Date(postMeta.date),
    changeFrequency: 'weekly' as const,
    priority: 0.5, // default
  }));

  const sitemap = createSitemapXML([
    {
      url: 'https://saewoo.site',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...postSiteMapList,
  ]);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
