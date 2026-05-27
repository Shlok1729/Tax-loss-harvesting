export interface HoldingGain {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: HoldingGain;
  ltcg: HoldingGain;
}

export interface GainBreakdown {
  profits: number;
  losses: number;
}

export interface CapitalGainsData {
  stcg: GainBreakdown;
  ltcg: GainBreakdown;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGainsData;
}
