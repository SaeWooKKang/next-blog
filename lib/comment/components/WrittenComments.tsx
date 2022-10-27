import style from '../style/writtenComment.module.css';

interface Props {
  comments: string[];
}

const WrittenComments = (props: Props) => {

  return (
    <div className={style.wrapper}>
     {props.comments.map((comment: any) => (
        <div className={style.comment} key={comment.id}>
          <div className={style.name}> 
            { comment.title.split('/')[1]}
          </div>
          <div className={style.text}>
             { comment.body }
          </div>
        </div>))}
    </div>
  );
}

export default WrittenComments;