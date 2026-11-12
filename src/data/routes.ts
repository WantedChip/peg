export interface RouteStop {
  num: string;
  name: string;
  details: string;
  fareLabel: string;
}

export interface AreaRoute {
  area: string;
  heading: string;
  caption: string;
  stops: RouteStop[];
}

export const AREA_ROUTES: Record<string, AreaRoute> = {
  Bandra: {
    area: 'Bandra',
    heading: 'Bandra, after dark.',
    caption: 'Bandra · Sample route, not live directions',
    stops: [
      {
        num: '01',
        name: 'Somewhere with a view',
        details: '6:30 PM · happy hour till 8',
        fareLabel: 'Start',
      },
      {
        num: '02',
        name: 'The live room',
        details: '8:15 PM · 12 min by cab · live set at 9',
        fareLabel: 'Cab ~₹60',
      },
      {
        num: '03',
        name: 'One last bite',
        details: '10:00 PM · 18 min by cab · kitchen open till 1',
        fareLabel: 'Cab ~₹60',
      },
    ],
  },
  Andheri: {
    area: 'Andheri',
    heading: 'Andheri, after dark.',
    caption: 'Andheri · Sample route, not live directions',
    stops: [
      {
        num: '01',
        name: 'A relaxed first stop',
        details: '6:30 PM · happy hour till 8',
        fareLabel: 'Start',
      },
      {
        num: '02',
        name: 'A little live music',
        details: '8:15 PM · 12 min by cab · live set at 9',
        fareLabel: 'Cab ~₹60',
      },
      {
        num: '03',
        name: 'A late kitchen',
        details: '10:00 PM · 18 min by cab · kitchen open till 1',
        fareLabel: 'Cab ~₹60',
      },
    ],
  },
  Powai: {
    area: 'Powai',
    heading: 'Powai, after dark.',
    caption: 'Powai · Sample route, not live directions',
    stops: [
      {
        num: '01',
        name: 'A laid-back first stop',
        details: '6:30 PM · happy hour till 8',
        fareLabel: 'Start',
      },
      {
        num: '02',
        name: 'The lively corner',
        details: '8:15 PM · 12 min by cab · live set at 9',
        fareLabel: 'Cab ~₹60',
      },
      {
        num: '03',
        name: 'A quieter finish',
        details: '10:00 PM · 18 min by cab · kitchen open till 1',
        fareLabel: 'Cab ~₹60',
      },
    ],
  },
  'Lower Parel': {
    area: 'Lower Parel',
    heading: 'Lower Parel, after dark.',
    caption: 'Lower Parel · Sample route, not live directions',
    stops: [
      {
        num: '01',
        name: 'The after-work spot',
        details: '6:30 PM · happy hour till 8',
        fareLabel: 'Start',
      },
      {
        num: '02',
        name: 'A change of scene',
        details: '8:15 PM · 12 min by cab · live set at 9',
        fareLabel: 'Cab ~₹60',
      },
      {
        num: '03',
        name: 'Something savoury',
        details: '10:00 PM · 18 min by cab · kitchen open till 1',
        fareLabel: 'Cab ~₹60',
      },
    ],
  },
  Colaba: {
    area: 'Colaba',
    heading: 'Colaba, after dark.',
    caption: 'Colaba · Sample route, not live directions',
    stops: [
      {
        num: '01',
        name: 'An easy first round',
        details: '6:30 PM · happy hour till 8',
        fareLabel: 'Start',
      },
      {
        num: '02',
        name: 'The tucked-away room',
        details: '8:15 PM · 12 min by cab · live set at 9',
        fareLabel: 'Cab ~₹60',
      },
      {
        num: '03',
        name: 'A late-night bite',
        details: '10:00 PM · 18 min by cab · kitchen open till 1',
        fareLabel: 'Cab ~₹60',
      },
    ],
  },
};

export const ROUTE_AREAS = ['Bandra', 'Andheri', 'Powai', 'Lower Parel', 'Colaba'] as const;
export type RouteArea = (typeof ROUTE_AREAS)[number];
