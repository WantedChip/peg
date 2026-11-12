export interface Venue {
  id: string;
  name: string;
  area: string;
  tags: string[];
  draftPint: number;
  cocktail: number;
  happyHour: string;
  daysAgo: number;
}

export interface VenueFilter {
  id: string;
  label: string;
}

export const VENUE_FILTERS: VenueFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'hh', label: 'Happy hour' },
  { id: 'roof', label: 'Rooftop' },
  { id: 'craft', label: 'Craft beer' },
  { id: 'live', label: 'Live music' },
  { id: 'sport', label: 'Sports screening' },
];

export const SAMPLE_VENUES: Venue[] = [
  {
    id: 'rooftop-lower-parel',
    name: 'Sample Rooftop',
    area: 'Lower Parel',
    tags: ['roof', 'hh'],
    draftPint: 420,
    cocktail: 650,
    happyHour: '5–8 PM',
    daysAgo: 3,
  },
  {
    id: 'taproom-bandra-w',
    name: 'Sample Taproom',
    area: 'Bandra W',
    tags: ['craft', 'hh'],
    draftPint: 360,
    cocktail: 590,
    happyHour: '4–7 PM',
    daysAgo: 6,
  },
  {
    id: 'live-room-worli',
    name: 'Sample Live Room',
    area: 'Worli',
    tags: ['live'],
    draftPint: 390,
    cocktail: 620,
    happyHour: 'None listed',
    daysAgo: 12,
  },
  {
    id: 'brewhouse-powai',
    name: 'Sample Brewhouse',
    area: 'Powai',
    tags: ['craft'],
    draftPint: 340,
    cocktail: 560,
    happyHour: 'None listed',
    daysAgo: 9,
  },
  {
    id: 'terrace-colaba',
    name: 'Sample Terrace',
    area: 'Colaba',
    tags: ['roof', 'live'],
    draftPint: 450,
    cocktail: 720,
    happyHour: '6–8 PM',
    daysAgo: 5,
  },
  {
    id: 'local-pub-thane',
    name: 'Sample Local Pub',
    area: 'Thane',
    tags: ['hh'],
    draftPint: 290,
    cocktail: 480,
    happyHour: '3–7 PM',
    daysAgo: 18,
  },
  {
    id: 'sports-bar-andheri',
    name: 'Sample Sports Bar',
    area: 'Andheri',
    tags: ['sport', 'hh'],
    draftPint: 330,
    cocktail: 520,
    happyHour: '4–7 PM',
    daysAgo: 7,
  },
];
