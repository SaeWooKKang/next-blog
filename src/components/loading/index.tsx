import style from './index.module.css'; 

const Loading = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.ldsHourglass} />
    </div>
  );
}
export default Loading;