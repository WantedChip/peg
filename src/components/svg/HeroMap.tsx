import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface HeroMapHandles {
  routePath: SVGPathElement | null;
  dashPath: SVGPathElement | null;
  stopsGroup: SVGGElement | null;
  labelsGroup: SVGGElement | null;
  badgesGroup: SVGGElement | null;
}

export const HeroMap = forwardRef<HeroMapHandles, { className?: string }>(function HeroMap(
  { className },
  ref
) {
  const routePathRef = useRef<SVGPathElement>(null);
  const dashPathRef = useRef<SVGPathElement>(null);
  const stopsGroupRef = useRef<SVGGElement>(null);
  const labelsGroupRef = useRef<SVGGElement>(null);
  const badgesGroupRef = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
    routePath: routePathRef.current,
    dashPath: dashPathRef.current,
    stopsGroup: stopsGroupRef.current,
    labelsGroup: labelsGroupRef.current,
    badgesGroup: badgesGroupRef.current,
  }));

  return (
    <svg
      className={className}
      viewBox="0 0 640 400"
      role="img"
      aria-labelledby="poster-map-title poster-map-desc"
    >
      <title id="poster-map-title">An illustrated sample night route</title>
      <desc id="poster-map-desc">
        A lime route connects three sample stops across an abstract city map.
      </desc>
      <defs>
        <pattern id="mapgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#aab39a" strokeWidth=".8" opacity=".55" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill="#d9ddc8" />
      <rect width="640" height="400" fill="url(#mapgrid)" />
      {/* Land shapes */}
      <g fill="#c3cbb3" stroke="#b3bea2" strokeWidth="1.2">
        <path d="M28 40l118-12 30 44-32 43-100 5z" />
        <path d="M215 18l104 17 18 66-70 28-62-44z" />
        <path d="M400 18l190 14-4 90-124 24-67-54z" />
        <path d="M15 221l102-49 74 28-9 98-133 50z" />
        <path d="M244 183l112-47 65 54-22 94-104 31-62-51z" />
        <path d="M464 210l144-27 20 103-79 83-95-37z" />
      </g>
      {/* Broad roads */}
      <g fill="none" stroke="#f5f1e5" strokeWidth="9" opacity=".9">
        <path d="M0 156C124 136 163 173 257 154S449 93 640 122" />
        <path d="M174 0c28 97 12 183 54 255s60 99 76 145" />
        <path d="M0 350c125-53 242-43 334-10s199 55 306 7" />
      </g>
      {/* Dashed connector tracks */}
      <g fill="none" stroke="#b3a995" strokeWidth="2" strokeDasharray="5 7">
        <path d="M46 125l127 49 74 117 151-77 164 35" />
        <path d="M112 32l112 98 142-65 160 23" />
      </g>
      {/* Main animated route path */}
      <path
        ref={routePathRef}
        d="M105 284C159 237 203 219 266 253S372 289 410 198 493 102 545 110"
        fill="none"
        stroke="#a6c94c"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dashPathRef}
        d="M105 284C159 237 203 219 266 253S372 289 410 198 493 102 545 110"
        fill="none"
        stroke="#f8ffe1"
        strokeWidth="2"
        strokeDasharray="3 12"
        strokeLinecap="round"
      />
      {/* Stops */}
      <g ref={stopsGroupRef} id="hero-stops">
        <circle cx="105" cy="284" r="13" fill="#11140f" />
        <circle cx="105" cy="284" r="5" fill="#d7ff58" />
        <circle cx="410" cy="198" r="13" fill="#11140f" />
        <circle cx="410" cy="198" r="5" fill="#d7ff58" />
        <circle cx="545" cy="110" r="13" fill="#ff7659" stroke="#11140f" strokeWidth="4" />
      </g>
      {/* Stop text titles */}
      <g
        fontFamily="var(--mono), monospace"
        fontSize="11"
        fontWeight="700"
        letterSpacing="1.2"
        fill="#4b5540"
      >
        <text x="43" y="322">
          01 / FIRST STOP
        </text>
        <text x="363" y="235">
          02 / THE LIVE ROOM
        </text>
        <text x="478" y="75">
          03 / LAST BITE
        </text>
      </g>
      {/* Price label boxes */}
      <g ref={labelsGroupRef} id="hero-labels">
        <g fill="#f7f4eb" stroke="#11140f" strokeWidth="1.5">
          <rect x="56" y="209" width="113" height="35" rx="2" />
          <rect x="290" y="148" width="140" height="35" rx="2" />
          <rect x="486" y="135" width="111" height="35" rx="2" />
        </g>
        <g fill="#11140f" fontFamily="var(--sans), sans-serif" fontSize="12" fontWeight="700">
          <text x="69" y="231">
            2 pints · ₹720
          </text>
          <text x="304" y="170">
            Cocktails · ₹760
          </text>
          <text x="500" y="157">
            Late bite · ₹250
          </text>
        </g>
      </g>
      {/* Cab transit badges */}
      <g
        ref={badgesGroupRef}
        id="hero-badges"
        fill="#11140f"
        fontFamily="var(--sans), sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        <rect x="172" y="292" width="112" height="22" rx="11" fill="#d7ff58" />
        <text x="184" y="307">
          12 min · ₹60 cab
        </text>
        <rect x="424" y="262" width="112" height="22" rx="11" fill="#d7ff58" />
        <text x="436" y="277">
          18 min · ₹60 cab
        </text>
      </g>
    </svg>
  );
});
