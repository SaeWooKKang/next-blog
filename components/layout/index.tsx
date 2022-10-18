import Link from "next/link";
import style from './index.module.css';

type Props = {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className={ style.layout }>   
      <header className={ style.header }> 
        <Link href='/'>saewookkang</Link>
      </header>

      <main className={ style.main }>
        { children }
      </main>
    
      <footer className={ style.footer } >
        <div>git 주소</div>
        <div>이메일 주소</div>
      </footer>
    </div>
  );
}

export default Layout;