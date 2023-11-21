import supabase from './supabase';

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(cabinName), guests(name, email)',
    );

  if (error) {
    throw new Error('We are unable to load bookings at this time.');
  }

  return data;
}
