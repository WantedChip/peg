import React, { useEffect, useRef } from 'react';
import { useLenisContext } from '../../hooks/useLenis';
import styles from './BackToTop.module.css';

const CIRCLE_RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~138.23

export const BackToTop: React.FC = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const { lenis, scrollTo } = useLenisContext();

  useEffect(() => {
    let animationFrameId: number;

    const updateRing = (progressRatio?: number) => {
      let p = progressRatio;
      if (p === undefined) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        p = scrollHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollHeight)) : 0;
      }

      // Direct DOM update on SVG circle strokeDashoffset (60/120 FPS, zero React delay)
      if (circleRef.current) {
        const offset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, p)));
        circleRef.current.style.strokeDashoffset = `${offset}`;
      }

      // Visibility toggle
      if (btnRef.current) {
        const shouldShow = window.scrollY > 200;
        if (shouldShow) {
          btnRef.current.classList.add(styles.show);
        } else {
          btnRef.current.classList.remove(styles.show);
        }
      }
    };

    // 1. If Lenis is active, listen to its continuous scroll event
    const handleLenisScroll = (e: { progress: number }) => {
      updateRing(e.progress);
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    // 2. Also listen to native window scroll (for touch momentum, fallback, resize)
    const handleWindowScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => updateRing());
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('resize', handleWindowScroll, { passive: true });

    // Initial sync
    updateRing();

    return () => {
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('resize', handleWindowScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lenis]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#top', 0);
  };

  return (
    <a
      ref={btnRef}
      className={styles.totop}
      id="totop"
      href="#top"
      aria-label="Back to top"
      onClick={handleClick}
      title="Back to top"
    >
      <svg
        className={styles.progressRing}
        viewBox="0 0 52 52"
        width="52"
        height="52"
        aria-hidden="true"
      >
        {/* Background track circle */}
        <circle
          cx="26"
          cy="26"
          r={CIRCLE_RADIUS}
          className={styles.trackCircle}
        />
        {/* Animated coral progress circle */}
        <circle
          ref={circleRef}
          cx="26"
          cy="26"
          r={CIRCLE_RADIUS}
          className={styles.progressCircle}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE,
          }}
        />
      </svg>
      <span className={styles.arrow} aria-hidden="true">
        ↑
      </span>
    </a>
  );
};
