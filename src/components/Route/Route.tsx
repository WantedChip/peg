import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SIGNATURE_EASE, SECONDARY_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AREA_ROUTES, ROUTE_AREAS, RouteArea } from '../../data/routes';
import { RouteMap, RouteMapHandles } from '../svg/RouteMap';
import styles from './Route.module.css';

export const Route: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<RouteArea>('Bandra');
  const sectionRef = useRef<HTMLElement>(null);
  const routeMapRef = useRef<RouteMapHandles>(null);
  const stopsListRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const currentRoute = AREA_ROUTES[selectedArea] || AREA_ROUTES['Bandra'];

  // Scroll scrub animation on desktop
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const map = routeMapRef.current;
      if (!map?.routePath || !map?.dashPath) return;

      const path = map.routePath;
      const dashPath = map.dashPath;
      const length = path.getTotalLength ? path.getTotalLength() : 650;

      const mm = gsap.matchMedia();

      // Desktop: scrubbed drawing synced with scroll
      mm.add('(min-width: 901px)', () => {
        gsap.set([path, dashPath], {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center 40%',
            scrub: 0.6,
          },
        });

        tl.to([path, dashPath], {
          strokeDashoffset: 0,
          ease: 'none',
        });

        if (map.stopsGroup) {
          tl.fromTo(
            map.stopsGroup.children,
            { scale: 0, opacity: 0, transformOrigin: 'center' },
            { scale: 1, opacity: 1, stagger: 0.2, ease: 'back.out(2)' },
            0.2
          );
        }

        if (map.labelsGroup) {
          tl.fromTo(
            map.labelsGroup.children,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.2 },
            0.4
          );
        }
      });

      // Mobile: standard trigger entrance
      mm.add('(max-width: 900px)', () => {
        gsap.set([path, dashPath], {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to([path, dashPath], {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: SECONDARY_EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  // Area switch animation (redraws route and cross-fades stop list)
  const handleAreaChange = (area: RouteArea) => {
    setSelectedArea(area);
    if (prefersReducedMotion) return;

    // Cross-fade heading and stops list
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: SIGNATURE_EASE }
      );
    }

    if (stopsListRef.current) {
      gsap.fromTo(
        stopsListRef.current.children,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: SIGNATURE_EASE }
      );
    }

    // Quick redraw of route line
    const map = routeMapRef.current;
    if (map?.routePath && map?.dashPath) {
      const length = map.routePath.getTotalLength ? map.routePath.getTotalLength() : 650;
      gsap.fromTo(
        [map.routePath, map.dashPath],
        { strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.7, ease: SECONDARY_EASE }
      );
    }
  };

  return (
    <section ref={sectionRef} className={`section ${styles.routeSection}`} id="route">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 className="display">
              Plan the whole <em className="serif">night,</em> not one stop.
            </h2>
          </div>
          <p>
            Sometimes the best plan has more than one pin. Bring a few places together and see the
            evening as a route, not a list.
          </p>
        </div>

        <div className={styles.routeDemo}>
          <div className={styles.routeMap}>
            <RouteMap ref={routeMapRef} />
            <div className={styles.mapCaption} id="route-map-caption">
              {currentRoute.caption}
            </div>
          </div>

          <div className={styles.routeCopy}>
            <div className={styles.routeKicker}>Choose a starting neighbourhood</div>
            <h3 ref={headingRef} id="route-heading">
              {currentRoute.heading}
            </h3>
            <p>
              Pick a neighbourhood to see how a multi-stop evening could be laid out. Names, times
              and fares below are placeholders for the concept.
            </p>

            <div
              className={styles.areaTabs}
              role="group"
              aria-label="Choose sample route neighbourhood"
            >
              {ROUTE_AREAS.map((area) => (
                <button
                  key={area}
                  className={styles.areaTab}
                  type="button"
                  data-area={area}
                  aria-pressed={selectedArea === area}
                  onClick={() => handleAreaChange(area)}
                >
                  {area}
                </button>
              ))}
            </div>

            <div
              ref={stopsListRef}
              className={styles.routeStops}
              id="route-stops"
              aria-live="polite"
            >
              {currentRoute.stops.map((stop, idx) => (
                <div key={idx} className={styles.routeStop}>
                  <span className={styles.stopNum}>{stop.num}</span>
                  <div>
                    <strong>{stop.name}</strong>
                    <small>{stop.details}</small>
                  </div>
                  <em>{stop.fareLabel}</em>
                </div>
              ))}
            </div>

            <p className={styles.routeDisclaimer}>
              Illustrative only: made-up stops, times and fares. Not real venues, and not live
              routing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
