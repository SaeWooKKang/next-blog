import { useEffect, useRef } from 'react';
import { createCommentsScript } from './comment.service';

function CommentContainer() {
  const commentsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    commentsRef.current?.appendChild(createCommentsScript());
  }, []);

  return <section ref={commentsRef} />;
}

export default CommentContainer;
