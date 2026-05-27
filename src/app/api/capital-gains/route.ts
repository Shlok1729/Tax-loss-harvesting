import { NextResponse } from 'next/server';
import type { CapitalGainsResponse } from '@/types';

const capitalGainsData: CapitalGainsResponse = {
  capitalGains: {
    stcg: {
      profits: 4049.48,
      losses: 32127.03,
    },
    ltcg: {
      profits: 0,
      losses: 0,
    },
  },
};

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(capitalGainsData);
}
