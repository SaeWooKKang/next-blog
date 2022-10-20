import Link from "next/link";
import useSWR from 'swr';

import Layout from "../components/layout";
import { getPostNames } from '../service/post.service';

export const getStaticProps = () => {
  const fileNames = getPostNames()
    .sort((name1, name2) => Number(name2.split('_')[0])- Number(name1.split('_')[0]));
  const key = `/api/posts`;
  return { props: { fallback: { [key]: fileNames } }};
};

const Posts = () => {
  return (
    <Layout>
      <h1 className="orderby-latest">Latest</h1>
      <Title />
    </Layout>
  );
}
export default Posts;

const Title = () => {
  const { data: Posts } = useSWR('/api/posts');
  
  return (
    <div>
      {Posts.map((fileName: string, idx: number) => (
        <article className='title-card' key={ idx }>
          <Link href={`/posts/${ fileName }`}>
            <h2>{ fileName.split('_')[1] }</h2>
          </Link>
        </article>
      ))}
    </div>
  );
}
