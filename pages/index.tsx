import Link from "next/link";
import useSWR, { SWRConfig } from 'swr';

import { fetcher } from "../utils/api";
import { getPostNames } from '../service/post.service';

export const getStaticProps = () => {
  const fileNames = getPostNames();
  const key = `/api/posts`;
  return { props: { fallback: { [key]: fileNames } }};
};

const Posts = ({ fallback } : { fallback: { ['api']: string[] }}) => {
  return (
    <SWRConfig value={{ fallback }}>
     <Title />
    </SWRConfig>
  );
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
