import type { CapitalGainsData } from '@/types';
import PreHarvestingCard from './PreHarvestingCard';
import AfterHarvestingCard from './AfterHarvestingCard';
import styles from './CapitalGainsCards.module.css';

interface CapitalGainsCardsProps {
  preHarvestingGains: CapitalGainsData;
  afterHarvestingGains: CapitalGainsData;
  savings: number;
}

export default function CapitalGainsCards({
  preHarvestingGains,
  afterHarvestingGains,
  savings,
}: CapitalGainsCardsProps) {
  return (
    <div className={styles.cardsContainer}>
      <PreHarvestingCard capitalGains={preHarvestingGains} />
      <AfterHarvestingCard capitalGains={afterHarvestingGains} savings={savings} />
    </div>
  );
}
