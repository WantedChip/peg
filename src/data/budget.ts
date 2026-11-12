export interface BudgetLineItem {
  name: string;
  amount: number;
}

export interface BudgetScenario {
  id: string;
  name: string;
  budget: number;
  people: number;
}

export const BUDGET_PLANS: Record<number, BudgetLineItem[]> = {
  1000: [
    { name: 'First stop · happy-hour pints', amount: 300 },
    { name: 'Something to eat', amount: 250 },
    { name: 'A second round', amount: 200 },
    { name: 'Cab share home', amount: 150 },
    { name: 'Left in your pocket', amount: 100 },
  ],
  2000: [
    { name: 'First stop · 2 happy-hour pints', amount: 550 },
    { name: 'Second stop · cocktails + live music', amount: 650 },
    { name: 'Late bite · shared plates', amount: 400 },
    { name: 'Cabs between stops + home', amount: 250 },
    { name: 'Left in your pocket', amount: 150 },
  ],
  3000: [
    { name: 'Rooftop cocktails at sunset', amount: 850 },
    { name: 'A change of scene · small plates', amount: 800 },
    { name: 'Food along the way', amount: 550 },
    { name: 'Cabs, door to door', amount: 450 },
    { name: 'Left in your pocket', amount: 350 },
  ],
};

export const BUDGET_SCENARIOS: BudgetScenario[] = [
  { id: 'friday', name: 'Friday with friends', budget: 2000, people: 4 },
  { id: 'date', name: 'Date night', budget: 3000, people: 2 },
  { id: 'catchup', name: 'Budget catch-up', budget: 1000, people: 6 },
];

export const BUDGET_AMOUNTS = [1000, 2000, 3000] as const;
export type BudgetAmount = (typeof BUDGET_AMOUNTS)[number];
