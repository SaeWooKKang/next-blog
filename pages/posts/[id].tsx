import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from "next/head";

import { createMarkup } from '../../utils/createMarkUp';
import { getFileNames } from '../../utils/getFileNames';
import { getPost } from '../../service/post.service';

export const getStaticPaths = () => {
  const paths = getFileNames('__posts').map(fileName => ({ params: {id: fileName }}));
  return { paths, fallback: false };
}
export const getStaticProps = ({ params }: { params: { id: string } }) => {
  const post = getPost(params.id);
  const key = `/api/posts/${ params.id }`;

  return { props: { fallback: { [key]: post } }};
}

const Post = () => {
  return (
    <Layout>
      <Article />
    </Layout>
  );
}

export default Post;

const Layout = ({ children }: {children: JSX.Element}) => {
  return (
    <div className='post-layout' style={{ backgroundColor: '#f8f9fb', width: '80%', margin: '0 auto' }}>
      <div style={{padding: '40px'}}>
        { children }
      </div>
    </div>
  );
}

const Article = () => {
  const { id } = useRouter().query;
  const { data: post } = useSWR(`/api/posts/${ id }`);

  return  (
    <>
      <Head>
        <title>{ post.meta.title }</title>

        <meta name='author' content='pac' />
        <meta name='description' content={ post.meta.description } />
        <meta name="keyword" content={ post.meta.keyword }/>
      </Head> 
      
      <article dangerouslySetInnerHTML={ createMarkup( post.html ) } />
    </>
  );
}