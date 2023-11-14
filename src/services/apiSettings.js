import supabase from './supabase';

export async function getSettings() {
  // Read one row of settings data
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    throw new Error('We are unable to load settings at this time.');
  }

  return data;
}

export async function updateSetting(newSettingData) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSettingData)
    .eq('id', 1)
    .single();

  if (error) {
    throw new Error('We are unable to update settings at this time.');
  }

  return data;
}
