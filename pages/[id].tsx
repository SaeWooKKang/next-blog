import fs from 'fs';
import { markdownToHTML } from '../utils/markdownToHTML';
import { createMarkup } from '../utils/createMarkUp';

interface Props {
  markdown: string;
}
const Post = ({ markdown }: Props) =>  {
  const HTML = markdownToHTML(markdown);
  return <div dangerouslySetInnerHTML={ createMarkup(HTML) } />;
}

export default Post;

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: false, 
  }
}
export const getStaticProps = ({ params }: any) =>  {
  const markdown = fs.readFileSync(
    `__posts/${ params.id }.md`,
     "utf-8"
  );
  
  return { props: { markdown } }
}
