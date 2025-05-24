import Head from 'next/head';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostService } from '../../shared/service/post.service';

import Layout from '../../shared/component/layout';
import Comment from '../../domain/blog/comment';
import { useScrollToTitle } from '../../domain/blog/posting/useScrollToTitle';

export const getStaticPaths = () => {
  const paths = PostService
    .getAllPaths()
    .map((fileName) => ({ params: { id: fileName } }));

  return { paths, fallback: false };
};

type PostProps = { post: Awaited<ReturnType<typeof PostService.getHTML>> };
export const getStaticProps = (async (context) => {
  if (!context.params || !context.params.id) {
    return { notFound: true };
  }
  const post = await PostService.getHTML(context.params.id as string);

  return { props: { post } };
}) satisfies GetStaticProps<PostProps>;

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  useScrollToTitle();

  return (
    <Layout>
      <Head>
        <title>{post.meta.title}</title>

        <meta name="author" content="새우 (saewoo)" />
        <meta name="description" content={post.meta.description} />
        <meta name="keyword" content={post.meta.keyword} />
      </Head>

      <article className="post-article">
        <div className="post-article-header">
          <div className="date">{post.meta.date.split(' ')[0]}</div>
          <h1>{post.meta.title}</h1>
          <h3>{post.meta.description}</h3>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <Comment />
    </Layout>
  );
}

export default Post;
