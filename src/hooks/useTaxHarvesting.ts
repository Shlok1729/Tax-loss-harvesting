'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Holding, CapitalGainsData } from '@/types';
import { fetchHoldings, fetchCapitalGains } from '@/lib/api';

interface UseTaxHarvestingReturn {
  holdings: Holding[];
  capitalGains: CapitalGainsData | null;
  afterHarvestingGains: CapitalGainsData | null;
  selectedIndices: Set<number>;
  toggleHolding: (index: number) => void;
  toggleAll: () => void;
  savings: number;
  loading: boolean;
  error: string | null;
}

export function useTaxHarvesting(): UseTaxHarvestingReturn {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGainsData | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData.capitalGains);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Toggle a single holding
  const toggleHolding = useCallback((index: number) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  // Toggle all holdings
  const toggleAll = useCallback(() => {
    setSelectedIndices((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((_, i) => i));
    });
  }, [holdings]);

  // Compute after-harvesting gains based on selected holdings
  const afterHarvestingGains = useMemo(() => {
    if (!capitalGains) return null;

    // Start with the base capital gains from the API
    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.ltcg.losses;

    // For each selected holding, add its gains to the appropriate bucket
    selectedIndices.forEach((index) => {
      const holding = holdings[index];
      if (!holding) return;

      // Short-term capital gains
      if (holding.stcg.gain > 0) {
        stcgProfits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        stcgLosses += Math.abs(holding.stcg.gain);
      }

      // Long-term capital gains
      if (holding.ltcg.gain > 0) {
        ltcgProfits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        ltcgLosses += Math.abs(holding.ltcg.gain);
      }
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [capitalGains, selectedIndices, holdings]);

  // Calculate savings
  const savings = useMemo(() => {
    if (!capitalGains || !afterHarvestingGains) return 0;

    const preNet =
      (capitalGains.stcg.profits - capitalGains.stcg.losses) +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses);

    const postNet =
      (afterHarvestingGains.stcg.profits - afterHarvestingGains.stcg.losses) +
      (afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses);

    // Savings only when post is less than pre
    const diff = preNet - postNet;
    return diff > 0 ? diff : 0;
  }, [capitalGains, afterHarvestingGains]);

  return {
    holdings,
    capitalGains,
    afterHarvestingGains,
    selectedIndices,
    toggleHolding,
    toggleAll,
    savings,
    loading,
    error,
  };
}
