import Link from "next/link";
import useSWR from 'swr';

import Layout from "../components/layout";
import {
  getPostMetas,
} from '../service/post.service';

const KEY_POST = `/api/posts`;

interface Posts {
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  slug: string;
  keyword: string;
}

export const getStaticProps = async () => {
  const posts_meta = await getPostMetas();
  return {
    props: {
      fallback: {
        [KEY_POST]: posts_meta
      }
    }
  };
};

const Index = () => {
  return (
    <Layout>
      <h1 className="orderby-latest">Latest</h1>
      <PostNames />
    </Layout>
  );
};
export default Index;

const PostNames = () => {
  const { data: Posts } = useSWR<Posts[]>(KEY_POST);

  // if (!Posts) {
  //   console.log(Posts);

  //   return <div>sorry</div>;
  // }
  return (
    <div>
      {Posts?.map((post, idx) => (
        <div
          className='title-card'
          key={idx}
        >
          <p className='date'>
            {post.date}
          </p>

          <Link
            href={`/posts/${post.title}`}
            className="title"
          >
            {post.title}
          </Link>

          <div className='description'>
            {post.description}
          </div>
        </div>
      ))}
    </div>
  );
};