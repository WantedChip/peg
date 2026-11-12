import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface RouteMapHandles {
  routePath: SVGPathElement | null;
  dashPath: SVGPathElement | null;
  stopsGroup: SVGGElement | null;
  labelsGroup: SVGGElement | null;
}

export const RouteMap = forwardRef<RouteMapHandles, { className?: string }>(function RouteMap(
  { className },
  ref
) {
  const routePathRef = useRef<SVGPathElement>(null);
  const dashPathRef = useRef<SVGPathElement>(null);
  const stopsGroupRef = useRef<SVGGElement>(null);
  const labelsGroupRef = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
    routePath: routePathRef.current,
    dashPath: dashPathRef.current,
    stopsGroup: stopsGroupRef.current,
    labelsGroup: labelsGroupRef.current,
  }));

  return (
    <svg
      className={className}
      viewBox="0 0 680 440"
      role="img"
      aria-labelledby="route-map-title route-map-desc"
    >
      <title id="route-map-title">Illustrative three-stop route map</title>
      <desc id="route-map-desc">
        An abstract neighbourhood map with a route connecting three sample destinations. It is not
        geographically accurate.
      </desc>
      <defs>
        <pattern id="routegrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#aeb99e" strokeWidth=".7" />
        </pattern>
      </defs>
      <rect width="680" height="440" fill="#d7ddc8" />
      <rect width="680" height="440" fill="url(#routegrid)" />
      {/* Land shapes */}
      <g fill="#c2ccb4" stroke="#b4bea6" strokeWidth="1.2">
        <path d="M35 50l145-22 46 68-61 70-126-12z" />
        <path d="M277 25l115 28 38 87-99 30-73-62z" />
        <path d="M480 38l163 18 14 99-110 43-72-57z" />
        <path d="M12 255l133-58 78 54-16 130-141 20z" />
        <path d="M270 220l130-62 89 57-27 121-142 52-71-67z" />
        <path d="M500 255l142-33 20 133-104 61-93-49z" />
      </g>
      {/* Broad roads */}
      <g fill="none" stroke="#f2f0e5" strokeWidth="11" opacity=".9">
        <path d="M0 190c120-43 218-24 314 13s230 30 366-2" />
        <path d="M204 0c-8 97 25 167 73 254s60 127 70 186" />
        <path d="M0 396c144-43 254-32 364-3s204 34 316-6" />
      </g>
      {/* Dynamic route path */}
      <path
        ref={routePathRef}
        d="M105 301C166 263 228 235 297 264S409 308 451 205 543 126 585 120"
        fill="none"
        stroke="#7f9a52"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        ref={dashPathRef}
        d="M105 301C166 263 228 235 297 264S409 308 451 205 543 126 585 120"
        fill="none"
        stroke="#f7f5ea"
        strokeWidth="2"
        strokeDasharray="3 10"
        strokeLinecap="round"
      />
      {/* Stops */}
      <g ref={stopsGroupRef} id="route-stops-pins">
        <circle cx="105" cy="301" r="14" fill="#11140f" />
        <circle cx="105" cy="301" r="5" fill="#d7ff58" />
        <circle cx="451" cy="205" r="14" fill="#11140f" />
        <circle cx="451" cy="205" r="5" fill="#d7ff58" />
        <circle cx="585" cy="120" r="14" fill="#ff7659" stroke="#11140f" strokeWidth="4" />
      </g>
      {/* Label badges */}
      <g ref={labelsGroupRef} id="route-labels">
        <g fill="#f7f4eb" stroke="#11140f" strokeWidth="1.5">
          <rect x="45" y="222" width="132" height="39" rx="2" />
          <rect x="282" y="146" width="135" height="39" rx="2" />
          <rect x="500" y="150" width="130" height="39" rx="2" />
        </g>
        <g fill="#11140f" fontFamily="var(--sans), sans-serif" fontSize="13" fontWeight="700">
          <text x="59" y="247">
            First stop
          </text>
          <text x="297" y="171">
            Live room
          </text>
          <text x="514" y="175">
            Late bite
          </text>
        </g>
      </g>
      {/* Static corner notes */}
      <g
        fill="#606e4b"
        fontFamily="var(--mono), monospace"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
      >
        <text x="38" y="415">
          SAMPLE ROUTE / NOT TO SCALE
        </text>
        <text x="501" y="30">
          PEG — 003
        </text>
      </g>
    </svg>
  );
});
