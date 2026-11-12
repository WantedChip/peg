import React, { useRef, useState, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useLenisContext } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './RunLine.module.css';

const PHRASES = [
  'Make a route',
  'Bring your people',
  'Get home safe',
  'Find your corner',
  'Know the spend',
];

export const RunLine: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { lenis } = useLenisContext();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion) return;

    let xPos = 0;
    let extraVelocity = 0;
    const baseSpeed = 1.0; // base px per frame

    // Listen to Lenis scroll velocity if available
    const handleLenisScroll = (e: { velocity: number }) => {
      // Lenis velocity is positive when scrolling down, negative when scrolling up
      extraVelocity = e.velocity * 0.45;
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    } else {
      let lastScroll = window.scrollY;
      const handleWindowScroll = () => {
        const delta = window.scrollY - lastScroll;
        extraVelocity = delta * 0.2;
        lastScroll = window.scrollY;
      };
      window.addEventListener('scroll', handleWindowScroll, { passive: true });
    }

    const ticker = () => {
      if (isHovered) return;

      // Decay extra velocity back to zero
      extraVelocity = gsap.utils.interpolate(extraVelocity, 0, 0.08);

      const speed = baseSpeed + extraVelocity;
      xPos -= speed;

      // Reset seamless loop when half of the duplicate track has moved
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (xPos <= -halfWidth) {
          xPos += halfWidth;
        } else if (xPos > 0) {
          xPos -= halfWidth;
        }
      }

      gsap.set(track, { x: xPos });
    };

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
    };
  }, [lenis, isHovered, prefersReducedMotion]);

  // Repeat phrases to ensure seamless marquee width
  const items = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <div
      className={styles.runWrap}
      aria-hidden="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.run}>
        <div ref={trackRef} className={styles.runTrack}>
          {items.map((phrase, idx) => (
            <span key={idx}>{phrase}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
