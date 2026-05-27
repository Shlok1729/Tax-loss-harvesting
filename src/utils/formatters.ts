/**
 * Formats a number as US Dollar currency.
 * e.g., 70200.88 → "$70,200.88"
 * If compact is true and absolute value >= 1000, it formats as "$16.79M"
 */
export function formatCurrency(value: number, compact: boolean = false): string {
  if (value === 0) return '$0.00';
  const absValue = Math.abs(value);

  if (compact && absValue >= 100000) {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(absValue);
    return value < 0 ? `-${formatted}` : formatted;
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absValue);
  return value < 0 ? `-${formatted}` : formatted;
}

/**
 * Formats a number with smart decimal places.
 * For very small numbers (scientific notation), shows enough decimals to be meaningful.
 * For larger numbers, shows 2-4 decimal places.
 */
export function formatNumber(value: number, maxDecimals: number = 4): string {
  if (value === 0) return '0';

  const absValue = Math.abs(value);

  // For very small numbers, show in scientific notation
  if (absValue < 0.000001 && absValue > 0) {
    return value.toExponential(2);
  }

  // For small numbers, show more decimal places
  if (absValue < 0.01) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  }

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Formats a coin amount with its ticker symbol.
 * e.g., (20028.05, "ETH") → "20,028.05 ETH"
 */
export function formatCoinAmount(value: number, coin: string): string {
  if (value === 0) return `0 ${coin}`;

  const absValue = Math.abs(value);

  if (absValue < 0.000001 && absValue > 0) {
    return `${value.toExponential(2)} ${coin}`;
  }

  // Determine appropriate decimal places based on value magnitude
  let decimals = 2;
  if (absValue < 0.01) decimals = 8;
  else if (absValue < 1) decimals = 6;
  else if (absValue < 100) decimals = 4;
  else decimals = 2;

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });

  return `${formatted} ${coin}`;
}

/**
 * Formats current price with $ symbol.
 * Handles very small prices (like TITAN) and large prices (like ETH).
 */
export function formatPrice(value: number, compact: boolean = false): string {
  if (value === 0) return '$0.00';
  const absValue = Math.abs(value);

  if (absValue < 0.001) {
    return `$${value.toExponential(2)}`;
  }

  if (compact && absValue >= 100000) {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(absValue);
    return value < 0 ? `-${formatted}` : formatted;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}
