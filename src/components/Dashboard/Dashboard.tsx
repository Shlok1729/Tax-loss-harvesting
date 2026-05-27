'use client';

import { useState, useEffect } from 'react';
import { useTaxHarvesting } from '@/hooks/useTaxHarvesting';
import Header from '@/components/Header/Header';
import Disclaimer from '@/components/Disclaimer/Disclaimer';
import CapitalGainsCards from '@/components/CapitalGainsCards/CapitalGainsCards';
import HoldingsTable from '@/components/HoldingsTable/HoldingsTable';

export default function Dashboard() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const {
    holdings,
    capitalGains,
    afterHarvestingGains,
    selectedIndices,
    toggleHolding,
    toggleAll,
    savings,
    loading,
    error,
  } = useTaxHarvesting();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="layout-wrapper">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      
      <div className="dashboard">
        <div className="page-header">
          <h1 className="page-title">Tax Harvesting</h1>
          <div className="how-it-works-wrapper">
            <span className="how-it-works">How it works?</span>
            <div className="how-it-works-tooltip">
              <ul>
                <li>See your capital gains for FY 2024-25 in the left card</li>
                <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                <li>Instantly see your updated tax liability in the right card</li>
              </ul>
              <p>
                <strong>Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability
              </p>
            </div>
          </div>
        </div>
        
        <Disclaimer />

        {capitalGains && afterHarvestingGains ? (
          <CapitalGainsCards
            preHarvestingGains={capitalGains}
            afterHarvestingGains={afterHarvestingGains}
            savings={savings}
          />
        ) : (
          !error && (
            <div className="cards-loading">
              <div className="cards-loading-shimmer" />
              <div className="cards-loading-shimmer" />
            </div>
          )
        )}

        <HoldingsTable
          holdings={holdings}
          selectedIndices={selectedIndices}
          onToggleHolding={toggleHolding}
          onToggleAll={toggleAll}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
