import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Flip, gsap, SIGNATURE_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SAMPLE_VENUES, VENUE_FILTERS, Venue } from '../../data/venues';
import { formatINR } from '../../utils/format';
import styles from './Prices.module.css';

export const Prices: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredVenues: Venue[] = SAMPLE_VENUES.filter((venue) => {
    if (currentFilter === 'all') return true;
    return venue.tags.includes(currentFilter);
  });

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const heading = headingRef.current;

      // Editorial masked reveal on display heading
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

  const handleFilterClick = (filterId: string) => {
    if (filterId === currentFilter) return;

    const grid = gridRef.current;
    if (!grid || prefersReducedMotion) {
      setCurrentFilter(filterId);
      return;
    }

    // Capture layout state for FLIP transition
    const state = Flip.getState(grid.children);

    setCurrentFilter(filterId);

    // Run FLIP transition after DOM updates
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.45,
        ease: 'power2.out',
        absolute: true,
        scale: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.25, ease: 'power2.in' }),
      });
    });
  };

  return (
    <section ref={sectionRef} className={`section ${styles.prSec}`} id="prices">
      <div className="wrap">
        <div className="section-head">
          <div className={styles.titleMask}>
            <h2 ref={headingRef} className="display">
              Find your kind of place. <em className="serif">Know what it costs.</em>
            </h2>
          </div>
          <p>
            Filter by the kind of night you’re after. Menus drift, so PEG’s idea is to show
            indicative prices, happy-hour windows and when each was last checked. These are made-up
            examples, not live prices.
          </p>
        </div>

        <div className={styles.chips} id="vf" role="group" aria-label="Filter sample venues">
          {VENUE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.chip}
              aria-pressed={f.id === currentFilter}
              onClick={() => handleFilterClick(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className={styles.vgrid}
          id="prices-cards"
          tabIndex={0}
          role="region"
          aria-label="Indicative venue prices list. Scroll sideways on smaller screens."
        >
          {filteredVenues.map((v) => (
            <article key={v.id} className={styles.vcard} data-tags={v.tags.join(' ')}>
              <h3>{v.name}</h3>
              <div className={styles.ar}>{v.area}</div>
              <dl>
                <dt>Draft pint</dt>
                <dd>{formatINR(v.draftPint)}</dd>
                <dt>Cocktail</dt>
                <dd>{formatINR(v.cocktail)}</dd>
                <dt>Happy hour</dt>
                <dd>{v.happyHour}</dd>
              </dl>
              <div className={styles.ck}>Example: last checked {v.daysAgo} days ago</div>
            </article>
          ))}

          {/* Peg noun definition card (shown when filter is 'all') */}
          {currentFilter === 'all' && (
            <article className={styles.pegcard}>
              <b>peg, noun</b>
              <p>A measure of spirits, commonly 30 or 60 ml in India. Also what we’re calling this for now.</p>
            </article>
          )}
        </div>

        <p className={styles.vcount} id="vc" aria-live="polite">
          Showing {filteredVenues.length} of {SAMPLE_VENUES.length} sample venues.
        </p>

        <ul className={styles.clarity}>
          <li>
            <b>Indicative means indicative</b>
            Prices are a guide. Taxes, cover charges and menus can differ.
          </li>
          <li>
            <b>Freshness should be visible</b>
            Every price would carry a “last checked” date.
          </li>
          <li>
            <b>Going home is part of going out</b>
            Plans include the cab, not just the first round.
          </li>
        </ul>
      </div>
    </section>
  );
};
