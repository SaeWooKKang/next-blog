const { promises: fs } = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const RSS = require('rss');
const matter = require('gray-matter');

const generate = async () => {
  const feed = new RSS({
    title: 'saewoo',
    site_url: 'https://saewoo.site',
    feed_url: 'https://saewoo.site/feed.xml',
  });

  const postFileNames = await fs.readdir(path.join(__dirname, '../../', '/__posts'));

  await Promise.all(
    postFileNames.map(async (postFileName) => {
      const content = await fs.readFile(
        path.join(__dirname, '../../', '/__posts', postFileName),
      );
      const frontmatter = matter(content);

      feed.item({
        title: frontmatter.data.title,
        url: `/posts/${postFileName
          .replace(/\.md?/, '')
          .replaceAll(' ', '_')
        }`,
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.keyword.split(', '),
        author: 'saewoo',
      });
    }),
  );

  await fs.writeFile('./out/feed.xml', feed.xml({ indent: true }));
};

generate();
