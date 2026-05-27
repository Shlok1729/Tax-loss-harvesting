import type { Holding, CapitalGainsResponse } from '@/types';

const API_BASE = '/api';

export async function fetchHoldings(): Promise<Holding[]> {
  const response = await fetch(`${API_BASE}/holdings`);
  if (!response.ok) {
    throw new Error(`Failed to fetch holdings: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCapitalGains(): Promise<CapitalGainsResponse> {
  const response = await fetch(`${API_BASE}/capital-gains`);
  if (!response.ok) {
    throw new Error(`Failed to fetch capital gains: ${response.statusText}`);
  }
  return response.json();
}
