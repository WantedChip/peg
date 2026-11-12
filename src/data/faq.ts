export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'live-yet',
    question: 'Is PEG live yet?',
    answer:
      'No. This page is a concept preview. The venues, prices and plans you’ve seen are illustrative examples.',
    defaultOpen: true,
  },
  {
    id: 'alcohol-delivery',
    question: 'Do you sell or deliver alcohol?',
    answer: 'No. PEG is a discovery, information and planning idea. There’s no retail or delivery.',
  },
  {
    id: 'booking-payment',
    question: 'Can I book a table or pay through PEG?',
    answer:
      'No. The concept has no bookings and no payments. It helps you decide and plan; directions and ride links would simply be shortcuts for getting there and getting home.',
  },
  {
    id: 'how-planning-works',
    question: 'How would planning a night work?',
    answer:
      'You’d enter a budget per person and the size of your group. PEG would suggest places that fit, line up a few stops with estimated travel and opening hours in mind, and show an itemised illustration of the evening. Those figures are estimates, not quotes, and you could share the plan with friends or divide the bill.',
  },
  {
    id: 'prices-accuracy',
    question: 'Where would prices come from, and how accurate would they be?',
    answer:
      'The idea is indicative prices with a “last checked” date, plus community corrections. Menus change, and taxes or cover charges can differ, so treat them as a guide and confirm with the venue. Nothing on this page is a live price.',
  },
  {
    id: 'where-start',
    question: 'Where will PEG start?',
    answer:
      'Mumbai first, in a handful of neighbourhoods across the city and the wider region, as listed above. Pune and Bengaluru may come later. There are no dates and no promises yet.',
  },
  {
    id: 'data-collection',
    question: 'Does this page collect anything about me?',
    answer:
      'No. It’s a static page with no accounts, no forms and no backend. Nothing you tap here is saved, submitted or sent anywhere.',
  },
  {
    id: 'why-peg',
    question: 'Why “PEG”?',
    answer:
      'A peg is a measure of spirits, commonly 30 or 60 ml in India. It’s also a working name and may change.',
  },
  {
    id: 'drinking-age',
    question: 'Does legal drinking age matter?',
    answer:
      'Yes. Rules vary by state, so please check them, and plan your ride home. PEG helps you plan an evening; it doesn’t encourage drinking.',
  },
];
