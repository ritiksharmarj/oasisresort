import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

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
