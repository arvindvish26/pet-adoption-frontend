// Currency utility functions for the Pet Adoption System

export type Currency = 'INR' | 'USD';

export interface CurrencyConfig {
  symbol: string;
  code: string;
  name: string;
  locale: string;
}

export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  INR: {
    symbol: '₹',
    code: 'INR',
    name: 'Indian Rupee',
    locale: 'en-IN',
  },
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar',
    locale: 'en-US',
  },
};

/**
 * Format a price value with the appropriate currency symbol and formatting
 */
export function formatPrice(
  amount: number,
  currency: Currency = 'INR',
  options: {
    showSymbol?: boolean;
    showCode?: boolean;
    precision?: number;
  } = {}
): string {
  const {
    showSymbol = true,
    showCode = false,
    precision = 2,
  } = options;

  const config = CURRENCY_CONFIG[currency];
  const formattedAmount = amount.toLocaleString(config.locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  let result = formattedAmount;
  
  if (showSymbol) {
    result = `${config.symbol}${result}`;
  }
  
  if (showCode) {
    result = `${result} ${config.code}`;
  }
  
  return result;
}

/**
 * Convert USD to INR (approximate conversion rate)
 * Note: In a real application, you would fetch this from a currency API
 */
export function convertUSDToINR(usdAmount: number): number {
  const USD_TO_INR_RATE = 83.5; // Approximate rate, should be fetched from API
  return usdAmount * USD_TO_INR_RATE;
}

/**
 * Convert INR to USD (approximate conversion rate)
 */
export function convertINRToUSD(inrAmount: number): number {
  const INR_TO_USD_RATE = 0.012; // Approximate rate, should be fetched from API
  return inrAmount * INR_TO_USD_RATE;
}

/**
 * Format price with Indian number formatting (lakhs, crores)
 */
export function formatIndianPrice(amount: number): string {
  if (amount >= 10000000) {
    // Crores
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} L`;
  } else {
    // Regular formatting
    return formatPrice(amount, 'INR');
  }
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_CONFIG[currency].symbol;
}

/**
 * Parse a price string and extract the numeric value
 */
export function parsePrice(priceString: string): number {
  // Remove currency symbols and commas
  const cleaned = priceString.replace(/[₹$,]/g, '');
  return parseFloat(cleaned) || 0;
}
