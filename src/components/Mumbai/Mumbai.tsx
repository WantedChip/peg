import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SIGNATURE_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLenisContext } from '../../hooks/useLenis';
import { MUMBAI_AREAS } from '../../data/mumbai';
import styles from './Mumbai.module.css';

export const Mumbai: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisContext();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const cloud = cloudRef.current;
      if (!cloud) return;

      gsap.fromTo(
        cloud.children,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.03,
          ease: SIGNATURE_EASE,
          scrollTrigger: {
            trigger: cloud,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const isMobile = window.innerWidth <= 680;
    scrollTo(target, isMobile ? -72 : -86);
  };

  return (
    <section ref={sectionRef} className={`section ${styles.neighbourhoodSection}`} id="mumbai">
      <div className={`wrap ${styles.neighbourhoodGrid}`}>
        <div className={styles.neighbourhoodCopy}>
          <h2 className="display">
            A city of <em className="serif">many moods.</em>
          </h2>
          <p>
            PEG is starting with Mumbai and selected neighbourhoods across the wider MMR. The first
            version is a focused beginning, with room to grow as the idea takes shape.
          </p>
          <a
            href="#planner"
            className="button dark"
            onClick={(e) => handleLinkClick(e, '#planner')}
          >
            Explore the sample plan <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.areaBoard}>
          <div className={styles.areaBoardHead}>
            <span>Mumbai &amp; MMR / Areas of interest</span>
            <span>Exploratory</span>
          </div>

          <div ref={cloudRef} className={styles.areaCloud}>
            {MUMBAI_AREAS.map((item, idx) => (
              <span key={idx} className={item.isLater ? styles.later : undefined}>
                {item.name}
              </span>
            ))}
          </div>

          <div className={styles.areaBoardFoot}>
            Potential initial areas — not a statement of current coverage or available listings.
            Other cities may be considered later.
          </div>
        </div>
      </div>
    </section>
  );
};
