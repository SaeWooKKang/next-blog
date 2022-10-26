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
  comments: any
}

const WriteComment = (props: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
 
    git.createComment(config) 
      .then(_ => { 
        idRef.current!.value = '';
        commentRef.current!.value = '';
      })
      .then(_ => {
        setIsLoading(true);
        
        let timerId = setTimeout(async function tick() {
          const newComments = await git.getComments(title);

          if (newComments.length === props.comments.length) {
            timerId = setTimeout(tick, 3000);
          }
          else {
            props.handleComment(newComments);
            setIsLoading(false);
          }
          
        }, 3000);

        setTimeout(() => {
          clearTimeout(timerId);
          setIsLoading(false);
        }, 9000);
      });
  }
  return (
    <> 
      { isLoading && <Loading /> }

      <form onSubmit={onSubmitComment}>
        <input 
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