import { CURRENCIES, DEFAULT_CURRENCY } from '../data/currencies';

export function formatCurrency(value, currencyCode = DEFAULT_CURRENCY) {
  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  const decimals = currency.decimals ?? 2;
  const number = Number.isFinite(value) ? value : 0;
  const formatted = number.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return `${currency.symbol} ${formatted}`;
}

export function getCurrencySymbol(currencyCode = DEFAULT_CURRENCY) {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  return currency ? currency.symbol : '$';
}
