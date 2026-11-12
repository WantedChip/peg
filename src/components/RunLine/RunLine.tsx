import React from 'react';
import styles from './RunLine.module.css';

const PHRASES = [
  'Make a route',
  'Bring your people',
  'Get home safe',
  'Find your corner',
  'Know the spend',
];

export const RunLine: React.FC = () => {
  // Repeat phrases to ensure seamless marquee width for continuous loop
  const items = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <div className={styles.runWrap} aria-hidden="true">
      <div className={styles.run}>
        <div className={styles.runTrack}>
          {items.map((phrase, idx) => (
            <span key={idx}>{phrase}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
