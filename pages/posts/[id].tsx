import fs from 'fs';
import { markdownToHTML } from '../../utils/markdownToHTML';
import { createMarkup } from '../../utils/createMarkUp';
import { getFileNames } from '../../utils/getFileNames';

export const getStaticPaths = () => {
  const paths = getFileNames().map(fileName => ({ params: {id: fileName }}));
  return { paths, fallback: false };
}
export const getStaticProps = ({ params }: { params: { id: string } }) => {
  const MD_HTML = getMarkDownToHTML(params.id);
  return { props: { MD_HTML } }
}

interface Props { MD_HTML: string; }
const Post = ({ MD_HTML }: Props) => {
  return <div dangerouslySetInnerHTML={ createMarkup(MD_HTML) } />;
}

export default Post;

/**
 * id에 해당하는 .md 파일 읽어와서
 * HTML text로 변환.
 */
const getMarkDownToHTML = (id: string) => {
  const markdown = fs.readFileSync(
    `__posts/${ id }.md`,
     "utf-8"
  );
  return markdownToHTML(markdown);
}
