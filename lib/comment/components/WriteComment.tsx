import { 
  useRef,
  FormEventHandler,
  Dispatch,
  SetStateAction, 
  useState
} from "react";

import git from '../comment.service';
import style from '../style/writeComment.module.css';
import Loading from '../../../components/loading'

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
        
        setTimeout(async () => {    
          const response = await git.getComments(title);
            props.handleComment(response);
            setIsLoading(false);
        }, 7000)
      });
  }
  return (
    <> 
      {isLoading && <Loading />}
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
  </>)
}

export default WriteComment;