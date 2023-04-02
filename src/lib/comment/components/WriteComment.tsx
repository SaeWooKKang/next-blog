import { 
  useRef,
  FormEventHandler,
  Dispatch,
  SetStateAction, 
  useState
} from "react";

import git from '../comment.service';
import style from '../style/writeComment.module.css';
import { Loading } from '../index';

interface Props {
  handleComment: Dispatch<SetStateAction<never[]>>
  comments: any;
}

const WriteComment = (props: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  
  const onSubmitComment: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    
    const id = idRef.current!.value;
    const comment = commentRef.current!.value;
    const title = git.getPostTitle();
    
    if (!id || !comment) {
      alert('텍스트를 입력해주세요.');
      return;
    }

    const config = {
      id, 
      comment,
      title
    };
    
    setIsCommentLoading(true);
    
    git.createComment(config) 
      .then(resetInput)
      .then(_ => getAppliedComment(title)); 
  }
  
  const resetInput = () => {
    idRef.current!.value = '';
    commentRef.current!.value = '';
  }

  const getAppliedComment = (title: string) => {
    let timerId = setTimeout(tick, 0);

    async function tick() {
      const newComments = await git.getComments(title);
  
      if (newComments.length === props.comments.length) {
        timerId = setTimeout(tick, 2000);
      }
      else {
        props.handleComment(newComments);
        setIsCommentLoading(false);
        clearTimeout(timerId);
      }
    }

    setTimeout(() => {
      if (isCommentLoading) {
        clearTimeout(timerId);
        setIsCommentLoading(false);
        alert('댓글 가져오기에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }, 12000);
  }

  return (
    <> 
      { isCommentLoading && <Loading /> }

      <form onSubmit={onSubmitComment}>
        <input 
          type='text'
          className={style.name}
          placeholder='이름'
          ref={idRef} />

        <textarea 
          className={style.textarea}
          placeholder='내용을 입력해주세요.'
          ref={commentRef} />
        
        <div className={style.buttonWrapper}>
          <button className={style.button}>등록</button>
        </div>
      </form>
  </>);
}

export default WriteComment;