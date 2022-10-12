import Link from "next/link";
import { getFileNames } from '../utils/getFileNames';

interface Props {
  fileNames: string[];
}
const Posts = ({ fileNames } : Props) => {
  return (
    <ul>
      {
        fileNames.map((fileName: string, idx: number) => (
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
export default Posts;

export const getStaticProps = () => {
  const fileNames = getFileNames();
  return { props: { fileNames } };
};