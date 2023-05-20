import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../components/layout';
import {
  PostService,
} from '../service/post.service';

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
    <div>
      {posts?.map((post) => (
        <div
          className="title-card"
          key={post.keyword}
        >
          <p className="date">
            {post.date}
          </p>

          <Link
            href={`/posts/${post.title}`}
            className="title"
          >
            {post.title}
          </Link>

          <div className="description">
            {post.description}
          </div>
        </div>
      ))}
    </div>
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
