import Link from "next/link";
import style from './index.module.css';
import Image from 'next/image';

import email from '../../../public/assets/icons/email.png';
import github from '../../../public/assets/icons/github.png';

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Link href='/'>saewookkang</Link>
      </header>

      <main className={style.main}>
        {children}
      </main>

      <footer className={style.footer} >
        <div>
          <a href='https://github.com/SaeWooKKang' className={style.image} >
            <Image
              alt="github"
              width={22}
              height={22}
              src={github} />
          </a>
          <a href="mailto:pac11.dev@gmail.com">
            <Image
              alt="email"
              width={22}
              height={22}
              src={email} />
          </a>
        </div>
        <div>saewookkang • ©2022</div>
      </footer>
    </div>
  );
};

export default Layout;