import React, { useEffect, useState, useRef } from 'react';
import { useLenisContext } from '../../hooks/useLenis';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './BackToTop.module.css';

const CIRCLE_RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~138.23

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const { scrollTo } = useLenisContext();
  const prefersReducedMotion = useReducedMotion();

  // Scroll visibility threshold
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track scroll progress via ScrollTrigger
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const trigger = ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [prefersReducedMotion] }
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#top', 0);
  };

  const strokeDashoffset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <a
      ref={btnRef}
      className={`${styles.totop} ${show ? styles.show : ''}`}
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
        {/* Animated orangish progress circle */}
        <circle
          cx="26"
          cy="26"
          r={CIRCLE_RADIUS}
          className={styles.progressCircle}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset,
          }}
        />
      </svg>
      <span className={styles.arrow} aria-hidden="true">
        ↑
      </span>
    </a>
  );
};
