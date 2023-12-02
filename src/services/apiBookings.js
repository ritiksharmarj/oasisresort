import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';

/**
 * Read all the bookings rows
 * Filter, sort and pagination
 */
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(cabinName), guests(name, email)',
      {
        count: 'exact',
      },
    );

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  // PAGINATION
  if (page) {
    // from 0 to 9
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error('We are unable to load bookings at this time.');
  }

  return { data, count };
}

/**
 * Read single booking row
 * @param {number} id booking id
 * @returns {object} booking row
 */
export async function getBookingDetail(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('We are unable to find booking at this time.');
  }

  return data;
}

/**
 * Update booking
 * @param {number} id booking id
 * @param {object} dataObj booking checkin data object
 * @returns {object} updated booking row
 */
export async function updateBooking(id, dataObj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(dataObj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error('We are unable to update booking at this time.');
  }

  return data;
}

/**
 * Delete booking
 * @param {number} id booking id
 */
export async function deleteBooking(id) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    throw new Error('We are unable to delete booking at this time.');
  }
}

/**
 * Returns all bookings created after the given date. Useful to get bookings created in the last 30 days, for example.
 * @param {Date} date must be in ISO format
 * @returns bookings data
 */
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error('We are unable to load bookings at this time.');
  }

  return data;
}

/**
 * Returns all STAYS (check in) created after the given date
 * @param {Date} date must be in ISO format
 * @returns bookings data
 */
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(name)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    throw new Error('We are unable to load bookings at this time.');
  }

  return data;
}
