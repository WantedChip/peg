import { describe, it, expect } from 'vitest';
import {
  calculateBudgetTotal,
  calculatePerPersonShare,
  calculatePersonSplit,
  clampPeople,
} from './calculations';
import { SPLIT_PEOPLE } from '../data/split';

describe('Calculations logic', () => {
  it('calculates budget total accurately', () => {
    expect(calculateBudgetTotal(2000, 4)).toBe(8000);
    expect(calculateBudgetTotal(1000, 6)).toBe(6000);
    expect(calculateBudgetTotal(3000, 2)).toBe(6000);
    expect(calculateBudgetTotal(0, 5)).toBe(0);
  });

  it('calculates per person share', () => {
    expect(calculatePerPersonShare(8000, 4)).toBe(2000);
    expect(calculatePerPersonShare(6000, 6)).toBe(1000);
    expect(calculatePerPersonShare(0, 4)).toBe(0);
    expect(calculatePerPersonShare(5000, 0)).toBe(0);
  });

  it('clamps people within valid 1-12 bounds', () => {
    expect(clampPeople(0)).toBe(1);
    expect(clampPeople(-5)).toBe(1);
    expect(clampPeople(4)).toBe(4);
    expect(clampPeople(12)).toBe(12);
    expect(clampPeople(15)).toBe(12);
  });

  it('calculates equal split correctly for all members', () => {
    SPLIT_PEOPLE.forEach((person) => {
      const share = calculatePersonSplit(person, 'e', 4);
      expect(share).toBe(1200);
    });
  });

  it('calculates fair share correctly (drinks + equal food portion)', () => {
    // Asha: 1500 + 200 = 1700
    expect(calculatePersonSplit(SPLIT_PEOPLE[0], 'f', 4)).toBe(1700);
    // Ravi: 1100 + 200 = 1300
    expect(calculatePersonSplit(SPLIT_PEOPLE[1], 'f', 4)).toBe(1300);
    // Kabir: 950 + 200 = 1150
    expect(calculatePersonSplit(SPLIT_PEOPLE[2], 'f', 4)).toBe(1150);
    // Meera: 450 + 200 = 650
    expect(calculatePersonSplit(SPLIT_PEOPLE[3], 'f', 4)).toBe(650);

    const total = SPLIT_PEOPLE.reduce(
      (sum, person) => sum + calculatePersonSplit(person, 'f', 4),
      0
    );
    expect(total).toBe(4800);
  });
});
