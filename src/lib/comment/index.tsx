import { useState, useEffect } from 'react';
import git from './comment.service';

import style from './style/index.module.css';

import WrittenComments from './components/WrittenComments';
import { WriteComment } from './components/WriteComment';

function Comment() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const title = git.getPostTitle();
    git.getComments(title).then(setComments);
  }, []);

  return (
    <div className={style.commentWrapper}>
      <h3 className={style.title}>댓글</h3>

      <WrittenComments
        comments={comments}
      />

      <WriteComment
        comments={comments}
        handleComment={setComments}
      />
    </div>
  );
}
export default Comment;
