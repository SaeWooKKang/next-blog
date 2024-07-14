import { useEffect, useRef } from 'react';
import { useHash } from '../../../common/hooks/useHash';

export const useScrollToTitle = () => {
  type Heading = {
    text: string | null;
    level?: number;
    top: number
  };

  const hash = useHash();
  const headingList = useRef<Heading[]>([]);

  useEffect(() => {
    const headings: Heading[] = Array.from(
      document.querySelectorAll('h2, h3'),
    ).map((heading) => ({
      text: heading.textContent,
      level: parseInt(heading.tagName[1], 10),
      top: heading.getBoundingClientRect().top,
    }));

    headingList.current = headings;
  }, []);

  useEffect(() => {
    const target = headingList.current
      .find((heading) => heading.text === hash?.replaceAll('-', ' '));

    window.scrollTo({ top: target?.top, behavior: 'smooth' });
  }, [hash]);
};
