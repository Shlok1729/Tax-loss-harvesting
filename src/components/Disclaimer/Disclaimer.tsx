'use client';

import { useState } from 'react';
import styles from './Disclaimer.module.css';

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.disclaimer}>
      <div
        className={styles.disclaimerHeader}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className={styles.headerLeft}>
          <span className={styles.infoIcon}>ℹ</span>
          <span className={styles.headerTitle}>Important Notes &amp; Disclaimers</span>
        </div>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          ▼
        </span>
      </div>
      <div className={`${styles.disclaimerBody} ${isOpen ? styles.disclaimerBodyOpen : ''}`}>
        <div className={styles.disclaimerContent}>
          <ul>
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax regulations.
              Please consult your tax advisor before making any decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are handled
              separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from individual
              exchanges. As a result, values may slightly differ from the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation. For now, we
              are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized losses in held
              assets are not counted.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
