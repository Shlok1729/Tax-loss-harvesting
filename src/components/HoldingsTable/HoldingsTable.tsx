import { useState } from 'react';
import type { Holding } from '@/types';
import HoldingRow from './HoldingRow';
import styles from './HoldingsTable.module.css';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedIndices: Set<number>;
  onToggleHolding: (index: number) => void;
  onToggleAll: () => void;
  loading: boolean;
  error: string | null;
}

export default function HoldingsTable({
  holdings,
  selectedIndices,
  onToggleHolding,
  onToggleAll,
  loading,
  error,
}: HoldingsTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const allSelected = holdings.length > 0 && selectedIndices.size === holdings.length;
  const someSelected = selectedIndices.size > 0 && selectedIndices.size < holdings.length;

  const visibleHoldings = isExpanded ? holdings : holdings.slice(0, 4);

  if (loading) {
    return (
      <div className={styles.holdingsSection}>
        <h2 className={styles.holdingsTitle}>Holdings</h2>
        <div className={styles.tableWrapper}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading holdings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.holdingsSection}>
        <h2 className={styles.holdingsTitle}>Holdings</h2>
        <div className={styles.tableWrapper}>
          <div className={styles.errorContainer}>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.holdingsSection}>
      <h2 className={styles.holdingsTitle}>Holdings</h2>
      <div className={styles.tableWrapper}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={allSelected}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = someSelected;
                      }
                    }}
                    onChange={onToggleAll}
                    aria-label="Select all holdings"
                  />
                </th>
                <th>Asset</th>
                <th>
                  Holdings
                  <span className={styles.thSub}>Avg Buy Price</span>
                </th>
                <th>Current Price</th>
                <th>
                  Short-Term
                  <span className={styles.thSub}>Gain</span>
                </th>
                <th>
                  Long-Term
                  <span className={styles.thSub}>Gain</span>
                </th>
                <th>Amount to Sell</th>
              </tr>
            </thead>
            <tbody>
              {visibleHoldings.map((holding, index) => (
                <HoldingRow
                  key={`${holding.coin}-${holding.coinName}-${index}`}
                  holding={holding}
                  index={index}
                  isSelected={selectedIndices.has(index)}
                  onToggle={onToggleHolding}
                />
              ))}
            </tbody>
          </table>
        </div>
        {holdings.length > 4 && (
          <div className={styles.viewAllContainer}>
            <button
              className={styles.viewAllLink}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'View Less' : 'View All'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
