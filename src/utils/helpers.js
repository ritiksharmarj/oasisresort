import { formatDistance, parseISO } from 'date-fns';

/**
 * Format currency
 * @param {number} value Amount for example 420
 * @returns $420.00 (USD conversion)
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

/**
 * Format distance between dates
 * @param {Date} date
 * @returns For example "5 months ago"
 */
export function formatDistanceFromNow(date) {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');
}
