import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ProgressBar.module.css';

export const ProgressBar: React.FC = () => {
  const barRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar || prefersReducedMotion) return;

      const trigger = ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress });
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { dependencies: [prefersReducedMotion] }
  );

  return (
    <div className={styles.prog} aria-hidden="true">
      <i ref={barRef} className={styles.bar} id="prog" />
    </div>
  );
};
