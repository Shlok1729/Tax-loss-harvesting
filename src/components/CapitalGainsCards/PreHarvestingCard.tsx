import type { CapitalGainsData } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import styles from './CapitalGainsCards.module.css';

interface PreHarvestingCardProps {
  capitalGains: CapitalGainsData;
}

export default function PreHarvestingCard({ capitalGains }: PreHarvestingCardProps) {
  const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realisedGains = stcgNet + ltcgNet;

  return (
    <div className={styles.preCard}>
      <h2 className={styles.cardTitle}>Pre Harvesting</h2>
      <table className={styles.gainsTable}>
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
        <span className={styles.realisedLabel}>Realised Capital Gains:</span>
        <span
          className={`${styles.realisedValue} ${
            realisedGains < 0 ? styles.realisedValueNegative : ''
          }`}
        >
          {formatCurrency(realisedGains, true)}
        </span>
      </div>
    </div>
  );
}
