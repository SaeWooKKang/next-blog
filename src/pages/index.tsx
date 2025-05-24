import Link from 'next/link';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../shared/component/layout';
import {
  PostService,
} from '../shared/service/post.service';

type PostsProps = {
  postMetaList: Awaited<ReturnType<typeof PostService.getMetaList>>
};
export const getStaticProps = (async () => {
  const postMetaList = await PostService.getMetaList();

  return {
    props: {
      postMetaList,
    },
  };
}) satisfies GetStaticProps<PostsProps>;

export default function Posts(
  { postMetaList }: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <Layout>
      <h1 className="orderby-latest mb-[30px]">Posts</h1>

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
    </Layout>
  );
}
