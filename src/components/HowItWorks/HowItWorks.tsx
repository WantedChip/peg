import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SIGNATURE_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './HowItWorks.module.css';

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const isRowRef = useRef<HTMLDivElement>(null);
  const msgsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const head = headRef.current;
      const steps = stepsRef.current;
      const isRow = isRowRef.current;
      const msgs = msgsRef.current;

      // Section headline reveal
      if (head) {
        gsap.fromTo(
          head,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: SIGNATURE_EASE,
            scrollTrigger: {
              trigger: head,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Steps entrance
      if (steps) {
        gsap.fromTo(
          steps.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: SIGNATURE_EASE,
            scrollTrigger: {
              trigger: steps,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Is-Row cards entrance
      if (isRow) {
        gsap.fromTo(
          isRow.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: SIGNATURE_EASE,
            scrollTrigger: {
              trigger: isRow,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Chat bubbles appear one by one
      if (msgs) {
        gsap.fromTo(
          msgs.children,
          { scale: 0.85, opacity: 0, y: 10 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: msgs,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} className="section paper-section" id="how">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 ref={headRef} className="display">
              What is <em className="serif">PEG?</em>
            </h2>
          </div>
          <p>
            A planning layer for Mumbai nights. Instead of juggling a map, a menu photo, a
            calculator and the group chat, you’d plan the whole evening in one place.
          </p>
        </div>

        <div ref={stepsRef} className={styles.howSteps}>
          <article>
            <h3>Tell it your budget and crew</h3>
            <p>Pick what each person wants to spend and how many are coming.</p>
          </article>
          <article>
            <h3>See places, prices and a route</h3>
            <p>
              Compare indicative drink prices, happy-hour windows and opening hours, then line up
              two or three stops.
            </p>
          </article>
          <article>
            <h3>Plan the way home, split the bill</h3>
            <p>Travel estimates, ride-home links and a fair split, so nobody does maths at 1 AM.</p>
          </article>
        </div>

        <div ref={isRowRef} className={styles.isRow}>
          <div className={`${styles.isCard} ${styles.chat}`}>
            <h3>Sound familiar?</h3>
            <div
              ref={msgsRef}
              className={styles.msgs}
              role="img"
              aria-label="Sample group chat: friends can’t decide where to go, what it costs or how to get home"
            >
              <p>so where are we going??</p>
              <p>somewhere not too expensive</p>
              <p>is the rooftop open past 12?</p>
              <p className={styles.me}>who’s paying for the cab home</p>
            </div>
          </div>

          <div className={styles.isCard}>
            <h3>PEG is</h3>
            <ul>
              <li>Discovery of bars, pubs and lounges</li>
              <li>Indicative prices, with dates</li>
              <li>Budget, route and bar-hop planning</li>
              <li>Bill splitting for groups</li>
            </ul>
            <p className={styles.pg}>
              <b>peg, noun</b> — a measure of spirits, commonly 30 or 60 ml in India. Also a working
              name.
            </p>
          </div>

          <div className={`${styles.isCard} ${styles.noCard}`}>
            <h3>PEG isn’t</h3>
            <ul>
              <li>Alcohol delivery or retail</li>
              <li>Table booking or payments</li>
              <li>Live yet: this is a concept preview with sample data</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
