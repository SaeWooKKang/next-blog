// eslint-disable-next-line import/no-extraneous-dependencies
import RSS from 'rss';
import { PostService } from '../../shared/service/post.service';

export async function GET() {
  const feed = new RSS({
    title: 'saewoo',
    site_url: 'https://saewoo.site',
    feed_url: 'https://saewoo.site/feed.xml',
  });

  const postsMetaList = await PostService.getMetaList();

  postsMetaList.forEach((postMeta) => {
    feed.item({
      title: postMeta.title,
      url: `/posts/${postMeta.url}`,
      date: postMeta.date,
      description: postMeta.description,
      categories: postMeta.keyword.split(', '),
      author: 'saewoo',
    });
  });

  return new Response(
    feed.xml({ indent: true }),
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    },
  );
}
