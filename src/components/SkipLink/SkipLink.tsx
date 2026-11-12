import React from 'react';
import styles from './SkipLink.module.css';

export const SkipLink: React.FC = () => {
  return (
    <a className={styles.skipLink} href="#main">
      Skip to content
    </a>
  );
};
