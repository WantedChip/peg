export interface SplitPerson {
  name: string;
  drinksSpend: number;
  itemDescription: string;
}

export type SplitMode = 'e' | 'f'; // 'e' = equal, 'f' = fair

export const SPLIT_PEOPLE: SplitPerson[] = [
  { name: 'Asha', drinksSpend: 1500, itemDescription: 'cocktails' },
  { name: 'Ravi', drinksSpend: 1100, itemDescription: 'beer' },
  { name: 'Kabir', drinksSpend: 950, itemDescription: 'beer + food' },
  { name: 'Meera', drinksSpend: 450, itemDescription: 'nimbu soda' },
];

export const SHARED_FOOD_TOTAL = 800;
export const TOTAL_BILL = 4800;
export const MAX_SPLIT_AMOUNT = 1700;

export const SPLIT_NOTES = {
  e: 'Everyone pays ₹1,200. Simple, but Meera ends up covering a lot of cocktails.',
  f: 'Own drinks plus an equal ₹200 share of the food. Everything adds up to ₹4,800.',
};
