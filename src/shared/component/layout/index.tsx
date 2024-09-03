import Link from 'next/link';
import Image from 'next/image';

import style from './index.module.css';

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <div className={style.layout}>
      <header className="flex justify-between max-w-[840px] h-auto px-5 py-10 mx-auto mb-10 font-['Montserrat',_sans-serif]">
        <Link href="/">saewoo</Link>

        <div className="flex gap-[20px]">
          <a href="https://github.com/SaeWooKKang" className={style.image}>
            <Image
              alt="github"
              width={24}
              height={24}
              src="/assets/icons/github.png"
            />
          </a>
          <a href="mailto:lemonade2929@naver.com">
            <Image
              alt="email"
              width={24}
              height={24}
              src="/assets/icons/email.png"
            />
          </a>
        </div>
      </header>

      <main className={style.main}>
        {children}
      </main>

      <footer className={style.footer}>
        <div>saewoo • ©2022</div>
      </footer>
    </div>
  );
}

export default Layout;
