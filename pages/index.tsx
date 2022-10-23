import Link from "next/link";
import useSWR from 'swr';

import Layout from "../components/layout";
import { 
  getPostNames,
  sortByDescendingForFileName
} from '../service/post.service';

const KEY_POST = `/api/posts`;

export const getStaticProps = () => {
  const fileNames = getPostNames().sort(sortByDescendingForFileName);
  return { props: { fallback: { [KEY_POST]: fileNames } }};
};

const Index = () => {
  return (
    <Layout>
      <h1 className="orderby-latest">Latest</h1>
      <PostNames />
    </Layout>
  );
}
export default Index;

const PostNames = () => {
  const { data: Posts } = useSWR(KEY_POST);
  return (
    <>
      {Posts.map((fileName: string, idx: number) => (
        <article className='title-card' key={ idx }>
          <Link href={`/posts/${ fileName }`}>
            <h2>{ fileName.split('_')[1] }</h2>
          </Link>
        </article>
      ))}
    </>
  );
}