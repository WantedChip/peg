import { SplitPerson, SHARED_FOOD_TOTAL, TOTAL_BILL } from '../data/split';

export function calculateBudgetTotal(budgetPerPerson: number, people: number): number {
  return budgetPerPerson * people;
}

export function calculatePerPersonShare(total: number, people: number): number {
  if (people <= 0) return 0;
  return Math.round(total / people);
}

export function calculatePersonSplit(
  person: SplitPerson,
  mode: 'e' | 'f',
  totalPeopleCount: number = 4
): number {
  if (mode === 'e') {
    return Math.round(TOTAL_BILL / (totalPeopleCount || 1));
  }
  const foodShare = Math.round(SHARED_FOOD_TOTAL / (totalPeopleCount || 1));
  return person.drinksSpend + foodShare;
}

export function clampPeople(val: number): number {
  return Math.max(1, Math.min(12, val));
}
