import type { CapitalGainsData } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import styles from './CapitalGainsCards.module.css';

interface AfterHarvestingCardProps {
  capitalGains: CapitalGainsData;
  savings: number;
}

export default function AfterHarvestingCard({ capitalGains, savings }: AfterHarvestingCardProps) {
  const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const effectiveGains = stcgNet + ltcgNet;

  return (
    <div className={styles.afterCard}>
      <h2 className={styles.afterCardTitle}>After Harvesting</h2>
      <table className={`${styles.gainsTable} ${styles.afterGainsTable}`}>
        <thead>
          <tr>
            <th></th>
            <th>Short-term</th>
            <th>Long-term</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Profits</td>
            <td>{formatCurrency(capitalGains.stcg.profits, true)}</td>
            <td>{formatCurrency(capitalGains.ltcg.profits, true)}</td>
          </tr>
          <tr>
            <td>Losses</td>
            <td>{formatCurrency(capitalGains.stcg.losses, true)}</td>
            <td>{formatCurrency(capitalGains.ltcg.losses, true)}</td>
          </tr>
          <tr className={styles.netRow}>
            <td>Net Capital Gains</td>
            <td>{formatCurrency(stcgNet, true)}</td>
            <td>{formatCurrency(ltcgNet, true)}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.realisedSection}>
        <span className={styles.afterRealisedLabel}>Effective Capital Gains:</span>
        <span
          className={`${styles.afterRealisedValue} ${
            effectiveGains < 0 ? styles.realisedValueNegative : ''
          }`}
        >
          {formatCurrency(effectiveGains, true)}
        </span>
      </div>
      {savings > 0 && (
        <div className={styles.savingsMessage}>
          <span className={styles.savingsEmoji}>🎉</span>
          <span>Your taxable capital gains are reduced by: {formatCurrency(savings, true)}</span>
        </div>
      )}
    </div>
  );
}
