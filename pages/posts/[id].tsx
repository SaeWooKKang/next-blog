import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from "next/head";
import Comment from '../../components/comment';

import { getPost, getPostNames } from '../../service/post.service';

import Layout from '../../components/layout';

export const getStaticPaths = () => {
  const paths = getPostNames().map(fileName => ({ params: {id: fileName }}));
  return { paths, fallback: false };
}
export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const KEY = `/api/posts/${ params.id }`;
  
  return { props: { fallback: { [KEY]: post } }};
}

const Post = () => {  
  const { id } = useRouter().query;
  const { data: post } = useSWR(`/api/posts/${ id }`);

  return (
    <Layout>
      <Head>
        <title>{ post.meta.title }</title>

        <meta name='author' content='pac' />
        <meta name='description' content={ post.meta.description } />
        <meta name="keyword" content={ post.meta.keyword }/>
      </Head> 
      
      <article className='post-article'>
        <div className='post-article-header'>
          <div className='date'>{ post.meta.date.split(' ')[0] }</div>
          <h1>{ post.meta.title }</h1>
          <h3>{ post.meta.description }</h3>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <Comment />
    </Layout>
  );
}

export default Post;