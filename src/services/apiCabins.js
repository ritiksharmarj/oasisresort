import supabase from './supabase';

export async function getCabins() {
  // Read all rows or cabins
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('We are unable to load cabins at this time.');
  }

  return data;
}

export async function createEditCabin(newCabinData, editCabinId) {
  const hasImagePath = newCabinData.cabinImage?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL,
  );

  const imageName = `cabin-${new Date().getTime()}`;
  const imagePath = hasImagePath
    ? newCabinData.cabinImage
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  // Create a cabin
  if (!editCabinId)
    query = query.insert([{ ...newCabinData, cabinImage: imagePath }]);

  // Edit a cabin
  if (editCabinId)
    query = query
      .update({ ...newCabinData, cabinImage: imagePath })
      .eq('id', editCabinId);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('We are unable to create cabin at this time.');
  }

  // Upload a image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabinData.cabinImage);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    if (editCabinId) {
      throw new Error('We are unable to save cabin at this time.');
    } else {
      throw new Error('We are unable to create cabin at this time.');
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('We are unable to delete cabin at this time.');
  }
}
