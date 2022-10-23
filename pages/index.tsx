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
  return { props: {fallback: { [KEY_POST]: posts_meta }}};
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
  const { data: Posts } = useSWR<Posts[]>(KEY_POST);
  return (
    <>
      {Posts!.map((post, idx) => (
        <article className='title-card' key={ idx }>
            <>
              <div className='date'>{ post.date }</div>
              <Link href={`/posts/${ post.title }`}>
                <h2 className="title">{ post.title }</h2>
              </Link>
              <div className='description'>{ post.description }</div>
            </>
        </article>
      ))}
    </>
  );
}