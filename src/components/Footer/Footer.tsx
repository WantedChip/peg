import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.brandMark} aria-hidden="true">
              P
            </span>
            <div>
              PEG<small>THE NIGHT GUIDE · WORKING TITLE</small>
            </div>
          </div>
          <div className={styles.footerMeta}>
            A Mumbai-first nightlife discovery &amp; planning concept.
            <br />
            Not an alcohol delivery, retail or booking platform.
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {currentYear} PEG · Concept preview</span>
          <span>Discover places · Understand your options · Plan your night</span>
        </div>
      </div>
    </footer>
  );
};
