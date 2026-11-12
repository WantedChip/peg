import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SIGNATURE_EASE } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCountUp } from '../../hooks/useCountUp';
import { BUDGET_PLANS, BUDGET_SCENARIOS, BudgetAmount } from '../../data/budget';
import { formatINR } from '../../utils/format';
import { calculateBudgetTotal, clampPeople } from '../../utils/calculations';
import styles from './Planner.module.css';

export const Planner: React.FC = () => {
  const [budget, setBudget] = useState<BudgetAmount>(2000);
  const [people, setPeople] = useState<number>(4);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string>('Illustrative figures');

  const containerRef = useRef<HTMLElement>(null);
  const receiptLinesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const lines = BUDGET_PLANS[budget] || BUDGET_PLANS[2000];
  const groupTotal = calculateBudgetTotal(budget, people);

  // Animated numbers
  const animatedBudget = useCountUp(budget, { formatFn: formatINR, duration: 0.5 });
  const animatedTotal = useCountUp(groupTotal, { formatFn: formatINR, duration: 0.5 });
  const animatedShare = useCountUp(budget, { formatFn: formatINR, duration: 0.5 });

  // Receipt lines printing motion
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const receiptLines = receiptLinesRef.current;
      if (!receiptLines) return;

      gsap.fromTo(
        receiptLines.children,
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: SIGNATURE_EASE,
        }
      );
    },
    { scope: containerRef, dependencies: [budget, prefersReducedMotion] }
  );

  const handleScenarioClick = (scenarioId: string, b: number, n: number) => {
    setActiveScenarioId(scenarioId);
    setBudget(b as BudgetAmount);
    setPeople(clampPeople(n));
    setCopyStatus('Illustrative figures');
  };

  const handleBudgetChange = (amount: BudgetAmount) => {
    setActiveScenarioId(null);
    setBudget(amount);
    setCopyStatus('Illustrative figures');
  };

  const handlePeopleChange = (delta: number) => {
    setActiveScenarioId(null);
    setPeople((prev) => clampPeople(prev + delta));
    setCopyStatus('Illustrative figures');
  };

  const handleCopyPlan = async () => {
    const linesSummary = lines.map((item) => `${item.name}: ${formatINR(item.amount)}`).join('\n');
    const summary = `PEG sample night plan\nBudget per person: ${formatINR(budget)}\nPeople: ${people}\nGroup estimate: ${formatINR(groupTotal)}\n\n${linesSummary}\n\nIllustrative figures only; not live venue prices.`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(summary);
        setCopyStatus('Copied to clipboard');
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summary;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopyStatus(success ? 'Copied to clipboard' : 'Copy unavailable in this browser');
      }
    } catch {
      setCopyStatus('Copy unavailable in this browser');
    }
  };

  useEffect(() => {
    // Reset copy status when scenario or budget changes
    setCopyStatus('Illustrative figures');
  }, [budget, people]);

  return (
    <section ref={containerRef} className={`section ${styles.budgetSection}`} id="planner">
      <div className="wrap">
        <div className={`section-head ${styles.sectionHead}`}>
          <div>
            <h2 className="display">
              Start with your <em className="serif">number.</em>
              <br />
              Find your evening.
            </h2>
          </div>
          <p className={styles.lead}>
            A night out can take a few different shapes. Set a sample budget and group size to see
            how PEG could turn a number into a plan.
          </p>
        </div>

        <div className={styles.budgetDemo}>
          <div className={styles.budgetControls}>
            <span className={styles.controlLabel}>Try a night</span>
            <div className={styles.scen} role="group" aria-label="Try a sample scenario">
              {BUDGET_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  type="button"
                  aria-pressed={activeScenarioId === scen.id}
                  onClick={() => handleScenarioClick(scen.id, scen.budget, scen.people)}
                >
                  {scen.name}
                </button>
              ))}
            </div>

            <span className={styles.controlLabel}>Or set your own · budget per person</span>
            <div className={styles.budgetNumber}>
              <strong id="budget-display">{animatedBudget}</strong>
              <span>per person</span>
            </div>

            <div
              className={styles.budgetOptions}
              role="group"
              aria-label="Choose sample budget per person"
            >
              {[1000, 2000, 3000].map((amt) => (
                <button
                  key={amt}
                  className={styles.budgetChoice}
                  type="button"
                  data-budget={amt}
                  aria-pressed={budget === amt}
                  onClick={() => handleBudgetChange(amt as BudgetAmount)}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>

            <div className={styles.peopleRow}>
              <div>
                <strong>Who's coming?</strong>
                <small>Change the group size</small>
              </div>
              <div className={styles.stepper}>
                <button
                  type="button"
                  id="people-minus"
                  aria-label="Remove one person"
                  onClick={() => handlePeopleChange(-1)}
                >
                  −
                </button>
                <output id="people-count" aria-live="polite">
                  {people}
                </output>
                <button
                  type="button"
                  id="people-plus"
                  aria-label="Add one person"
                  onClick={() => handlePeopleChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            <p className={styles.demoFootnote}>
              A made-up planning example, not a quote or a promise of venue prices. Amounts are
              illustrative and can be changed as real information becomes available.
            </p>
          </div>

          <div className={styles.receiptWrap}>
            <div className={styles.receipt}>
              <div className={styles.receiptHead}>
                <strong>TONIGHT / ESTIMATE</strong>
                <span className={styles.sampleChip}>Sample plan</span>
              </div>
              <div className={styles.receiptSub} id="receipt-group">
                {people} PEOPLE · MUMBAI
              </div>
              <div className={styles.receiptTotal}>
                <strong id="receipt-per-person">{animatedBudget}</strong>
                <span>
                  estimated spend
                  <br />
                  per person
                </span>
              </div>

              <div ref={receiptLinesRef} className={styles.receiptLines} id="receipt-lines">
                {lines.map((item, idx) => (
                  <div key={idx} className={styles.receiptLine}>
                    <span>{item.name}</span>
                    <strong>{formatINR(item.amount)}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.receiptBottom}>
                <span>
                  Group estimate
                  <br />
                  <strong id="receipt-total">{animatedTotal}</strong>
                </span>
                <span>
                  Each person's share
                  <br />
                  <strong id="receipt-share">{animatedShare}</strong>
                </span>
              </div>

              <div className={styles.receiptActions}>
                <button
                  className={styles.textButton}
                  id="copy-plan"
                  type="button"
                  onClick={handleCopyPlan}
                >
                  Copy sample summary ↗
                </button>
                <small id="copy-status" aria-live="polite">
                  {copyStatus}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
