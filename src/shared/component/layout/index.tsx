import Link from 'next/link';
import Image from 'next/image';

import style from './index.module.css';

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Link href="/">saewookkang</Link>
      </header>

      <main className={style.main}>
        {children}
      </main>

      <footer className={style.footer}>
        <div>
          <a href="https://github.com/SaeWooKKang" className={style.image}>
            <Image
              alt="github"
              width={22}
              height={22}
              src="/assets/icons/github.png"
            />
          </a>
          <a href="mailto:pac11.dev@gmail.com">
            <Image
              alt="email"
              width={22}
              height={22}
              src="/assets/icons/email.png"
            />
          </a>
        </div>
        <div>saewookkang • ©2022</div>
      </footer>
    </div>
  );
}

export default Layout;
