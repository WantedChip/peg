import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SIGNATURE_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FAQ_ITEMS } from '../../data/faq';
import styles from './Faq.module.css';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(
    FAQ_ITEMS.find((item) => item.defaultOpen)?.id || null
  );
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const heading = headingRef.current;

      if (heading) {
        gsap.fromTo(
          heading,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.85,
            ease: SIGNATURE_EASE,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const handleToggle = (id: string, isOpen: boolean) => {
    if (isOpen) {
      setOpenId(id);
    } else if (openId === id) {
      setOpenId(null);
    }
  };

  return (
    <section ref={sectionRef} className={`section ${styles.faqSec}`} id="faq">
      <div className={`wrap ${styles.wrap}`}>
        <div>
          <div className={styles.titleMask}>
            <h2 ref={headingRef} className="display">
              Fair <em className="serif">questions.</em>
            </h2>
          </div>
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <details
                key={item.id}
                name="faq"
                open={isOpen}
                onToggle={(e) => {
                  const target = e.currentTarget;
                  handleToggle(item.id, target.open);
                }}
              >
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};
