import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLenisContext } from '../../hooks/useLenis';
import styles from './Closing.module.css';

export const Closing: React.FC = () => {
  const [shareStatus, setShareStatus] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [demoStatus, setDemoStatus] = useState<string>('');

  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useLenisContext();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const watermark = watermarkRef.current;
      if (!watermark) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.to(watermark, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const handleShare = async () => {
    const data = {
      title: 'PEG: make a night of it',
      text: 'A Mumbai-first concept for planning a whole night out.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        // User cancelled or share failed
      }
    } else if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('Link copied to your clipboard.');
      } catch {
        setShareStatus('Couldn’t copy. Copy the address from your browser bar instead.');
      }
    } else {
      setShareStatus('Copy the address from your browser bar to share this page.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('demo-email') as HTMLInputElement;

    if (!input || !input.value || !input.checkValidity()) {
      setDemoStatus('Enter an email address, like you@example.com, to try the demo.');
      input?.focus();
      return;
    }

    setDemoStatus('This is a demo. Nothing was saved or sent.');
  };

  const handlePlannerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = window.innerWidth <= 680;
    scrollTo('#planner', isMobile ? -72 : -86);
  };

  return (
    <section ref={sectionRef} className={styles.closing} id="closing">
      <div ref={watermarkRef} className={styles.watermark} aria-hidden="true">
        PEG
      </div>

      <div className={`wrap ${styles.closingInner}`}>
        <div>
          <div className="eyebrow">The plan is only the beginning</div>
          <h2 className="display">
            Your city.
            <br />
            Your people.
            <br />
            <em className="serif">Your kind of night.</em>
          </h2>
        </div>

        <div className={styles.closingSide}>
          <p>
            PEG is a concept preview for a Mumbai-first night-out planner. Know someone who plans
            every Friday across six tabs? Send them this page.
          </p>

          <div className={styles.ctaRow}>
            <button className="button dark" id="share" type="button" onClick={handleShare}>
              Share this page <span aria-hidden="true">↗</span>
            </button>
            <a className="button outline" href="#planner" onClick={handlePlannerClick}>
              Try the planner
            </a>
          </div>

          <p className={styles.shareStatus} id="share-status" role="status">
            {shareStatus}
          </p>

          <form className={styles.demoForm} id="demo-form" noValidate onSubmit={handleFormSubmit}>
            <label htmlFor="demo-email">Want an early look if it becomes real?</label>
            <div className={styles.formRow}>
              <input
                id="demo-email"
                name="demo-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDemoStatus('');
                }}
              />
              <button className="button dark" type="submit">
                Try the demo form
              </button>
            </div>
            <small>Demo only. This page has no backend, so nothing is saved or sent.</small>
            <p className={styles.demoStatus} id="demo-status" role="status">
              {demoStatus}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
