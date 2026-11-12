import React, { useEffect, useState } from 'react';
import { useLenisContext } from '../../hooks/useLenis';
import styles from './BackToTop.module.css';

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const { scrollTo } = useLenisContext();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 1.2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#top', 0);
  };

  return (
    <a
      className={`${styles.totop} ${show ? styles.show : ''}`}
      id="totop"
      href="#top"
      aria-label="Back to top"
      onClick={handleClick}
    >
      ↑
    </a>
  );
};
