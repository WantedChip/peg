import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SIGNATURE_EASE, SECONDARY_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useLenisContext } from '../../hooks/useLenis';
import { HeroMap, HeroMapHandles } from '../svg/HeroMap';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLUListElement>(null);
  const floatingNoteRef = useRef<HTMLDivElement>(null);
  const heroMapRef = useRef<HeroMapHandles>(null);

  const primaryBtnRef = useMagnetic<HTMLAnchorElement>();
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useLenisContext();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const title = titleRef.current;
      const polaroid = polaroidRef.current;
      const stamp = stampRef.current;
      const caps = capsRef.current;
      const floatingNote = floatingNoteRef.current;
      const mapHandles = heroMapRef.current;

      const tl = gsap.timeline({ defaults: { ease: SIGNATURE_EASE } });

      // 1. Title reveal through mask (under 0.8s)
      if (title) {
        tl.fromTo(title, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0);
      }

      // 2. Polaroid settles into its tilt
      if (polaroid) {
        tl.fromTo(
          polaroid,
          { y: 45, rotate: -2, opacity: 0 },
          { y: 0, rotate: 1.1, opacity: 1, duration: 1.1 },
          0.1
        );
      }

      // 3. SVG Route line draws itself
      if (mapHandles?.routePath && mapHandles?.dashPath) {
        const path = mapHandles.routePath;
        const dashPath = mapHandles.dashPath;
        const length = path.getTotalLength ? path.getTotalLength() : 600;

        gsap.set([path, dashPath], {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        tl.to(
          [path, dashPath],
          {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: SECONDARY_EASE,
          },
          0.4
        );
      }

      // 4. Stops and price labels pop in sequence
      if (mapHandles?.stopsGroup) {
        const circles = mapHandles.stopsGroup.children;
        tl.fromTo(
          circles,
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' },
          0.7
        );
      }

      if (mapHandles?.labelsGroup) {
        const labels = mapHandles.labelsGroup.children;
        tl.fromTo(
          labels,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.1 },
          0.9
        );
      }

      if (mapHandles?.badgesGroup) {
        const badges = mapHandles.badgesGroup.children;
        tl.fromTo(
          badges,
          { scale: 0.8, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1 },
          1.0
        );
      }

      // 5. Stamp rotates in
      if (stamp) {
        tl.fromTo(
          stamp,
          { scale: 0.4, rotate: -30, opacity: 0 },
          { scale: 1, rotate: 11, opacity: 1, duration: 0.8, ease: 'back.out(1.8)' },
          0.8
        );
      }

      // 6. Floating note
      if (floatingNote) {
        tl.fromTo(floatingNote, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.1);
      }

      // 7. Capability row staggers
      if (caps) {
        tl.fromTo(
          caps.children,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 },
          0.5
        );
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  // Subtle mouse parallax on the polaroid for fine pointers only
  useEffect(() => {
    if (prefersReducedMotion) return;
    const polaroid = polaroidRef.current;
    if (!polaroid) return;

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xNorm = (clientX / innerWidth - 0.5) * 2;
      const yNorm = (clientY / innerHeight - 0.5) * 2;

      gsap.to(polaroid, {
        x: xNorm * 10,
        y: yNorm * 8,
        rotate: 1.1 + xNorm * 0.8,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const isMobile = window.innerWidth <= 680;
    scrollTo(target, isMobile ? -72 : -86);
  };

  return (
    <section ref={containerRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <div className="eyebrow light">Concept · Mumbai nightlife planner</div>
          <div className={styles.maskContainer}>
            <h1 ref={titleRef} className={`display ${styles.heroTitle}`} id="hero-title">
              Make a <span className={styles.night}>night</span>
              <span className={styles.ofIt}>of it.</span>
            </h1>
          </div>
          <p className={styles.heroLead}>
            PEG helps you find bars, pubs and lounges in Mumbai, compare drink prices, set a budget,
            plan a bar-hop and split the bill, all in one place.
          </p>
          <div className={styles.heroActions}>
            <a
              ref={primaryBtnRef}
              className="button"
              href="#planner"
              onClick={(e) => handleActionClick(e, '#planner')}
            >
              Plan a sample night <span aria-hidden="true">↗</span>
            </a>
            <a className="button outline" href="#how" onClick={(e) => handleActionClick(e, '#how')}>
              How it works
            </a>
          </div>
          <ul ref={capsRef} className={styles.caps}>
            <li>
              <b>Find</b> bars &amp; pubs
            </li>
            <li>
              <b>Compare</b> drink prices
            </li>
            <li>
              <b>Plan</b> a bar-hop
            </li>
            <li>
              <b>Split</b> the bill
            </li>
          </ul>
          <div className={styles.heroNote}>
            <span aria-hidden="true"></span> An early concept · Sample information throughout
          </div>
        </div>

        <div
          className={styles.heroArt}
          aria-label="Illustrative route map showing a sample three-stop night out"
        >
          <div ref={polaroidRef} className={styles.routePoster}>
            <div className={styles.posterTop}>
              <span>PEG / Night route 001</span>
              <span>Not to scale · Sample</span>
            </div>
            <HeroMap ref={heroMapRef} className={styles.posterMap} />
            <div className={styles.posterBottom}>
              <strong>
                3 stops · 1 plan
                <br />
                About ₹1,850 each
              </strong>
              <small>
                SAMPLE NIGHT
                <br />
                BANDRA · 4 FRIENDS
              </small>
            </div>
          </div>
          <div ref={stampRef} className={styles.posterStamp}>
            MUMBAI
            <br />
            FIRST
            <br />✳
          </div>
          <div ref={floatingNoteRef} className={styles.floatingNote}>
            <span className={styles.noteDot} aria-hidden="true">
              ↗
            </span>
            <span>A plan that starts with your people — and your budget.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
