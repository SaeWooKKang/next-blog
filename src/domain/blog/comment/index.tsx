import { useEffect, useRef } from 'react';
import { getComments } from './comment.service';

function Comment() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    commentsRef.current?.appendChild(getComments());
  }, []);

  return <section ref={commentsRef} />;
}
export default Comment;
