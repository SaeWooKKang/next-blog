import { useEffect, useState } from 'react';

// https://github.com/vercel/next.js/discussions/49465#discussioncomment-7034208
const getHash = () => (typeof window !== 'undefined'
  ? decodeURIComponent(window.location.hash.replace('#', ''))
  : undefined);

export const useHash = () => {
  const [hash, setHash] = useState(getHash());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleHashChange = () => {
      setHash(getHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return isClient ? hash : null;
};
