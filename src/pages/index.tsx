import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../shared/component/layout';
import {
  PostService,
} from '../shared/service/post.service';

const KEY_POST = '/api/posts';

interface Posts {
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  slug: string;
  keyword: string;
}

export const getStaticProps = async () => {
  const postsMeta = await PostService.getPostMetas();

  return {
    props: {
      fallback: {
        [KEY_POST]: postsMeta,
      },
    },
  };
};

function PostNames() {
  const { data: posts } = useSWR<Posts[]>(KEY_POST);

  return (
    <ul>
      gpt TEST!!
      {posts?.map((post) => (
        <li
          className="title-card"
          key={post.keyword}
        >
          <Link
            href={`/posts/${post.title}`}
          >
            <p className="date">
              {post.date}
            </p>

            <h2
              className="title"
            >
              {post.title}
            </h2>

            <div className="description">
              {post.description}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Index() {
  return (
    <Layout>
      <h1 className="orderby-latest">Latest</h1>
      <PostNames />
    </Layout>
  );
}

export default Index;
