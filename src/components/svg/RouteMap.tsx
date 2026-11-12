import { forwardRef, useImperativeHandle, useRef } from 'react';
import { RouteArea } from '../../data/routes';

export interface RouteMapHandles {
  routePath: SVGPathElement | null;
  dashPath: SVGPathElement | null;
  stopsGroup: SVGGElement | null;
  labelsGroup: SVGGElement | null;
}

interface MapStop {
  cx: number;
  cy: number;
  rectX: number;
  rectY: number;
  rectWidth: number;
  textX: number;
  textY: number;
  label: string;
}

interface AreaMapConfig {
  path: string;
  stops: [MapStop, MapStop, MapStop];
}

const MAP_CONFIGS: Record<RouteArea, AreaMapConfig> = {
  Bandra: {
    path: 'M105 301 C166 263, 228 235, 297 264 S409 308, 451 205 S543 126, 585 120',
    stops: [
      {
        cx: 105,
        cy: 301,
        rectX: 45,
        rectY: 222,
        rectWidth: 132,
        textX: 59,
        textY: 247,
        label: 'First stop',
      },
      {
        cx: 451,
        cy: 205,
        rectX: 282,
        rectY: 146,
        rectWidth: 135,
        textX: 297,
        textY: 171,
        label: 'Live room',
      },
      {
        cx: 585,
        cy: 120,
        rectX: 500,
        rectY: 150,
        rectWidth: 130,
        textX: 514,
        textY: 175,
        label: 'Late bite',
      },
    ],
  },
  Andheri: {
    path: 'M95 130 C190 100, 245 220, 335 195 S460 280, 565 315',
    stops: [
      {
        cx: 95,
        cy: 130,
        rectX: 40,
        rectY: 65,
        rectWidth: 130,
        textX: 54,
        textY: 90,
        label: 'Relaxed start',
      },
      {
        cx: 335,
        cy: 195,
        rectX: 268,
        rectY: 135,
        rectWidth: 135,
        textX: 282,
        textY: 160,
        label: 'Live music',
      },
      {
        cx: 565,
        cy: 315,
        rectX: 480,
        rectY: 250,
        rectWidth: 130,
        textX: 494,
        textY: 275,
        label: 'Late kitchen',
      },
    ],
  },
  Powai: {
    path: 'M120 330 C165 200, 275 155, 375 220 S485 135, 570 165',
    stops: [
      {
        cx: 120,
        cy: 330,
        rectX: 55,
        rectY: 265,
        rectWidth: 135,
        textX: 69,
        textY: 290,
        label: 'Laid-back start',
      },
      {
        cx: 375,
        cy: 220,
        rectX: 308,
        rectY: 155,
        rectWidth: 135,
        textX: 322,
        textY: 180,
        label: 'Lively corner',
      },
      {
        cx: 570,
        cy: 165,
        rectX: 485,
        rectY: 100,
        rectWidth: 130,
        textX: 499,
        textY: 125,
        label: 'Quieter finish',
      },
    ],
  },
  'Lower Parel': {
    path: 'M95 320 C180 340, 255 210, 340 195 S465 105, 545 80',
    stops: [
      {
        cx: 95,
        cy: 320,
        rectX: 40,
        rectY: 255,
        rectWidth: 135,
        textX: 54,
        textY: 280,
        label: 'After-work',
      },
      {
        cx: 340,
        cy: 195,
        rectX: 270,
        rectY: 130,
        rectWidth: 135,
        textX: 284,
        textY: 155,
        label: 'Change scene',
      },
      {
        cx: 545,
        cy: 80,
        rectX: 460,
        rectY: 20,
        rectWidth: 135,
        textX: 474,
        textY: 45,
        label: 'Savoury bite',
      },
    ],
  },
  Colaba: {
    path: 'M125 85 C215 150, 245 285, 355 270 S465 355, 575 330',
    stops: [
      {
        cx: 125,
        cy: 85,
        rectX: 65,
        rectY: 25,
        rectWidth: 130,
        textX: 79,
        textY: 50,
        label: 'Easy round',
      },
      {
        cx: 355,
        cy: 270,
        rectX: 285,
        rectY: 205,
        rectWidth: 135,
        textX: 299,
        textY: 230,
        label: 'Tucked away',
      },
      {
        cx: 575,
        cy: 330,
        rectX: 480,
        rectY: 265,
        rectWidth: 135,
        textX: 494,
        textY: 290,
        label: 'Late-night bite',
      },
    ],
  },
};

export const RouteMap = forwardRef<RouteMapHandles, { area?: RouteArea; className?: string }>(
  function RouteMap({ area = 'Bandra', className }, ref) {
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

    const config = MAP_CONFIGS[area] || MAP_CONFIGS.Bandra;

    return (
      <svg
        className={className}
        viewBox="0 0 680 440"
        role="img"
        aria-labelledby="route-map-title route-map-desc"
      >
        <title id="route-map-title">Illustrative three-stop route map for {area}</title>
        <desc id="route-map-desc">
          An abstract neighbourhood map with a route connecting three sample destinations in {area}.
          It is not geographically accurate.
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
          d={config.path}
          fill="none"
          stroke="#7f9a52"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          ref={dashPathRef}
          d={config.path}
          fill="none"
          stroke="#f7f5ea"
          strokeWidth="2"
          strokeDasharray="3 10"
          strokeLinecap="round"
        />

        {/* Stops */}
        <g ref={stopsGroupRef} id="route-stops-pins">
          {config.stops.map((stop, i) => (
            <g key={i}>
              <circle
                cx={stop.cx}
                cy={stop.cy}
                r="14"
                fill={i === 2 ? '#ff7659' : '#11140f'}
                stroke={i === 2 ? '#11140f' : undefined}
                strokeWidth={i === 2 ? '4' : undefined}
              />
              <circle cx={stop.cx} cy={stop.cy} r="5" fill="#d7ff58" />
            </g>
          ))}
        </g>

        {/* Label badges */}
        <g ref={labelsGroupRef} id="route-labels">
          {config.stops.map((stop, i) => (
            <g key={i}>
              <rect
                x={stop.rectX}
                y={stop.rectY}
                width={stop.rectWidth}
                height="39"
                rx="2"
                fill="#f7f4eb"
                stroke="#11140f"
                strokeWidth="1.5"
              />
              <text
                x={stop.textX}
                y={stop.textY}
                fill="#11140f"
                fontFamily="var(--sans), sans-serif"
                fontSize="13"
                fontWeight="700"
              >
                {stop.label}
              </text>
            </g>
          ))}
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
            PEG — {area.toUpperCase()}
          </text>
        </g>
      </svg>
    );
  }
);
