import React, { useState, useRef } from 'react';
import { Flip, gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SAMPLE_VENUES, VENUE_FILTERS, Venue } from '../../data/venues';
import { formatINR } from '../../utils/format';
import styles from './Prices.module.css';

export const Prices: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredVenues: Venue[] = SAMPLE_VENUES.filter((venue) => {
    if (currentFilter === 'all') return true;
    return venue.tags.includes(currentFilter);
  });

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
    <section className={`section ${styles.prSec}`} id="prices">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 className="display">
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
          id="vg"
          tabIndex={0}
          role="region"
          aria-label="Sample venues. Scroll sideways on small screens to see more."
        >
          {filteredVenues.map((v) => (
            <article key={v.id} className={styles.vcard}>
              <h3>{v.name}</h3>
              <p className={styles.ar}>{v.area}</p>
              <dl>
                <dt>Draft pint</dt>
                <dd>{formatINR(v.draftPint)}</dd>
                <dt>Cocktail</dt>
                <dd>{formatINR(v.cocktail)}</dd>
                <dt>Happy hour</dt>
                <dd>{v.happyHour}</dd>
              </dl>
              <p className={styles.ck}>Example: last checked {v.daysAgo} days ago</p>
            </article>
          ))}

          {currentFilter === 'all' && (
            <div key="pegcard-def" className={styles.pegcard}>
              <b>peg, noun</b>
              <p>
                A measure of spirits, commonly 30 or 60 ml in India. Also what we’re calling this
                for now.
              </p>
            </div>
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
