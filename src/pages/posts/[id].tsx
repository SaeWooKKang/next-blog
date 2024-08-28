import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { PostService } from '../../shared/service/post.service';

import Layout from '../../shared/component/layout';
import Comment from '../../domain/blog/comment';
import { useScrollToTitle } from '../../domain/blog/posting/useScrollToTitle';

export const getStaticPaths = () => {
  const paths = PostService.getAllPaths().map(
    (fileName) => ({ params: { id: fileName } }),
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (
  { params }: { params: { id: string; }; },
) => {
  const post = await PostService.getHTML(params.id);
  const KEY = `/api/posts/${params.id}`;

  return { props: { fallback: { [KEY]: post } } };
};

function Post() {
  const { id } = useRouter().query;
  const { data: post } = useSWR(`/api/posts/${id}`);
  useScrollToTitle();

  return (
    <Layout>
      <Head>
        <title>{post.meta.title}</title>

        <meta name="author" content="pac" />
        <meta name="description" content={post.meta.description} />
        <meta name="keyword" content={post.meta.keyword} />
      </Head>

      <div className="post-article">
        <div className="post-article-header">
          <div className="date">{post.meta.date.split(' ')[0]}</div>
          <h1>{post.meta.title}</h1>
          <h3>{post.meta.description}</h3>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <Comment />
    </Layout>
  );
}

export default Post;
