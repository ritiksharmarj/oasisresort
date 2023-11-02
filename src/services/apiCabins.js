import supabase from './supabase';

export async function getCabins() {
  // Read all rows or cabins
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('We are unable to load cabins at this time.');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('We are unable to delete cabin at this time.');
  }
}
