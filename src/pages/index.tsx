import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../shared/component/layout';
import {
  type PostMeta,
  PostService,
} from '../shared/service/post.service';

const KEY_POST = '/api/posts';

export const getStaticProps = async () => {
  const postMetaList = await PostService.getMetaList();

  return {
    props: {
      fallback: {
        [KEY_POST]: postMetaList,
      },
    },
  };
};

function PostNames() {
  const { data: postMetaList } = useSWR<Array<PostMeta>>(KEY_POST);

  return (
    <ul className="flex flex-col gap-[20px]">
      {postMetaList?.map((post) => (
        <li
          className="title-card py-[20px] border-b border-[var(--post-border)] w-full self-center cursor-pointer"
          key={post.keyword}
        >
          <Link
            href={`/posts/${post.url}`}
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
      <h1 className="orderby-latest mb-[30px]">Posts</h1>
      <PostNames />
    </Layout>
  );
}

export default Index;
