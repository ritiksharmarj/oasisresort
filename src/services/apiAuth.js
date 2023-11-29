import supabase from './supabase';

/**
 * Log In With Email/Password
 * @returns user data
 */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('Either email or password is incorrect.');
  }

  return data;
}

/**
 * Validate current user
 * @returns user data
 */
export async function getCurrentUser() {
  // Check if session exists for current user
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // If session exists, return user data
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

/**
 * Logout user
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
