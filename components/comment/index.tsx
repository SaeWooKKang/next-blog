import git from './comment.service';
import { useState, useEffect, useRef, FormEventHandler } from "react";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const idRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {    
    const title = git.getPostTitle();
    git.getComments(title).then(setComments);
  }, []);
  const onSubmitComment: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    
    const id = idRef.current!.value;
    const comment = commentRef.current!.value;
    const title = git.getPostTitle();
    git.createComment(id, comment, title).then(setComments)
  }

  return (
    <div>
      <div>
        <form onSubmit={onSubmitComment} >
          <input ref={idRef} />
          <input ref={commentRef} />
          <button>add</button>
        </form>
      </div>
      {  
        comments.map((comment: any) => (
          <div key={comment.id}>
            <> 작성자: { comment.title.split('/')[0]}</>
            <> 내용: { comment.body }</>
          </div>
        ))
      }
    </div>
  );
}
export default Comment;