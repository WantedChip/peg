import React, { useState } from 'react';
import { SPLIT_PEOPLE, SPLIT_NOTES, MAX_SPLIT_AMOUNT, SplitMode } from '../../data/split';
import { calculatePersonSplit } from '../../utils/calculations';
import { formatINR } from '../../utils/format';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Split.module.css';

interface PersonBarProps {
  name: string;
  itemDescription: string;
  amount: number;
}

const PersonBar: React.FC<PersonBarProps> = ({ name, itemDescription, amount }) => {
  const animatedAmount = useCountUp(amount, { formatFn: formatINR, duration: 0.45 });
  const percentage = Math.min(100, Math.max(5, (amount / MAX_SPLIT_AMOUNT) * 100));

  return (
    <div className={styles.bar}>
      <span>
        {name}
        <small>{itemDescription}</small>
      </span>
      <div className={styles.barTrack}>
        <i className={styles.barFill} style={{ width: `${percentage}%` }} />
      </div>
      <span>{animatedAmount}</span>
    </div>
  );
};

export const Split: React.FC = () => {
  const [mode, setMode] = useState<SplitMode>('f');

  return (
    <section className={`section ${styles.spSec}`} id="split">
      <div className={`wrap ${styles.spGrid}`}>
        <div>
          <h2 className="display">
            The bill dies here, <em className="serif">not at the table.</em>
          </h2>
          <p className={styles.spNote}>
            One friend had craft cocktails, another had nimbu soda. Split it equally or by what each
            person actually had. Sample bill: ₹4,800 for four, with ₹800 of shared food.
          </p>
          <div className={styles.chips} role="group" aria-label="Split method">
            <button
              className={styles.chip}
              type="button"
              aria-pressed={mode === 'e'}
              data-m="e"
              onClick={() => setMode('e')}
            >
              Equal split
            </button>
            <button
              className={styles.chip}
              type="button"
              aria-pressed={mode === 'f'}
              data-m="f"
              onClick={() => setMode('f')}
            >
              Fair share
            </button>
          </div>
        </div>

        <div>
          <div id="sb" aria-live="polite">
            {SPLIT_PEOPLE.map((p) => {
              const amount = calculatePersonSplit(p, mode, 4);
              return (
                <PersonBar
                  key={p.name}
                  name={p.name}
                  itemDescription={p.itemDescription}
                  amount={amount}
                />
              );
            })}
          </div>
          <p className={styles.spNote} id="sn">
            {SPLIT_NOTES[mode]}
          </p>
        </div>
      </div>
    </section>
  );
};
