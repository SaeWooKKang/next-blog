import useSWR, { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { createMarkup } from '../../utils/createMarkUp';
import { getFileNames } from '../../utils/getFileNames';
import { fetcher } from '../../utils/api';
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

const Post = ({ fallback } :{ fallback: { ['api']: string }}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <Article />
      </Layout>
    </SWRConfig>
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
  const { query } = useRouter();
  const { data } = useSWR(`/api/posts/${ query.id }`, fetcher);

  return  <div dangerouslySetInnerHTML={ createMarkup(data) } />;
}