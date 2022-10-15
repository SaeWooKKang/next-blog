import Link from "next/link";
import useSWR from 'swr';

import { fetcher } from "../utils/api";
import { getPostNames } from '../service/post.service';

export const getStaticProps = () => {
  const fileNames = getPostNames();
  const key = `/api/posts`;
  return { props: { fallback: { [key]: fileNames } }};
};

const Posts = () => {
  return <Title />
}
export default Posts;

const Title = () => {
  const { data } = useSWR('/api/posts', fetcher);
  
  return (
    <ul>
      { data.map((fileName: string, idx: number) => (
          <li key={ idx }>
            <Link href={`/posts/${ fileName }`}>
              { fileName }
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
