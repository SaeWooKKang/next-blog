import fs from "fs";
import Link from "next/link";

interface Props {
  fileNames: string[];
}
const Posts = ({ fileNames } : Props) => {
  return (
    <ul>
      {
        fileNames.map((fileName: string, idx: number) => (
          <li key={ idx }>
            <Link href={`/${ fileName }`}>
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
  const files = fs.readdirSync('__posts');
  const fileNames = files.map(file => file.split('.')[0]);

  return { props: { fileNames } };
};
