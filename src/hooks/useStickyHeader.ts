import { useEffect, useState } from 'react';

export function useStickyHeader(offset = 60) {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return isSticky;
}
