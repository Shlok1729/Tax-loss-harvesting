import type { Holding } from '@/types';
import { formatCurrency, formatCoinAmount, formatPrice } from '@/utils/formatters';
import styles from './HoldingsTable.module.css';

interface HoldingRowProps {
  holding: Holding;
  index: number;
  isSelected: boolean;
  onToggle: (index: number) => void;
}

function GainCell({ gain, balance, coin }: { gain: number; balance: number; coin: string }) {
  const gainClass =
    gain > 0 ? styles.gainPositive : gain < 0 ? styles.gainNegative : styles.gainZero;

  return (
    <td>
      <div className={gainClass}>
        <span className="has-tooltip" data-tooltip={formatCurrency(gain)}>
          {formatCurrency(gain, true)}
        </span>
      </div>
      <div className={styles.gainBalance}>{formatCoinAmount(balance, coin)}</div>
    </td>
  );
}

export default function HoldingRow({ holding, index, isSelected, onToggle }: HoldingRowProps) {
  return (
    <tr
      className={isSelected ? styles.selectedRow : ''}
      onClick={() => onToggle(index)}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isSelected}
          onChange={() => onToggle(index)}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Select ${holding.coinName}`}
        />
      </td>
      <td>
        <div className={styles.assetCell}>
          <img
            src={holding.logo}
            alt={holding.coin}
            className={styles.coinLogo}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg';
            }}
          />
          <div className={styles.coinInfo}>
            <span className={styles.coinName} title={holding.coinName}>
              {holding.coinName}
            </span>
            <span className={styles.coinTicker}>{holding.coin}</span>
          </div>
        </div>
      </td>
      <td>
        <div className={styles.holdingAmount}>
          <span className="has-tooltip" data-tooltip={formatCoinAmount(holding.totalHolding, holding.coin)}>
            {formatCoinAmount(holding.totalHolding, holding.coin)}
          </span>
        </div>
        <div className={styles.holdingAvgPrice}>
          <span className="has-tooltip" data-tooltip={`${formatPrice(holding.averageBuyPrice)}/${holding.coin}`}>
            {formatPrice(holding.averageBuyPrice, true)}/{holding.coin}
          </span>
        </div>
      </td>
      <td>
        <span className="has-tooltip" data-tooltip={formatPrice(holding.currentPrice)}>
          {formatPrice(holding.currentPrice, true)}
        </span>
      </td>
      <GainCell gain={holding.stcg.gain} balance={holding.stcg.balance} coin={holding.coin} />
      <GainCell gain={holding.ltcg.gain} balance={holding.ltcg.balance} coin={holding.coin} />
      <td>
        {isSelected ? (
          <span className={`${styles.amountToSell} has-tooltip`} data-tooltip={formatCoinAmount(holding.totalHolding, holding.coin)}>
            {formatCoinAmount(holding.totalHolding, holding.coin)}
          </span>
        ) : (
          <span className={styles.amountDash}>-</span>
        )}
      </td>
    </tr>
  );
}
