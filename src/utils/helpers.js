import { differenceInDays, formatDistance, parseISO } from 'date-fns';

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

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

/**
 * Supabase needs an ISO date string. However, that string will be different on every render because the milliseconds and seconds have changed, which isn't good. So we use this trick to remove any time.
 * @param {object} options key:"end" and value:boolean
 * @returns {Date} date as a string value in ISO format.
 */
export function getToday(options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it is not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
}
