import supabase from './supabase';

export async function getCabins() {
  // Read all rows or cabins
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('We are unable to load cabins at this time.');
  }

  return data;
}

export async function createNewCabin(newCabinData) {
  // https://udayxcwsgumjjhkbajba.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `cabin-${new Date().getTime()}`;
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  // Upload a image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabinData.cabinImage);

  // Create a cabin
  if (!storageError) {
    const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...newCabinData, cabinImage: imagePath }])
      .select();

    if (error) {
      throw new Error('We are unable to create cabin at this time.');
    }

    return data;
  }

  if (storageError) {
    throw new Error('We are unable to create cabin at this time.');
  }

  return;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('We are unable to delete cabin at this time.');
  }
}
